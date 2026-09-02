"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "SEEKER",
    conditions: false
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [id]: type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(formData);
  if (formData.email ==="" || formData.firstName === "" || formData.lastName === "") {
    setError("Veuillez remplir tous les champs.");
    return;
  }
  if (formData.password.length < 8) {
    setError("Le mot de passe doit contenir au moins 8 caractères.");
    return;
  }
  if (formData.password !== formData.passwordConfirm) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }
  if (!formData.conditions) {
    setError("Vous devez accepter les conditions d'utilisation et la politique de confidentialité.");
    return;
  }



  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
      role: formData.role
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    setError(errorData.error || "Une erreur est survenue lors de l'inscription.");
    return;
  }

  const signInResponse = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password
      });
  if(signInResponse.ok) {
    router.replace("/");
    router.refresh();
  }
  
};

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-main-2">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Prénom
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean-Eudes"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Nom de famille
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Berlier"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-email">
              Adresse e-mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jeaneudes.berlier@gouv.fr"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password">
              Mot de passe
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="******************"
            />
            <p className="text-gray-700 text-xs italic">Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password-confirm">
              Confirmer le mot de passe
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="******************"
            />
          </div>
        </div>
      <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password">
              Statut
            </label>
            <select className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role" value={formData.role} onChange={handleChange}>
              <option value="SEEKER">Chercheur</option>
              <option value="GIVER">Recruteur</option>
            </select>
          </div>
        </div>
      <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="password">
            <input id="conditions" onChange={handleChange} checked={formData.conditions} type="checkbox" className="mr-2 leading-tight" />
              Cliquez ici pour accepter nos <a href="/terms" className="text-blue-500 hover:text-blue-700">conditions d'utilisation</a> et notre <a href="/privacy" className="text-blue-500 hover:text-blue-700">politique de confidentialité</a>.
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              S'inscrire
            </button>
          </div>
        </div>
      <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <p className="text-gray-700 text-xs italic">Vous avez déjà un compte ? <a href="/login" className="text-blue-700 hover:text-blue-900">Connectez-vous ici</a>.</p>
          </div>
        </div>
      </form>
      {error && (
        <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
