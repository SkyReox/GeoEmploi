import os
import random

from locust import HttpUser, LoadTestShape, between, task


class GeoEmploiUser(HttpUser):
    wait_time = between(1, 3)

    email = os.getenv("GIVER_EMAIL", "giver@gmail.com")
    password = os.getenv("GIVER_PASSWORD", "givergiver")

    def on_start(self):
        response = self.client.get("/api/auth/csrf")

        if response.status_code != 200:
            response.failure("CSRF request failed")
            return

        csrf_token = response.json().get("csrfToken")

        if not csrf_token:
            response.failure("CSRF token missing")
            return

        response = self.client.post(
            "/api/auth/callback/credentials",
            data={
                "email": self.email,
                "password": self.password,
                "csrfToken": csrf_token,
                "callbackUrl": self.host,
                "json": "true",
            },
        )

        if response.status_code not in (200, 302):
            response.failure("Login failed")

    @task(2)
    def browse_map(self):
        self.client.get("/map", name="MAP page")
        self.client.get("/api/jobs", name="MAP /api/jobs")

    @task(3)
    def browse_job_list(self):
        page = random.randint(1, 25)

        self.client.get(
            "/api/jobs",
            params={"page": page, "limit": 20},
            name="LIST /api/jobs",
        )


class ThreeMinuteShape(LoadTestShape):
    stages = [
        {"duration": 10, "users": 50, "spawn_rate": 5},
        {"duration": 60, "users": 500, "spawn_rate": 50},
    ]

    def tick(self):
        run_time = self.get_run_time()

        for stage in self.stages:
            if run_time < stage["duration"]:
                return stage["users"], stage["spawn_rate"]

        return None


GeoEmploiUser.host = os.getenv(
    "TARGET_URL",
    "http://localhost:3000",
)
