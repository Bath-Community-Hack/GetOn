'use client'

import QuizTemplate from "@/ServerComponents/QuizTemplate";
import Image from "next/image";
import Step2of3 from '../../../public/images/step_2of3.png'
import arrow from '../../../public/images/arrow.png'
import { useRouter } from "next/navigation";

export default function Budget(
  {searchParams:{postCode}}:{searchParams:{postCode:string}}
) {
    const router = useRouter()
  return <QuizTemplate>
      <Image src={Step2of3} alt="Step 2 of 3"
      className="w-7/12 max-w-[220px]"
      />
    <div>hello uh your postcode is {postCode} ok bye</div>
    <button className="mt-4" onClick={() => {
        router.push('/usage')
    }}>
        <Image src={arrow} alt="right arrow" className="w-8"/>
    </button>
  </QuizTemplate>
}
