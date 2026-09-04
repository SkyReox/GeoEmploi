"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import AccountComponent from "@/app/components/AccountComponent";

enum Availability {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  FREELANCE = "FREELANCE",
  UNAVAILABLE = "UNAVAILABLE",
}

type Skill = {
  id: string;
  name: string;
};

type Experience = {
  id: string;
  title: string;
  company: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
};

type Profile = {
  bio: string | null;
  skills: Skill[];
  availability: Availability | null;
  availableFrom: string | null;
};

export default function Home() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [experiencesData, setExperiencesData] = useState<Experience[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Formulaire compétence
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillLoading, setSkillLoading] = useState(false);

  // Formulaire expérience
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceCompany, setExperienceCompany] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");
  const [experienceStartDate, setExperienceStartDate] = useState("");
  const [experienceEndDate, setExperienceEndDate] = useState("");
  const [experienceLoading, setExperienceLoading] = useState(false);

  const handleAddSkill = async () => {
    if (!skillName.trim()) {
      return;
    }

    try {
      setSkillLoading(true);

      const response = await fetch("/api/seeker/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: skillName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la compétence.");
      }

      const newSkill = await response.json();

      setSkillsData((prevSkills) => [...prevSkills, newSkill]);

      setSkillName("");
      setShowSkillForm(false);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de l'ajout de la compétence.");
    } finally {
      setSkillLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      const response = await fetch(`/api/seeker/skills/${skillId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setSkillsData((prev) =>
        prev.filter((skill) => skill.id !== skillId)
      );
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la suppression de la compétence.");
    }
  };

  const handleAddExperience = async () => {
    if (!experienceTitle.trim() || !experienceCompany.trim()) {
      return;
    }

    try {
      setExperienceLoading(true);

      const response = await fetch("/api/seeker/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: experienceTitle.trim(),
          company: experienceCompany.trim(),
          description: experienceDescription.trim(),
          startDate: experienceStartDate,
          endDate: experienceEndDate || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'expérience.");
      }

      const newExperience = await response.json();

      setExperiencesData((prevExperiences) => [
        ...prevExperiences,
        newExperience,
      ]);

      setExperienceTitle("");
      setExperienceCompany("");
      setExperienceDescription("");
      setExperienceStartDate("");
      setExperienceEndDate("");
      setShowExperienceForm(false);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de l'ajout de l'expérience.");
    } finally {
      setExperienceLoading(false);
    }
  };

  const handleBioChange = async () => {
    try {
      if (!profileData) {
        return;
      }

      const response = await fetch("/api/seeker/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: profileData.bio,
          availability: profileData.availability,
          availableFrom: profileData.availableFrom
            ? profileData.availableFrom
            : "",
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour de la biographie."
        );
      }

      const updatedProfile = await response.json();

      setProfileData(updatedProfile);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la mise à jour de la biographie.");
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    try {
      const response = await fetch(
        `/api/seeker/experiences/${experienceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la suppression de l'expérience."
        );
      }

      setExperiencesData((prev) =>
        prev.filter(
          (experience) => experience.id !== experienceId
        )
      );
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la suppression de l'expérience.");
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileResponse, skillsResponse] = await Promise.all([
          fetch("/api/seeker/profile"),
          fetch("/api/seeker/skills"),
        ]);

        if (!profileResponse.ok || !skillsResponse.ok) {
          throw new Error("Impossible de récupérer les données.");
        }

        const profile = await profileResponse.json();
        const skills = await skillsResponse.json();
        const experiences = profile.experiences || [];

        setProfileData(profile);
        setSkillsData(skills);
        setExperiencesData(experiences);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger le dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto mt-[1,5rem] flex w-full flex-1 flex-col bg-white px-4 py-8 text-black">
      <div>
        <h1 className="text-2xl font-semibold">
          Bonjour
        </h1>

        <p className="text-sm text-neutral">
          Voici un aperçu de votre activité
        </p>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>

        <CardContent>
          <AccountComponent></AccountComponent>
          <p className="text-sm font-medium font-semibold mt-5">
            Biographie:
          </p>

          <textarea
            value={profileData?.bio || ""}
            maxLength={500}
            placeholder="Veuillez renseigner une courte description de votre profil"
            onChange={(e) =>
              setProfileData({
                ...profileData!,
                bio: e.target.value,
              })
            }
            className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-2 text-sm text-neutral"
            rows={4}
          />

          <Button
            className="cursor-pointer hover:bg-gray-200"
            variant="outline"
            size="sm"
            onClick={handleBioChange}
          >
            Modifier ma biographie
          </Button>

          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm font-medium font-semibold">
              Expériences:
            </p>

            {experiencesData.length === 0 ? (
              <p className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                Aucune expérience renseignée.
              </p>
            ) : (
              <div className="flex w-full block rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm">
                <div className="flex w-full flex-col gap-3">
                  {experiencesData.map((experience) => (
                    <div
                      key={experience.id}
                      className="flex flex-col rounded-lg bg-main-1 px-4 py-6 text-left text-sm text-white"
                    >
                      <div className="flex items-center justify-between">
                        <span className="ml-2 font-medium font-semibold">
                          {experience.title} chez{" "}
                          {experience.company}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteExperience(experience.id)
                          }
                          className="flex h-5 w-5 items-center justify-center rounded-full text-white transition hover:bg-red-100 hover:text-red-600"
                          aria-label={`Supprimer ${experience.title}`}
                        >
                          ×
                        </button>
                      </div>

                      <span className="ml-2 mt-2 font-medium font-semibold">
                        Dates:
                      </span>

                      <span className="ml-2 text-neutral">
                        ({experience.startDate} -{" "}
                        {experience.endDate || "Présent"})
                      </span>

                      <span className="ml-2 mt-2 font-medium font-semibold">
                        Description:
                      </span>

                      <span className="ml-2 text-neutral">
                        {experience.description || "Aucune description"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showExperienceForm && (
              <Button
                className="cursor-pointer hover:bg-gray-200"
                variant="outline"
                size="sm"
                onClick={() => setShowExperienceForm(true)}
              >
                Ajouter une expérience
              </Button>
            )}

            {showExperienceForm && (
              <div className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 p-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Titre de l'expérience
                    </label>

                    <input
                      type="text"
                      value={experienceTitle}
                      onChange={(e) =>
                        setExperienceTitle(e.target.value)
                      }
                      placeholder="Ex: Développeur web"
                      className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Entreprise
                    </label>

                    <input
                      type="text"
                      value={experienceCompany}
                      onChange={(e) =>
                        setExperienceCompany(e.target.value)
                      }
                      placeholder="Ex: Entreprise XYZ"
                      className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      value={experienceDescription}
                      onChange={(e) =>
                        setExperienceDescription(e.target.value)
                      }
                      placeholder="Décrivez votre expérience"
                      rows={4}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Date de début
                      </label>

                      <input
                        type="date"
                        value={experienceStartDate}
                        onChange={(e) =>
                          setExperienceStartDate(e.target.value)
                        }
                        className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Date de fin
                      </label>

                      <input
                        type="date"
                        value={experienceEndDate}
                        onChange={(e) =>
                          setExperienceEndDate(e.target.value)
                        }
                        className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer hover:bg-gray-200"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowExperienceForm(false);
                        setExperienceTitle("");
                        setExperienceCompany("");
                        setExperienceDescription("");
                        setExperienceStartDate("");
                        setExperienceEndDate("");
                      }}
                    >
                      Annuler
                    </Button>

                    <Button
                      className="cursor-pointer hover:bg-gray-200"
                      variant="outline"
                      size="sm"
                      onClick={handleAddExperience}
                      disabled={
                        experienceLoading ||
                        !experienceTitle.trim() ||
                        !experienceCompany.trim()
                      }
                    >
                      {experienceLoading
                        ? "Ajout..."
                        : "Ajouter l'expérience"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm font-medium font-semibold">
              Compétences:
            </p>

            {skillsData.length === 0 ? (
              <p className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                Aucune compétence renseignée.
              </p>
            ) : (
              <div className="flex w-full flex-wrap gap-2 rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6">
                {skillsData.map((skill) => (
                  <div
                    key={skill.id}
                    className="group flex items-center gap-2 rounded-full border border-border bg-main-1 px-3 py-1.5 font-medium text-white transition hover:shadow-sm"
                  >
                    <span>{skill.name}</span>

                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-red-100 hover:text-red-600"
                      aria-label={`Supprimer ${skill.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!showSkillForm && (
              <Button
                className="cursor-pointer hover:bg-gray-200"
                variant="outline"
                size="sm"
                onClick={() => setShowSkillForm(true)}
              >
                Ajouter une compétence
              </Button>
            )}

            {showSkillForm && (
              <div className="flex w-full items-end gap-2 rounded-lg border border-dashed border-border bg-neutral-bg/50 p-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Nom de la compétence
                  </label>

                  <input
                    type="text"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    placeholder="Ex: React, TypeScript, Photoshop..."
                    className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                </div>

                <Button
                  className="cursor-pointer hover:bg-gray-200"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowSkillForm(false);
                    setSkillName("");
                  }}
                >
                  Annuler
                </Button>

                <Button
                  className="cursor-pointer hover:bg-gray-200"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSkill}
                  disabled={skillLoading || !skillName.trim()}
                >
                  {skillLoading ? "Ajout..." : "Ajouter"}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm font-medium font-semibold">
              Disponibilité:
            </p>

            <select
              value={profileData?.availability || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData!,
                  availability:
                    e.target.value === ""
                      ? null
                      : (e.target.value as Availability),
                })
              }
              className="rounded-lg border border-border bg-white px-4 py-2 text-sm cursor-pointer"
            >
              <option value="">Non renseignée</option>
              <option value={Availability.FULL_TIME}>
                Temps plein
              </option>
              <option value={Availability.PART_TIME}>
                Temps partiel
              </option>
              <option value={Availability.FREELANCE}>
                Freelance
              </option>
              <option value={Availability.UNAVAILABLE}>
                Indisponible
              </option>
            </select>

            <Button
              className="cursor-pointer hover:bg-gray-200"
              variant="outline"
              size="sm"
              onClick={handleBioChange}
            >
              Modifier ma disponibilité
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm font-medium font-semibold">
              Disponible à partir du:
            </p>

            <input
              type="date"
              value={profileData?.availableFrom || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData!,
                  availableFrom: e.target.value || null,
                })
              }
              className="rounded-lg border border-border bg-white px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
            />

            <Button
              className="cursor-pointer hover:bg-gray-200"
              variant="outline"
              size="sm"
              onClick={handleBioChange}
            >
              Modifier la disponibilité
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Mes candidatures récentes</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}