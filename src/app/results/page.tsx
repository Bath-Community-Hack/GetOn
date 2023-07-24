'use client'

import Image from 'next/image'
import results from '../../../public/images/results.png'

import localFont from 'next/font/local'
import QuizTemplate from '@/ServerComponents/QuizTemplate'

import { getAllDeals } from '@/synthesis/all-deals'

import GoToWebsite from '../../../public/images/go_to_website.png'
import filteredDeals from '@/filtering/filter-deals'
import { Benefit, Deal, OfcomRegion } from '@/synthesis/all-deals-types'
import axios from 'axios'
import { useEffect, useState } from 'react'

import tick from '../../../public/images/tick_blue.png'

const gothamBold = {className:'font-bold'}//localFont({src: '../../../public/fonts/Gotham-Font/GothamBold.ttf'})

function Item({item, first}:{item:Deal, first:boolean}) {
  const regions =
    typeof localStorage !== 'undefined' && localStorage.getItem('regions')
    ? JSON.parse(localStorage.getItem('regions') as string)
    : []
  const budget =
    typeof localStorage !== 'undefined' && localStorage.getItem('budget')
    ? Number(localStorage.getItem('budget') as string)
    : 0
  const usage =
    typeof localStorage !== 'undefined' && localStorage.getItem('usage')
    ? Number(localStorage.getItem('usage') as string)
    : 0
  return <div className="flex-col flex items-center max-w-sm w-full">
    <div className={
      "flex justify-between gap-4 items-start w-full"
      +(first ? '' : " border-t border-black pt-3")
    }>
      <div className="flex-[2] text-base">{item.name}</div>
      <div className="flex-[3] text-right flex flex-col">
        <div className={
          "text-2xl font-extrabold "
          +gothamBold.className
          +(budget*100 < item.price.pounds*100+item.price.pence
            ? " text-[#BE1E2D]" : " text-[#1C75BC]")
        }>
          £
          <span className="text-3xl">
            {Number(item.price.pounds)}
          </span>
          .{(item.price.pence < 10 ? '0' : '')
            +String(item.price.pence)}
        </div>
        <div>
          per month
        </div>
      </div>
    </div>
    <div className="flex justify-around w-full items-center mt-3 mb-1">
      {item.speed === 'mobile'
      ? <div className={
          "text-[#1C75BC] text-center "
          +gothamBold.className
          }>
          <p>Mobile</p>
          <p>network</p>
          <p>speeds</p>
        </div>
      : <div className="flex flex-col justify-around items-center">
          <div>up to</div>
          <div className={
            "text-[#1C75BC] text-3xl "
            +gothamBold.className
            +(usage > item.speed ? " text-[#BE1E2D]" : " text-[#1C75BC]")
            }>
            {item.speed}
          </div>
          <div>Mbps</div>
        </div>}
      <div className="text-right">
        {(item.regions.includes('UK'))
        ? <div className="flex items-center justify-end">
        <Image className="w-6 h-6" src={tick} alt="blue tick" />
        <p className={gothamBold.className+" text-[#1C75BC]"}>
          UK wide
        </p>
        </div>
        : <>
          <p>Available in:</p>
          {item.regions.map(region => (
            regions.includes(region)
            ? <div key={region} className="flex items-center justify-end">
                <Image className="w-6 h-6" src={tick} alt="blue tick" />
                <p className={gothamBold.className+" text-[#1C75BC]"}>
                  {region}
                </p>
              </div>
            : <div key={region} className={gothamBold.className+" text-gray-400"}>
              {region}
            </div>))}
        </>
        }
      </div>
    </div>
    <div className="w-fit m-2 text-center">
      <a href={item.href} target="_blank" className="inline-block flex justify-center">
        <Image src={GoToWebsite} alt="Go to website"
        className="max-w-[90%] w-64"
        />
      </a>
    </div>
  </div>
}

