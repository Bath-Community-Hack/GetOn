import QuizTemplate from "@/ServerComponents/QuizTemplate";
import Image from "next/image";
import Step2of3 from '../../../public/images/step_2of3.png'
import { useRouter } from "next/navigation";

import { getTopLevelBenefits } from '../../synthesis/all-deals'
import BudgetBenefitsChooser from "@/ClientComponents/BudgetBenefitsChooser";

export default async function Budget() {
  //const router = useRouter()

  return <QuizTemplate>
    <Image src={Step2of3} alt="Step 2 of 3"
      className="w-7/12 max-w-[220px] mb-4"
      />
    <BudgetBenefitsChooser {...{
        benefitOrder:await getTopLevelBenefits(),
      }} />
  </QuizTemplate>
}
