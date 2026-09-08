"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type Job = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  salary: number | null;
  status?: string | null;
  createdAt?: string;
  giver?: {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
  };
};

const formatCurrency = (value: number | null) => {
  if (value === null || value === undefined) return "Salaire non précisé";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (value?: string) => {
  if (!value) return "Date inconnue";

  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Offre introuvable.");
      setLoading(false);
      return;
    }

    const loadJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);

        if (!response.ok) {
          throw new Error("Offre introuvable ou inaccessible.");
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Impossible de charger l'offre.");
      } finally {
        setLoading(false);
      }
    };

    const loadUserRole = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.status === 401) {
          setUserRole(null);
          return;
        }
        if (!response.ok) {
          setUserRole(null);
          return;
        }

        const data = await response.json();
        setUserRole(data?.role ?? null);
      } catch (err) {
        console.error("Erreur récupération du rôle:", err);
        setUserRole(null);
      }
    };

    const checkExistingApplication = async () => {
      try {
        const response = await fetch("/api/applications?limit=100");
        if (response.status === 401) {
          return;
        }
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const applications = Array.isArray(data) ? data : data.applications || [];
        const myApplication = applications.find(
          (item: { job?: { id?: string } | null; jobId?: string }) =>
            item.job?.id === id || item.jobId === id
        );

        if (myApplication) {
          setHasApplied(true);
          setApplicationId(myApplication.id);
        }
      } catch (err) {
        console.error("Erreur application existante:", err);
      }
    };

    loadJob();
    loadUserRole();
    checkExistingApplication();
  }, [id]);

  const handleApply = async () => {
    if (!id) return;

    setApplying(true);
    setSuccessMessage("");
    setError("");

    try {
      if (hasApplied && applicationId) {
        const response = await fetch(`/api/applications/${applicationId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          if (response.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error(data?.error || "Impossible de retirer votre candidature.");
        }

        setHasApplied(false);
        setApplicationId(null);
        setSuccessMessage("Votre candidature a bien été supprimée.");
        return;
      }

      const response = await fetch(`/api/jobs/${id}/apply`, {
        method: "POST",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }

        throw new Error(data?.error || "Impossible de postuler à cette offre.");
      }

      const createdApplication = data;
      setHasApplied(true);
      setApplicationId(createdApplication?.id ?? null);
      setSuccessMessage("Votre candidature a bien été enregistrée.");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-600">Chargement de l&apos;offre...</div>;
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <Card className="w-full max-w-xl">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-red-600">{error}</p>
            <Link href="/" className="mt-4 inline-block text-sm text-primary underline">
              Retour à l&apos;accueil
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!job) {
    return null;
  }

  const giverName = job.giver
    ? `${job.giver.firstname ?? ""} ${job.giver.lastname ?? ""}`.trim() || "Entreprise"
    : "Entreprise";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm font-medium text-primary underline">
          ← Retour
        </Link>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
                Offre d&apos;emploi
              </p>
              <CardTitle className="mt-2 text-3xl text-slate-900">{job.title}</CardTitle>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-left md:text-right">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Salaire</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{formatCurrency(job.salary)}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Lieu</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{job.location || "Non renseigné"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Entreprise</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{giverName}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Date</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{formatDate(job.createdAt)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Description</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-700">
              {job.description || "Aucune description ajoutée pour cette offre."}
            </p>
          </div>

          {successMessage ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {userRole === "SEEKER" ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">
                {job.giver ? `Contact : ${giverName}` : "Vous pouvez postuler directement."}
              </div>

              {hasApplied ? (
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleApply}
                  disabled={applying}
                  isLoading={applying}
                >
                  {applying ? "Suppression..." : "Retirer ma candidature"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleApply}
                  disabled={applying}
                  isLoading={applying}
                >
                  {applying ? "Envoi en cours..." : "Postuler à cette offre"}
                </Button>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
