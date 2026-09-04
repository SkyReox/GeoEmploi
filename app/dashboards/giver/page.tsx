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
import AccountComponent from "@/app/components/AccountComponent";

type Application = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message?: string | null;
  createdAt?: string;

  seeker?: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};

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
  const [jobsData, setJobsData] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingJob, setAddingJob] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");

  const [savingJob, setSavingJob] = useState(false);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const [applicationsByJob, setApplicationsByJob] = useState<Record<string, Application[]>>({});
  const [loadingApplications, setLoadingApplications] = useState<Record<string, boolean>>({});
  const [updatingApplication, setUpdatingApplication] = useState<string | null>(null);

  /*
   * Chargement du user et des jobs
   */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const jobsResponse = await fetch("/api/jobs");

        if (!jobsResponse.ok) {
          throw new Error("Impossible de récupérer les données.");
        }

        const jobsTemp = await jobsResponse.json();

        const allJobs: Job[] = Array.isArray(jobsTemp)
          ? jobsTemp
          : jobsTemp.jobs || [];

        setJobsData(allJobs);

      } catch (error) {
        console.error(error);
        setError("Impossible de charger le dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleUpdateApplication = async (
    applicationId: string,
    jobId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    setUpdatingApplication(applicationId);
    setError("");

    try {
      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de modifier la candidature."
        );
      }

      setApplicationsByJob((prev) => ({
        ...prev,
        [jobId]: (prev[jobId] || []).map((application) =>
          application.id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        ),
      }));
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Impossible de modifier la candidature."
      );
    } finally {
      setUpdatingApplication(null);
    }
  };
  const handleToggleApplications = async (jobId: string) => {
    if (openJobId === jobId) {
      setOpenJobId(null);
      return;
    }

    setOpenJobId(jobId);
    setError("");

    if (applicationsByJob[jobId]) {
      return;
    }

    setLoadingApplications((prev) => ({
      ...prev,
      [jobId]: true,
    }));

    try {
      const response = await fetch(
        `/api/applications?jobId=${jobId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de récupérer les candidatures."
        );
      }

      const applications: Application[] = Array.isArray(data)
        ? data
        : data.applications || [];

      setApplicationsByJob((prev) => ({
        ...prev,
        [jobId]: applications,
      }));
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Impossible de récupérer les candidatures."
      );
    } finally {
      setLoadingApplications((prev) => ({
        ...prev,
        [jobId]: false,
      }));
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

  console.log("JSON envoyé à /api/jobs:", body);

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

    console.log("Réponse /api/jobs:", response.status, data);

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
    console.error("Erreur création offre:", error);

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
  if (error) {
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
          <AccountComponent></AccountComponent>

          {/* Offres publiées */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium font-semibold text-ink">
                Mes offres publiées:
              </p>

              {!addingJob && (
                <Button
                  className="cursor-pointer hover:bg-gray-200"
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
                      Titre:
                    </label>

                    <input
                      id="job-title"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Ex: Développeur web"
                      className="mt-1 w-full rounded-lg border border-dashed border-border bg-white px-4 py-2 text-sm text-neutral"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="job-description"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Description:
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
                      Lieu:
                    </label>

                    <input
                      id="job-location"
                      type="text"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="Ex: Paris"
                      className="mt-1 w-full rounded-lg border border-dashed border-border bg-white px-4 py-2 text-sm text-neutral"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="job-salary"
                      className="text-sm font-medium font-semibold text-ink"
                    >
                      Salaire:
                    </label>

                    <input
                    id="job-salary"
                    type="number"
                    min="1"
                    step="1"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    placeholder="Ex: 35000"
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
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
                      className="flex flex-col mt-2 rounded-lg bg-main-1 px-4 py-4 text-sm text-white"
                    >
                      {/* Informations de l'offre */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="font-medium font-semibold">
                            {job.title}
                          </span>

                          {job.location && (
                            <span className="mt-1 text-sm text-neutral">
                              Lieu: {job.location}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="shrink-0 rounded-lg px-2 py-1 text-xs text-neutral font-semibold transition-colors cursor-pointer border-2 border-blue-700 hover:bg-red-200 hover:text-red-700 hover:border-red-100"
                          aria-label={`Supprimer ${job.title}`}
                        >
                          Supprimer
                        </button>
                      </div>

                      {job.description && (
                        <div className="mt-3">
                          <span className="font-medium font-semibold">
                            Description:
                          </span>

                          <p className="mt-1 text-neutral">
                            {job.description}
                          </p>
                        </div>
                      )}

                      {job.salary !== null && job.salary !== undefined && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Salaire:
                          </span>

                          <span className="ml-2 text-neutral">
                            {job.salary.toLocaleString("fr-FR")} €
                          </span>
                        </div>
                      )}

                      {job.status && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Statut:
                          </span>

                          <span className="ml-2">
                            {job.status}
                          </span>
                        </div>
                      )}

                      {job.createdAt && (
                        <div className="mt-2">
                          <span className="font-medium font-semibold">
                            Date de publication:
                          </span>

                          <span className="ml-2 text-neutral">
                            {formatDate(job.createdAt)}
                          </span>
                        </div>
                      )}

                      {/* Candidatures */}
                      <div className="mt-4 border-t border-white/20 pt-4">
                        <button
                          type="button"
                          onClick={() => handleToggleApplications(job.id)}
                          className="w-full rounded-lg border border-white/20 px-3 py-2 text-left text-sm font-semibold transition-colors cursor-pointer hover:bg-white/10"
                        >
                          {openJobId === job.id
                            ? "Masquer les candidatures"
                            : "Voir les candidatures"}
                        </button>

                        {openJobId === job.id && (
                          <div className="mt-3 rounded-lg bg-white p-4 text-black">
                            {loadingApplications[job.id] ? (
                              <p className="text-sm text-neutral">
                                Chargement des candidatures...
                              </p>
                            ) : !applicationsByJob[job.id] ||
                              applicationsByJob[job.id].length === 0 ? (
                              <p className="text-sm text-neutral">
                                Aucune candidature pour cette offre.
                              </p>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-sm font-semibold text-ink">
                                  {applicationsByJob[job.id].length}{" "}
                                  {applicationsByJob[job.id].length > 1
                                    ? "candidatures"
                                    : "candidature"}
                                </p>

                                {applicationsByJob[job.id].map((application) => (
                                  <div
                                    key={application.id}
                                    className="rounded-lg border border-dashed border-border p-4"
                                  >
                                    {/* Identité du candidat */}
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <p className="font-semibold text-ink">
                                          {application.seeker
                                            ? `${application.seeker.firstname} ${application.seeker.lastname}`
                                            : "Candidat"}
                                        </p>

                                        {application.seeker?.email && (
                                          <p className="mt-1 text-sm text-neutral">
                                            {application.seeker.email}
                                          </p>
                                        )}
                                      </div>

                                      <Badge>
                                        {application.status === "PENDING"
                                          ? "En attente"
                                          : application.status === "ACCEPTED"
                                          ? "Acceptée"
                                          : "Rejetée"}
                                      </Badge>
                                    </div>

                                    {/* Message */}
                                    {application.message && (
                                      <div className="mt-4">
                                        <p className="text-sm font-semibold text-ink">
                                          Message du candidat
                                        </p>

                                        <p className="mt-1 whitespace-pre-wrap text-sm text-neutral">
                                          {application.message}
                                        </p>
                                      </div>
                                    )}

                                    {/* Date */}
                                    {application.createdAt && (
                                      <div className="mt-3">
                                        <p className="text-xs text-neutral">
                                          Candidature envoyée le{" "}
                                          {formatDate(application.createdAt)}
                                        </p>
                                      </div>
                                    )}

                                    {/* Actions */}
                                    {application.status === "PENDING" && (
                                      <div className="mt-4 flex flex-wrap gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            handleUpdateApplication(
                                              application.id,
                                              job.id,
                                              "ACCEPTED"
                                            )
                                          }
                                          disabled={
                                            updatingApplication === application.id
                                          }
                                        >
                                          {updatingApplication === application.id
                                            ? "Modification..."
                                            : "Accepter"}
                                        </Button>

                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            handleUpdateApplication(
                                              application.id,
                                              job.id,
                                              "REJECTED"
                                            )
                                          }
                                          disabled={
                                            updatingApplication === application.id
                                          }
                                        >
                                          {updatingApplication === application.id
                                            ? "Modification..."
                                            : "Rejeter"}
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}