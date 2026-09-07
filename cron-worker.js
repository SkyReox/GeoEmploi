const cron = require('node-cron');

console.log("Planificateur local démarré...");

cron.schedule('* * 1 * *', async () => {
  console.log(`[${new Date().toLocaleTimeString()}] Déclenchement du cron...`);

  try {
    const response = await fetch('http://localhost:3000/api/cron'); 
    const data = await response.json();
    console.log('Réponse du serveur Next.js:', data);
  } catch (error) {
    console.error('Erreur lors de l\'appel du cron Next.js:', error.message);
  }
});
