import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Home() {
  return (
    <div className="w-full items-center flex flex-col p-32">
      <h1 className="text-center text-4xl font-bold">Do You Want To Find Your Next Development Job?</h1>
      <h1 className="m-4 text-2xl">Go find open hi-tech roles in Israel</h1>
      <Link href='/customize'>
        <Button className="rounded-full p-5 m-5 font-bold">Get Started</Button>
      </Link>
    </div>
  )
}
