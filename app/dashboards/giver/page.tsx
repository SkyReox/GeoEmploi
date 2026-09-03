"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "SEEKER" | "GIVER";
};

type Job = {
  id: string;
  giverId: string;
  title: string;
  description: string | null;
  location: string | null;
  salary: number | null;
  status?: string | null;
  createdAt?: string;
};

export default function GiverDashboard() {
  const [userData, setUserData] = useState<User | null>(null);
  const [jobsData, setJobsData] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProfile, setEditingProfile] = useState(false);
  const [addingJob, setAddingJob] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  /*
   * Chargement du user et des jobs
   */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userResponse, jobsResponse] = await Promise.all([
          fetch("/api/me"),
          fetch("/api/jobs"),
        ]);

        if (!userResponse.ok || !jobsResponse.ok) {
          throw new Error("Impossible de récupérer les données.");
        }

        const user: User = await userResponse.json();
        const jobsTemp = await jobsResponse.json();

        const allJobs: Job[] = Array.isArray(jobsTemp)
          ? jobsTemp
          : jobsTemp.jobs || [];

        /*
         * /api/jobs renvoie tous les jobs.
         * On garde uniquement ceux du giver connecté.
         */
        const giverJobs = allJobs.filter(
          (job) => job.giverId === user.id
        );

        setUserData(user);
        setJobsData(giverJobs);

        setFirstname(user.firstname);
        setLastname(user.lastname);
        setEmail(user.email);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger le dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
   * Modification du profil
   */
  const handleUpdateProfile = async () => {
    setError("");
    setSavingProfile(true);

    try {
      const response = await fetch("/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la modification du profil."
        );
      }

      const updatedUser: User = await response.json();

      setUserData(updatedUser);
      setFirstname(updatedUser.firstname);
      setLastname(updatedUser.lastname);
      setEmail(updatedUser.email);

      setEditingProfile(false);
    } catch (error) {
      console.error(error);
      setError("Impossible de modifier le profil.");
    } finally {
      setSavingProfile(false);
    }
  };

  /*
   * Ajout d'un job
   */
  const handleAddJob = async () => {
  setError("");

  const title = jobTitle.trim();
  const description = jobDescription.trim();
  const location = jobLocation.trim();

  if (!title) {
    setError("Le titre de l'offre est obligatoire.");
    return;
  }

  if (!description) {
    setError("La description de l'offre est obligatoire.");
    return;
  }

  if (!location) {
    setError("Le lieu est obligatoire.");
    return;
  }

  const salary = Number(jobSalary);

  if (!Number.isInteger(salary) || salary <= 0) {
    setError("Le salaire doit être un nombre entier positif.");
    return;
  }

  const body = {
    title,
    description,
    location,
    salary,
  };

  console.log("JSON envoyé à /api/jobs :", body);

  setSavingJob(true);

  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    console.log("Réponse /api/jobs :", response.status, data);

    if (!response.ok) {
      throw new Error(
        data?.error?.formErrors?.[0] ||
          data?.error ||
          "Erreur lors de la création de l'offre."
      );
    }

    const newJob: Job = data.job || data;

    setJobsData((prevJobs) => [newJob, ...prevJobs]);

    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
    setJobSalary("");

    setAddingJob(false);
  } catch (error) {
    console.error("Erreur création offre :", error);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Impossible de créer l'offre.");
    }
  } finally {
    setSavingJob(false);
  }
};

  /*
   * Suppression d'un job
   */
  const handleDeleteJob = async (jobId: string) => {
    setError("");

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la suppression de l'offre."
        );
      }

      setJobsData((prevJobs) =>
        prevJobs.filter((job) => job.id !== jobId)
      );
    } catch (error) {
      console.error(error);
      setError("Impossible de supprimer l'offre.");
    }
  };

  /*
   * Formatage de la date
   */
  const formatDate = (date: string | undefined) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("fr-FR");
  };

  /*
   * Annulation de l'ajout d'un job
   */
  const handleCancelJob = () => {
    setAddingJob(false);
    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
    setJobSalary("");
    setError("");
  };

  /*
   * Chargement
   */
  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  /*
   * Erreur bloquante
   */
  if (error && !userData) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto mt-[1,5rem] flex w-full flex-1 flex-col bg-white px-4 py-8 text-black">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-semibold text-ink">
          Bonjour
        </h1>

        <p className="text-sm text-neutral">
          Voici un aperçu de votre activité
        </p>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Profil */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>

        <CardContent>
          {!editingProfile ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Prénom :
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.firstname}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Nom :
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.lastname}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Email :
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Type de compte :
                  </p>

                  <Badge>
                    {userData?.role === "GIVER"
                      ? "Recruteur"
                      : "Demandeur d'emploi"}
                  </Badge>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(true)}
                >
                  Modifier mon profil
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium font-semibold text-ink"
                >
                  Prénom :
                </label>

                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-2 text-sm text-neutral"
                />
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="text-sm font-medium font-semibold text-ink"
                >
                  Nom :
                </label>

                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-2 text-sm text-neutral"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium font-semibold text-ink"
                >
                  Email :
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-2 text-sm text-neutral"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpdateProfile}
                  disabled={savingProfile}
                >
                  {savingProfile ? "Enregistrement..." : "Enregistrer"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProfile(false);
                    setFirstname(userData?.firstname || "");
                    setLastname(userData?.lastname || "");
                    setEmail(userData?.email || "");
                    setError("");
                  }}
                  disabled={savingProfile}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Offres publiées */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium font-semibold text-ink">
                Mes offres publiées :
              </p>

              {!addingJob && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAddingJob(true);
                    setError("");
                  }}
                >
                  Ajouter une offre
                </Button>
              )}
            </div>

            {/* Formulaire d'ajout */}
            {addingJob && (
              <div className="mt-4 rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="job-title"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Titre :
                    </label>

                    <input
                      id="job-title"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Ex : Développeur web"
                      className="mt-1 w-full rounded-lg border border-dashed border-border bg-white px-4 py-2 text-sm text-neutral"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="job-description"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Description :
                    </label>

                    <textarea
                      id="job-description"
                      value={jobDescription}
                      onChange={(e) =>
                        setJobDescription(e.target.value)
                      }
                      placeholder="Décrivez le poste..."
                      rows={5}
                      className="mt-1 w-full resize-none rounded-lg border border-dashed border-border bg-white px-4 py-2 text-sm text-neutral"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="job-location"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Lieu :
                    </label>

                    <input
                      id="job-location"
                      type="text"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="Ex : Paris"
                      className="mt-1 w-full rounded-lg border border-dashed border-border bg-white px-4 py-2 text-sm text-neutral"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="job-salary"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Salaire :
                    </label>

                    <input
                    id="job-salary"
                    type="number"
                    min="1"
                    step="1"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    placeholder="Ex : 35000"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddJob}
                      disabled={savingJob}
                    >
                      {savingJob
                        ? "Publication..."
                        : "Publier l'offre"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelJob}
                      disabled={savingJob}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste des jobs */}
            <div className="mt-4">
              {jobsData.length === 0 ? (
                <p className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                  Aucune offre publiée.
                </p>
              ) : (
                <div className="flex w-full flex-col gap-3 rounded-lg border border-dashed border-border px-4 py-6">
                  {jobsData.map((job) => (
                    <div
                      key={job.id}
                      className="flex flex-col rounded-lg bg-main-1 px-4 py-4 text-sm text-white"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="font-medium font-semibold">
                            {job.title}
                          </span>

                          {job.location && (
                            <span className="mt-1 text-sm text-neutral">
                              Lieu : {job.location}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="shrink-0 rounded-lg px-2 py-1 text-xs text-neutral transition-colors hover:bg-red-100 hover:text-red-600"
                          aria-label={`Supprimer ${job.title}`}
                        >
                          Supprimer
                        </button>
                      </div>

                      {job.description && (
                        <div className="mt-3">
                          <span className="font-medium font-semibold">
                            Description :
                          </span>

                          <p className="mt-1 text-neutral">
                            {job.description}
                          </p>
                        </div>
                      )}

                      {job.salary && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Salaire :
                          </span>

                          <span className="ml-2 text-neutral">
                            {job.salary}
                          </span>
                        </div>
                      )}

                      {job.status && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Statut :
                          </span>

                          <span className="ml-2">
                            {job.status}
                          </span>
                        </div>
                      )}

                      {job.createdAt && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Date de publication :
                          </span>

                          <span className="ml-2 text-neutral">
                            {formatDate(job.createdAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidatures reçues */}
      <Card>
        <CardHeader>
          <CardTitle>
            Candidatures récentes
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
            Aucune candidature récente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}