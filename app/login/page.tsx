"use client"
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password
    });

    if (response?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    if(response.ok) {
      router.replace("/");
      router.refresh();
    }
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-main-2">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
            <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******************"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <p className="text-gray-700 text-xs italic">Vous n'avez pas de compte ? <a href="/signup" className="text-blue-700 hover:text-blue-900">Inscrivez-vous ici</a>.</p>
          </div>
        </div>
        {error && (
        <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-red-700">
          {error}
        </div>
      )}
      </form>
      
    </div>
  );
}
