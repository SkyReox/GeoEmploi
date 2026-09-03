"use client"
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
  const [errors, setErrors] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(formData);
  if (formData.email === "" || formData.firstName === "" || formData.lastName === "") {
    setErrors("Veuillez remplir tous les champs.");
    return;
  }
  if (formData.password.length < 8) {
    setErrors("Le mot de passe doit contenir au moins 8 caractères.");
    return;
  }
  if (formData.password !== formData.passwordConfirm) {
    setErrors("Les mots de passe ne correspondent pas.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    setErrors("Veuillez entrer une adresse e-mail valide.");
    return;
  }

  if (!formData.conditions) {
    setErrors("Vous devez accepter les conditions d'utilisation et la politique de confidentialité.");
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

  console.log(response);

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    setErrors(errorData?.error || "Une erreur est survenue lors de l'inscription.");
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
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-x-hidden bg-zinc-50 px-3 py-8 font-sans bg-main-2 sm:px-6 sm:py-12">
      <form className="w-full max-w-lg mt-[1.25rem]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-1/2">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="firstName">
              Prénom
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean-Eudes"
              maxLength={100}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="lastName">
              Nom de famille
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Berlier"
              maxLength={100}
            />
          </div>
        </div>
        <div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="email">
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
        <fieldset>
          <label className="text-gray-900 font-bold mb-2">
            Sécurité
          </label>
          <div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="password">
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
          <div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="passwordConfirm">
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
        </fieldset>
      <div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="role">
              Statut
            </label>
            <select className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role" value={formData.role} onChange={handleChange}>
              <option value="SEEKER">Chercheur</option>
              <option value="GIVER">Recruteur</option>
            </select>
          </div>
        </div>
      <div>
          <div className="w-full">
            <label className="flex items-start gap-2 text-xs font-bold leading-relaxed text-gray-900" htmlFor="conditions">
              <input id="conditions" onChange={handleChange} checked={formData.conditions} type="checkbox" className="mt-0.5 shrink-0 leading-tight" />
              <span>Cliquez ici pour accepter nos <a href="/terms" className="text-blue-500 hover:text-blue-700">conditions d'utilisation</a> et notre <a href="/privacy" className="text-blue-500 hover:text-blue-700">politique de confidentialité</a>.</span>
            </label>
          </div>
        </div>
        <div>
          <div className="w-full">
            <button
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline sm:w-auto"
              type="submit"
              aria-label="S'inscrire"
            >
              S'inscrire
            </button>
          </div>
        </div>
      <div>
          <div className="w-full">
            <p className="text-gray-700 text-xs italic">Vous avez déjà un compte ? <a href="/login" className="text-blue-700 hover:text-blue-900">Connectez-vous ici</a>.</p>
          </div>
        </div>
        {errors && (
        <div className="break-words rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
          {errors}
        </div>
      )}
      </form>
    </div>
  );
}
