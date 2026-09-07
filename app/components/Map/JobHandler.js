import { useState, useMemo } from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function ShowAllJobsButton() {
  const [jobs, setJobs] = useState([]);
  const [applyStatus, setApplyStatus] = useState({});

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

  async function handleApply(jobId) {
    setApplyStatus((prev) => ({ ...prev, [jobId]: 'loading' }));
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la candidature.');
      }
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'success' }));
    } catch (err) {
      console.error(err);
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'error' }));
    }
  }

  const groupedJobs = useMemo(() => {
    const groups = new Map();
    for (const job of jobs) {
      const key = `${job.latitude},${job.longitude}`;
      if (!groups.has(key)) {
        groups.set(key, {
          latitude: job.latitude,
          longitude: job.longitude,
          jobs: [],
        });
      }
      groups.get(key).jobs.push(job);
    }
    return Array.from(groups.values());
  }, [jobs]);

  function ApplyButton({ job }) {
    const status = applyStatus[job.id];
    if (status === 'success') {
      return <span style={{ color: 'green' }}>Candidature envoyée</span>;
    }
    return (
      <button
        onClick={() => handleApply(job.id)}
        disabled={status === 'loading'}
        className="apply-button"
      >
        {status === 'loading' ? 'Envoi...' : 'Postuler'}
      </button>
    );
  }

  console.log('Grouped:', groupedJobs.map(g => ({ addr: g.jobs[0].location, count: g.jobs.length })));
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
      <>
        {groupedJobs.map((group) => (
          <Marker
            key={`${group.latitude},${group.longitude}`}
            position={[group.latitude, group.longitude]}
            icon={L.icon({
              iconUrl: 'pointer.png',
              iconSize: [20, 20],
              className: 'redIcon',
            })}
          >
            <Popup>
              {group.jobs.length > 1 ? (
                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {group.jobs.map((job, i) => (
                    <div
                      key={job.id}
                      style={{
                        paddingBottom: 6,
                        marginBottom: 6,
                        borderBottom:
                          i < group.jobs.length - 1 ? '1px solid #eee' : 'none',
                      }}
                    >
                      <strong>{job.title}</strong>
                      <br />
                      {job.location}
                      {job.salary && (
                        <>
                          <br />
                          {job.salary} €
                        </>
                      )}
                      <br />
                      <ApplyButton job={job} />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <strong>{group.jobs[0].title}</strong>
                  <br />
                  {group.jobs[0].location}
                  {group.jobs[0].salary && (
                    <>
                      <br />
                      {group.jobs[0].salary} €
                    </>
                  )}
                  <br />
                  <ApplyButton job={group.jobs[0]} />
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </>
    </>
  );
}