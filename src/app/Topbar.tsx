import Link from "next/link"
import { SearchCheck } from "lucide-react"

const Topbar = () => {
    return (
        <nav className="flex p-5 gap-7">
            <Link href='/'>
                <SearchCheck className="h-10 w-10"/>
            </Link>
            <div className="justify-end flex items-center gap-5">
                <Link href='/jobs' className="text-slate-500 hover:text-lime-600">All Jobs</Link>
                <Link href='/jobs/submitted' className="text-slate-500 hover:text-lime-600">Submitted Jobs</Link>
                <Link href='/jobs/deleted' className="text-slate-500 hover:text-lime-600">Deleted Jobs</Link>
            </div>
        </nav>
    );
}

export default Topbar
