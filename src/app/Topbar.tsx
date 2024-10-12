import Link from "next/link"

const Topbar = () => {
    return (
        <nav className="flex p-5 gap-5">
            <Link href='/' className="text-2xl ">LOGO</Link>
            <div className="justify-end flex items-center gap-5">
                <Link href='/jobs' className="">All Jobs</Link>
                <Link href='/jobs/submitted' className="">Submitted Jobs</Link>
            </div>
        </nav>
    );
}

export default Topbar
