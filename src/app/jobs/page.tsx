import JobsList from '../../components/JobsList'


export default function AllJobsPage() {
  const url = '/api/jobs'

  return (
    <JobsList url={url}/>
  );
}
