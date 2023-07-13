'use client'

import UsageCalculator from "@/ClientComponents/UsageCalculator";
import QuizTemplate from "@/ServerComponents/QuizTemplate";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Usage() {
  const router = useRouter()

  const [usage, setUsage] = useState(0)

  return <QuizTemplate>
    <div className="mt-2 w-full flex flex-col items-center">
      <UsageCalculator {...{usage, setUsage}} />
      <button className="h-16 text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer"
              onClick={()=>router.push('/results')}
      >
        Let&apos;s go
      </button>
    </div>
  </QuizTemplate>
}
