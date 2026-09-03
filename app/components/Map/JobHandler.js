import { useMap } from 'react-leaflet';

export default function ShowAllJobsButton() {
  const map = useMap();

  async function handleClick() {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      const jobs = data.jobs || [];
      console.log('Fetched jobs:', data);
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des emplois.');
      }
      const validJobs = jobs.filter(
        (job) => job.latitude != null && job.longitude != null
      );
      
      if (validJobs.length > 0) {
        const bounds = validJobs.map((job) => [job.latitude, job.longitude]);
        map.fitBounds(bounds);
      } else {
        alert("Aucun emploi trouvé.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: 80,
        right: 10,
        zIndex: 1000,
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      All Jobs
    </button>
  );
}