export default function Results() {

  const [regions, setRegions] = useState<OfcomRegion[]|undefined>(undefined)
  useEffect(() => {
    if (regions === undefined) {
      const newRegions = localStorage.getItem('regions') !== null
        ? JSON.parse(localStorage.getItem('regions') as string)
        : undefined
      if (newRegions !== undefined) setRegions(newRegions)
    }
  }, [regions])

  const [budget, setBudget] = useState<OfcomRegion[]|undefined>(undefined)
  useEffect(() => {
    if (budget === undefined) {
      const newBudget = localStorage.getItem('budget') !== null
        ? JSON.parse(localStorage.getItem('budget') as string)
        : undefined
      if (newBudget !== undefined) setBudget(newBudget)
    }
  }, [budget])

  const [benefits, setBenefits] = useState<OfcomRegion[]|undefined>(undefined)
  useEffect(() => {
    if (benefits === undefined) {
      const newBenefits = localStorage.getItem('benefits') !== null
        ? JSON.parse(localStorage.getItem('benefits') as string)
        : undefined
      if (newBenefits !== undefined) setBenefits(newBenefits)
    }
  }, [benefits])

  const [usage, setUsage] = useState<OfcomRegion[]|undefined>(undefined)
  useEffect(() => {
    if (usage === undefined) {
      const newUsage = localStorage.getItem('usage') !== null
        ? JSON.parse(localStorage.getItem('usage') as string)
        : undefined
      if (newUsage !== undefined) setUsage(newUsage)
    }
  }, [usage])

  const [deals, setDeals] =
    useState<undefined|{error:string}|(Deal&{penalty:number,maxPenalty:number,valid:boolean})[]>(undefined)

  useEffect(() => {
    if ([regions,budget,benefits,usage].every(x=>x!==undefined)) {
      axios.post(
        '/api/get-filtered-deals',
        {regions, budget, benefits, usage})
           .then(res=>{
             setDeals(res.data.deals)
           })
    }
  }, [regions, budget, benefits, usage])

  const sectionTitle = (s:string, border:boolean|'block' = true) => (
    <div className={ "max-w-sm w-full text-3xl text-[#1C75BC] "
                  +' mt-2 pb-2 '
                  + gothamBold.className
                  +(border ? ' border-t border-[#1C75BC] pt-4' : '')
                  +(border && border !== 'block' ? ' border-t-4' : '')
                   +(border === 'block' ? ' border-t-[200px] pt-10': '')}>
      {s}
    </div>
  )

  return <QuizTemplate>
    <div className="max-w-sm w-full">
      {sectionTitle('Your details:',false)}
      {regions !== undefined &&
      <div className="flex w-full justify-between items-start border-t py-1">
        <span className={
          "text-xl text-[#1C75BC] "+gothamBold.className
        }>Regions:</span>
        <div className="text-right">
          {regions.map(region=><p key={region}>{region}</p>)}
        </div>
      </div>}
      {benefits !== undefined &&
      <div className="flex w-full justify-between items-start gap-12 border-t py-1">
        <span className={
          "text-xl text-[#1C75BC] "+gothamBold.className
        }>Eligibility criteria:</span>
        <div className="text-right leading-4">
          {benefits.map(
            (region,i)=><p className={i ? "mt-2" : 'mt-1'} key={region}>{region}</p>)}
        </div>
      </div>}
      {budget !== undefined &&
       <div className="flex w-full justify-between items-center gap-12 border-t py-1">
         <span className={
         "text-xl text-[#1C75BC] "+gothamBold.className
         }>Budget:</span>
         <div className="text-right flex items-center justify-end">
            <div className={
              "text-2xl font-extrabold me-1 "
              +gothamBold.className
            }>
              £
              <span className="text-3xl">
                {Number(budget)}
              </span>
            </div>
            <div>
              per month
            </div>
          </div>
       </div>
      }
      {usage !== undefined &&
       <div className="flex w-full justify-between items-center gap-12 border-t py-1">
         <span className={
         "text-xl text-[#1C75BC] "+gothamBold.className
         }>Internet usage:</span>
         <div className="text-right flex items-center justify-end">
            <div className={
              "text-2xl font-extrabold me-1 "
              +gothamBold.className
            }>
              <span className="text-3xl">
                {Number(usage)}
              </span>
            </div>
            <div>
              Mbps
            </div>
          </div>
       </div>
      }
    </div>
    {deals ? (
      'error' in deals
      ? 'An error occurred fetching the offers'
      : (()=> {
          const validDeals = deals.filter(deal=>deal.valid)
          const invalidDeals = deals.filter(deal=>!deal.valid)
          invalidDeals.sort(({maxPenalty:a},{maxPenalty:b})=>a-b)
          return <>
            {validDeals.length > 0
             ? <>
              {sectionTitle('Results:')}
              {validDeals.map((deal, id) =>
               <Item key={id} item={deal} first={id === 0}/>)}
              </>
             : <div className="max-w-sm text-center text-lg text-[#1C75BC] border-t-4 border-[#1C75BC] mt-2 py-3">
               <p>It looks like there weren&apos;t any precise matches, sorry.</p>
               <p>Double-check your details, or try taking a look through our{" "}
                 <a className="underline"
                    href="https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/costs-and-billing/social-tariffs">
                   source data
                 </a>
                 {" "}in case we&apos;ve missed anything.
               </p>
             </div>}
            {invalidDeals.length > 0 && <>
              {sectionTitle('Close misses:',validDeals.length > 0 ? 'block' : true)}
            {invalidDeals.map((deal,id) =>
              <Item key={id} item={deal} first={id === 0}/>)
            .slice(0,5)}
            </>}
          </>
        })())
    : sectionTitle('Searching...')}
  </QuizTemplate>
}
