import JobsList from '../../components/JobsList'


export default function SubmittedJobsPage() {
  const url = '/api/jobs'

  return (
    <JobsList url={url}/>
  );
}
