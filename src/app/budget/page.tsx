import QuizTemplate from "@/ServerComponents/QuizTemplate";
import Image from "next/image";
import Step2of3 from '../../../public/images/step_2of3.png'

export default function Budget(
  {searchParams:{postCode}}:{searchParams:{postCode:string}}
) {
  return <QuizTemplate>
      <Image src={Step2of3} alt="Step 2 of 3"
      className="w-7/12 max-w-[220px]"
      />
    <div>hello uh your postcode is {postCode} ok bye</div>
    <div>
      <a href="/usage" className="text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer">next</a>
    </div>
  </QuizTemplate>
}
