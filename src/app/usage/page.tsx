'use client'

import UsageCalculator from "@/ClientComponents/UsageCalculator";
import QuizTemplate from "@/ServerComponents/QuizTemplate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import arrow from '../../../public/images/arrow.png'
import Image from "next/image";
import Step3of3 from '../../../public/images/step_3of3.png'

export default function Usage() {
  const router = useRouter()

  const [usage, setUsage] = useState(0)

  return <QuizTemplate>
    <div className="w-full flex flex-col items-center">
      <Image src={Step3of3} alt="Step 3 of 3" className="w-7/12 max-w-[220px]"/>
      <UsageCalculator {...{usage, setUsage}} />
      <button className="h-16 text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer"
              onClick={()=>router.push('/results')}
      >
        <Image src={arrow} alt="right arrow" className="w-8"/>
      </button>
    </div>
  </QuizTemplate>
}
