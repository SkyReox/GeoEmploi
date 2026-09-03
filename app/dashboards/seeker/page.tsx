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

type Profile = {
  bio: string | null;
  skills: Skill[];
  availability: Availability | null;
  availableFrom: string | null;
};

export default function Home() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [experiencesData, setExperiencesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const handleAddSkill = () => {
    const skillName = prompt("Entrez le nom de la compétence à ajouter :");
    if (skillName) {
      fetch("/api/seeker/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skillName }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la compétence.");
          }
          return response.json();
        })
        .then((newSkill) => {
          setSkillsData((prevSkills) => [...prevSkills, newSkill]);
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de l'ajout de la compétence.");
        });
    }
  }

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
        }
    };

    const handleAddExperience = () => {
        const title = prompt("Entrez le titre de l'expérience :");
        const company = prompt("Entrez le nom de l'entreprise :");
        const description = prompt("Entrez la description de l'expérience :");
        const startDate = prompt("Entrez la date de début (YYYY-MM-DD) :");
        const endDate = prompt("Entrez la date de fin (YYYY-MM-DD) :");
        if (title && company) {
            fetch("/api/seeker/experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    company: company,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                 }),
            })
            .then((response) => {
                if (!response.ok) {
                    console.log("Response :", response);
                    throw new Error("Erreur lors de l'ajout de l'expérience.");
                }
                return response.json();
            })
            .then((newExperience) => {
                setExperiencesData((prevExperiences) => [...prevExperiences, newExperience]);
            })
            .catch((err) => {
                console.error(err);
                alert("Erreur lors de l'ajout de l'expérience.");
            });
        }
    };

    const handleBioChange = async () => {
        try {
            console.log("Updating bio:", profileData);
            const response = await fetch("/api/seeker/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    bio: profileData?.bio ,
                    availability: profileData?.availability, 
                    availableFrom: profileData?.availableFrom ? profileData.availableFrom : "",
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la biographie.");
            }

            const updatedProfile = await response.json();
            setProfileData(updatedProfile);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteExperience = async (experienceId: string) => {
        try {
            const response = await fetch(`/api/seeker/experiences/${experienceId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'expérience.");
            }

            setExperiencesData((prev) =>
                prev.filter((experience) => experience.id !== experienceId)
            );
        } catch (error) {
            console.error(error);
        }
    }


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
        <h1 className="text-2xl font-semibold text-ink">
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

          <p className="text-sm text-ink font-medium font-semibold">Biographie :</p>
          <textarea
            value={profileData?.bio || ""}
            maxLength={500}
            placeholder="Veuillez renseigné une courte description de votre profile"
            onChange={(e) => setProfileData({ ...profileData!, bio: e.target.value })}
            className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-2 text-sm text-neutral"
            rows={4}
          />
          <Button variant="outline" size="sm" onClick={handleBioChange}>
            Modifier ma biographie
          </Button>
          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm text-ink font-medium font-semibold">Expériences :</p>
            {experiencesData.length === 0 ? (
              <p className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                Aucune expérience renseignée.
              </p>
            ) : (
              <div className="flex w-full block rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm">
                {experiencesData.map((experience) => (
                  <div key={experience.id} className="flex flex-col rounded-lg bg-main-1 px-4 py-6 text-left text-sm text-white">
                    <div className="flex">
                        <span className="ml-2 font-medium font-semibold">{experience.title} chez {experience.company}</span>
                        <button
                            type="button"
                            onClick={() => handleDeleteExperience(experience.id)}
                            className="flex h-5 w-5 items-center justify-center ml-2 rounded-full text-neutral transition hover:bg-red-100 hover:text-red-600"
                            aria-label={`Supprimer ${experience.title}`}
                        >
                            ×
                        </button>

                    </div>
                    <span className="ml-2 font-medium font-semibold">Dates :</span>
                    <span className="ml-2 text-neutral">({experience.startDate} - {experience.endDate || "Présent"})</span>
                    <span className="ml-2 font-medium font-semibold">Description :</span>
                    <span className="ml-2 text-neutral ">{experience.description}</span>
                    </div>
                ))}
              </div>
            )}
          <Button variant="outline" size="sm" onClick={handleAddExperience}>
            Ajouter une expérience
          </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <p className="text-sm text-ink font-medium font-semibold">Compétences :</p>
            {skillsData.length === 0 ? (
            <p className="w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                Aucune compétence renseignée.
            </p>
            ) : (
            <div className="flex flex-wrap gap-2 w-full">
                <div className=" flex w-full rounded-lg border border-dashed border-border bg-neutral-bg/50 px-4 py-6 text-center text-sm text-neutral">
                {skillsData.map((skill) => (
                
                        <div
                            key={skill.id}
                            className="group flex items-center gap-2 rounded-full border border-border bg-main-1 px-3 py-1.5  font-medium text-ink transition hover:shadow-sm text-white"
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
                </div>
                )}
            <Button variant="outline" size="sm" onClick={handleAddSkill}>
                Ajouter une compétence
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mes candidatures récentes</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}