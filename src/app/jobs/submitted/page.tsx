import JobsList from '../../../components/JobsList'


export default function SubmittedJobsPage() {
  const url = '/api/jobs/submitted'

  return (
    <JobsList url={url}/>
  );
}
