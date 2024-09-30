import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Home() {
  return (
    <div className="w-full items-center flex flex-col p-32">
      <h1 className="text-center text-3xl ">Do You Want To Find Your Next Development Job?</h1>
      <h1 className="m-4 text-lg">Go find open junior roles in Israel</h1>
      
      <Link href='/jobs'>
        <Button className="rounded-full">Let`s Start</Button>
      </Link>
    </div>
  )
}
