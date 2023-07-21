'use client'

import { useEffect, useState } from "react"
import info from '../../public/images/info.png'
import tick from '../../public/images/tick_blue.png'
import arrow from '../../public/images/arrow.png'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Benefit } from "@/synthesis/all-deals-types"

const budgets = [0,12,15,20]

export default function BudgetBenefitsChooser(
  {benefitOrder, searchParams}:{
  benefitOrder: Benefit[],
  searchParams: any
}) {
  const router = useRouter()

  const [budgetId, setBudgetId] = useState(
    searchParams.budget !== undefined
    ? budgets.indexOf(Number(searchParams.budget)) : 0)

  const [selectedBenefits, setSelectedBenefits] = useState(
    searchParams.benefits !== undefined
    ? benefitOrder.map(
      benefit => searchParams.benefits.includes(benefit))
    : Array(benefitOrder.length).fill(false)
  )

  useEffect(() => {
    if (localStorage.getItem('next')) {
      localStorage.removeItem('next')
      router.push('/usage?'+(new URLSearchParams(searchParams)).toString())
    }
  })

  return <>
    <div>
    <div className="flex flex-row items-center w-full">
      <div className="font-bold text-[#1C75BC] text-lg text-left w-full flex-grow">
        Your monthly budget
      </div>
      <div className="w-8 ms-2 flex-none">
        <Image src={info} alt="info"/>
      </div>
    </div>
    <div className="flex flex-row justify-around w-full m-3">
      {budgets.map((budget,id)=>(
        <div key={budget}
        className="flex flex-col items-center cursor-pointer"
          onClick={()=>{setBudgetId(id)}}
        >
          <div className={
          "shadow-[inset_2px_2px_3px_#888] w-7 h-7"
          +" rounded-2xl flex justify-center items-center"
          }
        >
            {id === budgetId &&
            <div className="bg-[#1C75BC] rounded-xl w-4 h-4"/>}
          </div>
          <div className="p-2">
          £{budget}{id === budgets.length-1 ? '+' : ''}
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-row items-center w-full mb-2">
      <div className="font-bold text-[#1C75BC] text-lg text-left w-full flex-grow leading-5">
        Which of these apply to you?
      </div>
      <div className="w-8 ms-2 flex-none">
        <Image src={info} alt="info"/>
      </div>
    </div>
    {benefitOrder.map((benefit, i)=>(
      <div key={i} className="my-1 w-full flex flex-row justify-between items-center">
        {benefit}
        <div className="h-7 w-7 rounded-xl shadow-[inset_2px_2px_3px_#888] relative cursor-pointer flex-none ms-4"
           style={{border:'2px solid #1C75BC'}}
           onClick={()=>{
             selectedBenefits[i] = !selectedBenefits[i]
             setSelectedBenefits([...selectedBenefits])
           }}
        >
          {selectedBenefits[i] &&
           <div className="w-10 h-10 absolute"
            style={{top:'-11px', left:'-3px'}}
          >
            <Image src={tick} alt="blue tick" />
          </div>}
        </div>
      </div>))}
    </div>
    <button className="mt-4" onClick={() => {
      localStorage.setItem('next','1')
      const queryString = new URLSearchParams({
        ...searchParams,
        budget: String(budgets[budgetId]),
        benefits: benefitOrder.filter((_,i)=>selectedBenefits[i]).join(',')
      }).toString()
      router.replace('/budget?'+queryString)
    }}>
        <Image src={arrow} alt="right arrow" className="w-8"/>
    </button>
  </>
}
