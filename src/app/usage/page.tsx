import UsageCalculator from "@/ClientComponents/UsageCalculator";
import QuizTemplate from "@/ServerComponents/QuizTemplate";
import Image from "next/image";
import Step3of3 from '../../../public/images/step_3of3.png'

export default function Usage({searchParams}:{
  searchParams:Record<string,string>
}) {
  return <QuizTemplate>
    <div className="w-full flex flex-col items-center">
      <Image src={Step3of3} alt="Step 3 of 3" className="w-7/12 max-w-[220px]"/>
      <UsageCalculator {...{searchParams}}/>
    </div>
  </QuizTemplate>
}
