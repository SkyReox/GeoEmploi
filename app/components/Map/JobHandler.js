import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function ShowAllJobsButton() { const [jobs, setJobs] = useState([]);

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
        setJobs(validJobs);
      } else {
        setJobs([]);
        alert("Aucun emploi trouvé.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
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
        color: "#000",
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      All Jobs
    </button>

    {jobs.map((job) => (
        <Marker key={job.id} position={[job.latitude, job.longitude]} icon={L.icon({iconUrl: 'pointer.png', iconSize: [20, 20], className: 'redIcon'})}>
          <Popup>
            <strong>{job.title}</strong>
            <br />
            {job.location}
            {job.salary && (
              <>
                <br />
                {job.salary} €
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
}