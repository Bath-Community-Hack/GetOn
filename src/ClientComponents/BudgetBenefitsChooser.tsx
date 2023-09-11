'use client'

import { useEffect, useState } from "react"
import info from '../../public/images/info.png'
import tick from '../../public/images/tick_blue.png'
import arrow from '../../public/images/arrow.png'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Benefit } from "@/synthesis/all-deals-types"
import { BenefitsTreeNode } from "@/synthesis/all-deals"

const budgets = [0,12,15,20]

export default function BudgetBenefitsChooser(
  {benefitsTree, benefitsOrder}:{
  benefitsTree: BenefitsTreeNode[],
  benefitsOrder: Benefit[]
}) {
  const router = useRouter()

  const [budgetId, setBudgetId] = useState<number|undefined>(undefined)

  useEffect(() => {
    if (budgetId === undefined) {
      setBudgetId(
        localStorage.getItem('budget') !== null
        ? budgets.indexOf(Number(localStorage.getItem('budget')))
        : 0)
    } else {
      localStorage.setItem('budget', String(budgets[budgetId]))
    }
  }, [budgetId])

  const [selectedBenefits, setSelectedBenefits] =
    useState<boolean[]|undefined>(undefined)

  useEffect(() => {
    if (selectedBenefits === undefined) {
      setSelectedBenefits(
        localStorage.getItem('benefits') !== null
        ? (() => {
          const benefits = JSON.parse(localStorage.getItem('benefits') as string) as Benefit[]
          return benefitsOrder.map(
            benefit => benefits.includes(benefit))
        })()
        : Array(benefitsOrder.length).fill(false))
    } else {
      localStorage.setItem(
        'benefits',
        JSON.stringify(
          benefitsOrder.filter((_,i)=>selectedBenefits[i])))
    }
  }, [selectedBenefits])

  function unselectBenefit({benefit, children}: BenefitsTreeNode) {
    if (selectedBenefits !== undefined) {
      const benefitIndex = benefitsOrder.indexOf(benefit)
      selectedBenefits[benefitIndex] = false
      children.forEach(unselectBenefit)
    }
  }

  function benefitEntry(
    {benefit,children}: BenefitsTreeNode,
    indent: number = 0,
    start: boolean = false,
    end: boolean = false)
  {
    const benefitIndex = benefitsOrder.indexOf(benefit)
    const selected =
      selectedBenefits !== undefined && selectedBenefits[benefitIndex]

    const parenthesesMatch = benefit.match(/\((.+)\)/)
    const displayName = parenthesesMatch?.[1] ?? benefit

    return <div key={benefitIndex}>
      <div className="my-1 w-full flex flex-row justify-between items-center"
        style={/*selected && children.length > 0*/false ? {
          paddingBottom: '5px',
          marginBottom: '0px',
          borderBottom: '3px solid #1C75BC'
        } : {}}
      >
      { indent > 0 ?
        <div style={{marginLeft: 0+(indent-1)*10+"px"}} className="flex flex-row items-center">
          <div className="relative w-4">
            <div className="absolute" style={
              { height: '34px',
                width: '12px',
                top: '-17px',
                borderLeft:'4px solid #1C75BC',
                ...(start ? {
                  borderTop: '4px solid #1C75BC',
                  borderTopLeftRadius: '12px'
                } : {}),
               ...(end ? {
                 borderBottom:'4px solid #1C75BC',
                 borderBottomLeftRadius:'12px'}
                 : {})
              }
            }/>
            </div>
          {displayName}
        </div>
         : displayName }
      <div className="h-7 w-7 rounded-xl shadow-[inset_2px_2px_3px_#888] relative cursor-pointer flex-none ms-4"
          style={{border:'2px solid #1C75BC'}}
          onClick={()=>{
            if (selectedBenefits !== undefined) {
              if (!selectedBenefits[benefitIndex]) {
                selectedBenefits[benefitIndex] = true
              } else {
                unselectBenefit({benefit,children})
              }
              console.log(benefitsOrder.filter((_,i)=>selectedBenefits[i]))
              setSelectedBenefits([...selectedBenefits])
            }
          }} >
        {selected &&
          <div className="w-10 h-10 absolute"
          style={{top:'-11px', left:'-3px'}}
        >
          <Image src={tick} alt="blue tick" />
        </div>}
      </div>
      </div>
      {selected && children.length > 0 &&
       children.map((node,i) =>
         benefitEntry(node, indent+1, i === 0, i === children.length-1))}
    </div>
  }

  return <>
    <div>
    <div className="flex flex-row items-center w-full">
      <div className="font-bold text-[#1C75BC] text-lg text-left w-full flex-grow">
        Your monthly budget
      </div>
      {/* <div className="w-8 ms-2 flex-none">
          <Image src={info} alt="info"/>
          </div> */}
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
      {/* <div className="w-8 ms-2 flex-none">
          <Image src={info} alt="info"/>
          </div> */}
    </div>
    {benefitsTree.map(node => benefitEntry(node))}
    </div>
    <button className="mt-4" onClick={() => {
      router.push('/usage')
    }}>
        <Image src={arrow} alt="right arrow" className="w-8"/>
    </button>
  </>
}
