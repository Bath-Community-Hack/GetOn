'use client'

import UsageCalculator from "@/ClientComponents/UsageCalculator";
import QuizTemplate from "@/ServerComponents/QuizTemplate";
import { useRouter } from "next/navigation";

export default function Usage() {
  const router = useRouter()

  return <QuizTemplate>
    <div className="mt-2 w-full flex flex-col items-center">
      <UsageCalculator setUsage={(x:any)=>{}} />

      <button className="h-16 text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer"
              onClick={()=>router.push('/results')}
      >
        Let&apos;s go
      </button>
    </div>
  </QuizTemplate>
}
