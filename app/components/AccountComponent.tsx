"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";


type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "SEEKER" | "GIVER";
};


export default function AccountComponent() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProfile, setEditingProfile] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");


  const [savingProfile, setSavingProfile] = useState(false);
  const [exportingData, setExportingData] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  

  /*
   * Chargement du user
   */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userResponse = await fetch("/api/me");

        if (!userResponse.ok) {
          throw new Error("Impossible de récupérer les données.");
        }

        const user: User = await userResponse.json();        

        setUserData(user);
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

  const handleDataExport = async () => {
    setError("");
    setExportingData(true);

    try {
      const response = await fetch("/api/me/export");

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Impossible de préparer l’export.");
      }

      const file = await response.blob();
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "geoemploi-donnees-personnelles.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (exportError) {
      console.error(exportError);
      setError(
        exportError instanceof Error
          ? exportError.message
          : "Impossible de préparer l’export.",
      );
    } finally {
      setExportingData(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingAccount(true);

    try {
      const response = await fetch("/api/me", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Impossible de supprimer le compte.");
      }

      router.push("/login");
    } catch (deleteError) {
      console.error(deleteError);
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer le compte."
      );
    } finally {
      setDeletingAccount(false);
    }
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

  if (!editingProfile) {
    return (
        <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Prénom:
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.firstname}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Nom:
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.lastname}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Email:
                  </p>

                  <p className="text-sm text-neutral">
                    {userData?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium font-semibold text-ink">
                    Type de compte:
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
                  className="cursor-pointer hover:bg-gray-200"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(true)}
                >
                  Modifier mon profil
                </Button>

                <Button
                  className="ml-2"
                  variant="outline"
                  size="sm"
                  onClick={handleDataExport}
                  disabled={exportingData}
                >
                  {exportingData
                    ? "Préparation de l’export..."
                    : "Télécharger mes données (JSON)"}
                </Button>

                <Button
                  className="ml-2"
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteAccount}
                  disabled={deletingAccount}
                >
                  {deletingAccount ? "Suppression..." : "Supprimer mon compte"}
                </Button>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </>
    );
  } else {
    return (
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
                  className="cursor-pointer hover:bg-gray-200"
                  variant="outline"
                  size="sm"
                  onClick={handleUpdateProfile}
                  disabled={savingProfile}
                >
                  {savingProfile ? "Enregistrement..." : "Enregistrer"}
                </Button>

                <Button
                  className="cursor-pointer hover:bg-gray-200"
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
    );
  }
}
