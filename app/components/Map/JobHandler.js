import { useState, useMemo } from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../ui/button';

export default function ShowAllJobsButton() {
  const [jobs, setJobs] = useState([]);
  const [applyStatus, setApplyStatus] = useState({});
  const [applyMessage, setApplyMessage] = useState({});
  const [reportMessage, setReportMessage] = useState({});
  const [reportStatus, setReportStatus] = useState({});

  async function checkAuth() {
    try {
      const res = await fetch('/api/me');
      if (!res.ok) {
        alert("Vous devez être connecté pour effectuer cette action.");
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      alert("Vous devez être connecté pour effectuer cette action.");
      return false;
    }
  }

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
    const isAuth = await checkAuth();
    if (!isAuth) {
      return;
    }
    setApplyStatus((prev) => ({ ...prev, [jobId]: 'loading' }));
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setApplyMessage((prev) => ({ ...prev, [jobId]: 'already-applied' }));
        setApplyStatus((prev) => ({ ...prev, [jobId]: data.error }));
        return (
          <Popup>
            Vous avez déjà postulé à cet emploi.
          </Popup>
        );
      }
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'success' }));
      setApplyMessage((prev) => ({ ...prev, [jobId]: data.message || 'Candidature envoyée avec succès.' }));
    } catch (err) {
      console.error(err);
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'error' }));
      setApplyMessage((prev) => ({ ...prev, [jobId]: err.message}));
    }
  }

  async function handleReport(jobId) {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return;
    }
    setReportStatus((prev) => ({ ...prev, [jobId]: 'loading' }));
    try {
      const res = await fetch(`/api/jobs/${jobId}/report`, {
        method: 'POST',
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setReportMessage((prev) => ({ ...prev, [jobId]: 'already-reported' }));
        setReportStatus((prev) => ({ ...prev, [jobId]: data.error }));
        return (
          <Popup>
            Cette offre a déjà été signalée.
          </Popup>
        );
      }
      setReportStatus((prev) => ({ ...prev, [jobId]: 'success' }));
      setReportMessage((prev) => ({ ...prev, [jobId]: data.message || 'Offre signalée avec succès.' }));
    } catch (err) {
      console.error(err);
      setReportStatus((prev) => ({ ...prev, [jobId]: 'error' }));
      setReportMessage((prev) => ({ ...prev, [jobId]: err.message}));
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

  function ReportButton({ job }) {
    const message = reportMessage[job.id];
    const statusR = reportStatus[job.id];
    if (statusR === 'success')
      return <span style={{ color: 'green' }}>Vous avez bien signalé cette offre.</span>;
    if (message === 'already-reported')
      return <span style={{ color: 'orange' }}>Offre déjà signalée.</span>;
    return (
      <Button
        onClick={() => handleReport(job.id)}
        className='report-button'
        disabled={statusR === 'loading'}
        variant="outline">
        {statusR === 'loading' ? 'Envoi...' : 'Signaler'}  
      </Button>
    );
  }

  function ApplyButton({ job }) {
    const status = applyStatus[job.id];
    const message = applyMessage[job.id];

    if (status === 'success') {
      return <span style={{ color: 'green' }}>Candidature envoyée</span>;
    }
    if (message === 'already-applied') {
      return <span style={{ color: 'orange' }}>Vous avez déjà postulé</span>;
    }
    return (
      <Button
        onClick={() => handleApply(job.id)}
        disabled={status === 'loading'}
        className="apply-button"
        variant="outline"
      >
        {status === 'loading' ? 'Envoi...' : 'Postuler'}
      </Button>
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
                      <br />
                      <ReportButton job={job} />
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
                      <ApplyButton job={group.jobs[0]} />
                      <ReportButton job={group.jobs[0]} />
                      <a href={`/job/${group.jobs[0].id}`}>Détails</a>
                    </>
                  )}
                  <br />

                </>
              )}
            </Popup>
          </Marker>
        ))}
      </>
    </>
  );
}