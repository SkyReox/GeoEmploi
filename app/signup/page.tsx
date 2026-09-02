import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-main-2">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white bg-main-1 sm:items-start">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text" 
                placeholder="Jean-Eudes"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Nom de famille <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Berlier"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-email">
                Adresse e-mail <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="jeaneudes.berlier@gouv.fr"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
              <p className="text-gray-700 text-xs italic">C'est la taille qui compte</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password-confirm">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password-confirm"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password">
                Statut <span className="text-red-500">*</span>
              </label>
              <select className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country">
                <option>Chercheur</option>
                <option>Recruteur</option>
              </select>
            </div>
          </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="grid-password">
              <input type="checkbox" className="mr-2 leading-tight" />
                Cliquez ici pour accepter nos <a href="/terms" className="text-blue-700 hover:text-blue-900">conditions d'utilisation</a> et notre <a href="/privacy" className="text-blue-700 hover:text-blue-900">politique de confidentialité</a>.
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
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
      </main>
    </div>
  );
}
