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

const gothamBold = localFont({src: '../../../public/fonts/Gotham-Font/GothamBold.ttf'})

function Item({item, first}:{item:Deal, first:boolean}) {
  const regions =
    window && localStorage.getItem('regions')
    ? JSON.parse(localStorage.getItem('regions') as string)
    : []
  return <div className="flex-col flex items-center max-w-sm w-full">
    <div className={
      "flex justify-between gap-4 items-start w-full"
      +(first ? '' : " border-t border-black pt-3")
    }>
      <div className="flex-[2] text-base">{item.name}</div>
      <div className="flex-[3] text-right flex flex-col">
        <div className={
          "text-[#1C75BC] text-2xl font-extrabold "
          +gothamBold.className
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
    <div className="flex justify-around w-full items-center">
      {item.speed === 'mobile'
      ? <div className={
          "text-[#1C75BC] text-center "
          +gothamBold.className
          }>
          <p>Mobile</p>
          <p>broadband</p>
        </div>
      : <div className="flex flex-col justify-around items-center">
          <div>up to</div>
          <div className={
            "text-[#1C75BC] text-3xl "
            +gothamBold.className
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
      <a href={item.href} className="inline-block flex justify-center">
        <Image src={GoToWebsite} alt="Go to website"
        className="max-w-[90%] w-64"
        />
      </a>
    </div>
  </div>
}

export default function Results() {
  const regions: OfcomRegion[] | null =
    window && localStorage.getItem('regions') !== null
    ? JSON.parse(localStorage.getItem('regions') as string)
    : null
  const budget: number | null =
    window && localStorage.getItem('budget') !== null
    ? Number(localStorage.getItem('budget'))
    : null
  const benefits: Benefit[] | null =
    window && localStorage.getItem('benefits') !== null
    ? JSON.parse(localStorage.getItem('benefits') as string)
    : null
  const usage: number | null =
    window && localStorage.getItem('usage') !== null
    ? Number(localStorage.getItem('usage'))
    : null

  const [deals, setDeals] = useState<undefined|{error:string}|Deal[]>(undefined)

  useEffect(() => {
    axios.post(
      '/api/get-filtered-deals',
      {regions, budget, benefits, usage})
         .then(res=>setDeals(res.data.deals))
  }, [])

  return <QuizTemplate>
    {deals ? ('error' in deals
    ? 'An error occurred fetching the offers'
    : deals.map((deal, id) =>
      <Item key={id} item={deal} first={id === 0}/>))
    : <span className="text-[#1C75BC] text-xl">Searching...</span>}
  </QuizTemplate>
}
