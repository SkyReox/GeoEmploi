"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

type UserRole = "SEEKER" | "GIVER";
type JobStatus = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";

type AdminUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  banned: boolean;
  siret: string;
  companyName: string
  createdAt: string;
  _count: {
    jobsPosted: number;
    applications: number;
  };
};

type AdminJob = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number | null;
  reportedNb: number;
  status: JobStatus | null;
  createdAt: string;
  giver: {
    firstname: string;
    lastname: string;
    email: string;
    companyName: string | null;
    siret: string | null;
  };
  _count: {
    applications: number;
  };
};

type ApiList<T> = {
  jobs?: T[];
  users?: T[];
};

const jobStatusVariant: Record<JobStatus, "pending" | "approved" | "rejected" | "closed"> = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CLOSED: "closed",
};

const jobStatusLabel: Record<JobStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvée",
  REJECTED: "Refusée",
  CLOSED: "Fermée",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getFullName(user: Pick<AdminUser, "firstname" | "lastname"> | AdminJob["giver"]) {
  return `${user.firstname} ${user.lastname}`.trim() || "Utilisateur inconnu";
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [givers, setGivers] = useState<AdminUser[]>([]);
  const [seekers, setSeekers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [jobsResponse, giversResponse, seekersResponse] = await Promise.all([
        fetch("/api/admin/jobs?limit=50"),
        fetch("/api/admin/users?role=GIVER&limit=50"),
        fetch("/api/admin/users?role=SEEKER&limit=50"),
      ]);

      const [jobsData, giversData, seekersData] = await Promise.all([
        jobsResponse.json() as Promise<ApiList<AdminJob>>,
        giversResponse.json() as Promise<ApiList<AdminUser>>,
        seekersResponse.json() as Promise<ApiList<AdminUser>>,
      ]);

      if (!jobsResponse.ok || !giversResponse.ok || !seekersResponse.ok) {
        throw new Error("Impossible de récupérer les données d’administration.");
      }

      setJobs(jobsData.jobs ?? []);
      setGivers(giversData.users ?? []);
      setSeekers(seekersData.users ?? []);
    } catch (loadError) {
      console.error(loadError);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Impossible de charger le dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  const handleJobStatus = async (jobId: string, action: "APPROVE" | "REJECT") => {
    setUpdatingJobId(jobId);
    setError("");

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossible de mettre à jour l’offre.");
      }

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === jobId ? { ...job, status: data.status } : job,
        ),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Impossible de mettre à jour l’offre.",
      );
    } finally {
      setUpdatingJobId(null);
    }
  };

  const updateUserInLists = (userId: string, update: Partial<AdminUser> | null) => {
    const updateList = (users: AdminUser[]) =>
      update === null
        ? users.filter((user) => user.id !== userId)
        : users.map((user) => (user.id === userId ? { ...user, ...update } : user));

    setGivers(updateList);
    setSeekers(updateList);
  };

  const handleUserStatus = async (user: AdminUser) => {
    setUpdatingUserId(user.id);
    setError("");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banned: !user.banned }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossible de modifier le statut du compte.");
      }

      updateUserInLists(user.id, { banned: data.banned });
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Impossible de modifier le statut du compte.",
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!window.confirm(`Supprimer définitivement le compte de ${getFullName(user)} ?`)) {
      return;
    }

    setUpdatingUserId(user.id);
    setError("");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Impossible de supprimer le compte.");
      }

      updateUserInLists(user.id, null);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer le compte.",
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const renderUsers = (users: AdminUser[], emptyMessage: string, activityLabel: string) => {
    if (users.length === 0) {
      return <p className="rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">{emptyMessage}</p>;
    }

    return (
      <div className="divide-y divide-border rounded-lg border border-border">
        {users.map((user) => {
          const isUpdating = updatingUserId === user.id;
          const activity = user.role === "GIVER" ? user._count.jobsPosted : user._count.applications;

          return (
            <div key={user.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-ink">{getFullName(user)}</p>
                  <Badge variant={user.banned ? "rejected" : "approved"}>
                    {user.banned ? "Banni" : "Actif"}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-sm text-neutral">{user.email}</p>
                <p className="mt-1 truncate text-sm text-neutral">Siret: {user.siret}</p>
                <p className="mt-1 truncate text-sm text-neutral">Entreprise: {user.companyName}</p>
                <p className="mt-1 text-xs text-neutral">
                  {activity} {activityLabel} · Inscrit le {formatDate(user.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleUserStatus(user)}
                  disabled={isUpdating}
                  className={`shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors disabled:pointer-events-none disabled:opacity-50 ${user.banned ? "hover:bg-green-100 hover:text-green-700" : "hover:bg-red-100 hover:text-red-600"}`}
                >
                  {isUpdating ? "Mise à jour…" : user.banned ? "Réactiver" : "Bannir"}
                </button>
                <button
                  type="button"
                  onClick={() => void handleDeleteUser(user)}
                  disabled={isUpdating}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto bg-white flex w-full flex-1 flex-col px-4 py-8 text-black sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Administration</h1>
          <p className="mt-1 text-sm text-neutral">Gérez les offres et les comptes de la plateforme.</p>
        </div>
        <Button className="hover-bg-main-1 hover:text-white" variant="outline" size="sm" onClick={() => void loadDashboard()}>
          Actualiser
        </Button>
      </div>

      {error && (
        <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Résumé">
        <Card><CardContent className="py-4"><p className="text-sm text-neutral">Offres publiées</p><p className="mt-1 text-2xl font-semibold text-ink">{jobs.length}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-sm text-neutral">Recruteurs</p><p className="mt-1 text-2xl font-semibold text-ink">{givers.length}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-sm text-neutral">Demandeurs d’emploi</p><p className="mt-1 text-2xl font-semibold text-ink">{seekers.length}</p></CardContent></Card>
      </section>

      <section className="mt-6" aria-labelledby="jobs-title">
        <Card>
          <CardHeader><CardTitle id="jobs-title">Offres postées</CardTitle></CardHeader>
          <CardContent>
            {loading ? <p className="text-sm text-neutral">Chargement des offres…</p> : jobs.length === 0 ? <p className="rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">Aucune offre publiée.</p> : (
              <div className="divide-y divide-border rounded-lg border border-border">
                {jobs.map((job) => {
                  const status = job.status ?? "PENDING";
                  const isUpdating = updatingJobId === job.id;
                  const isDetailOpen = openJobId === job.id;
                  return (
                    <article key={job.id} className="p-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-ink">{job.title}</h3><Badge variant={jobStatusVariant[status]}>{jobStatusLabel[status]}</Badge></div>
                          <p className="mt-1 text-sm text-neutral">{job.location} · Publiée le {formatDate(job.createdAt)}</p>
                          <p className="mt-1 text-sm text-neutral">Par {getFullName(job.giver)} ({job.giver.email}) · {job._count.applications} candidature{job._count.applications > 1 ? "s" : ""}</p>
                          <p className="mt-1 text-sm text-neutral">
                            Entreprise : {job.giver.companyName || "Non renseignée"} · SIRET : {job.giver.siret || "Non renseigné"}
                          </p>
                          <p className="flex flex-col mt-1 text-red-600 text-neutral">signalé {job.reportedNb.toString()} fois</p>
                          {isDetailOpen && (
                            <div id={`job-details-${job.id}`} className="mt-3 rounded-lg border border-dashed border-border bg-neutral-bg/50 p-3 text-sm text-ink">
                              <p className="font-medium">Description</p>
                              <p className="mt-1 whitespace-pre-wrap">{job.description}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setOpenJobId(isDetailOpen ? null : job.id)}
                            aria-expanded={isDetailOpen}
                            aria-controls={`job-details-${job.id}`}
                            className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors disabled:pointer-events-none disabled:opacity-50"
                          >
                            {isDetailOpen ? "Masquer le détail" : "Voir le détail"}
                          </Button>
                          {status === "PENDING" && (
                            <button
                              type="button"
                              onClick={() => void handleJobStatus(job.id, "APPROVE")}
                              disabled={isUpdating}
                              className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-green-100 hover:text-green-700 disabled:pointer-events-none disabled:opacity-50"
                            >
                              {isUpdating ? "Mise à jour…" : "Approuver"}
                            </button>
                          )}
                          {status === "REJECTED" && (
                            <button
                              type="button"
                              onClick={() => void handleJobStatus(job.id, "APPROVE")}
                              disabled={isUpdating}
                              className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-green-100 hover:text-green-700 disabled:pointer-events-none disabled:opacity-50"
                            >
                              {isUpdating ? "Mise à jour…" : "Réapprouver"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => void handleJobStatus(job.id, "REJECT")}
                            disabled={isUpdating || status === "REJECTED"}
                            className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-red-100 hover:text-red-600 disabled:pointer-events-none disabled:opacity-50"
                          >
                            {status === "REJECTED" ? "Offre rejetée" : "Rejeter l’offre"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recruteurs</CardTitle></CardHeader>
          <CardContent>{loading ? <p className="text-sm text-neutral">Chargement des recruteurs…</p> : renderUsers(givers, "Aucun recruteur enregistré.", "offre(s) publiée(s)")}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Demandeurs d’emploi</CardTitle></CardHeader>
          <CardContent>{loading ? <p className="text-sm text-neutral">Chargement des demandeurs d’emploi…</p> : renderUsers(seekers, "Aucun demandeur d’emploi enregistré.", "candidature(s)")}</CardContent>
        </Card>
      </section>
    </div>
  );
}
