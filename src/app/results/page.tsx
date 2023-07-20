import Image from 'next/image'
import results from '../../../public/images/results.png'

import localFont from 'next/font/local'
import QuizTemplate from '@/ServerComponents/QuizTemplate'

import { Deal, getAllDeals } from '@/synthesis/all-deals'

import GoToWebsite from '../../../public/images/go_to_website.png'
import filteredDeals from '@/filtering/filter-deals'

const gothamBold = localFont({src: '../../../public/fonts/Gotham-Font/GothamBold.ttf'})

function Item({item, first}:{item:Deal, first:boolean}) {
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
    <div className="flex flex-col justify-around items-center">
      <div className={
        "text-[#1C75BC] text-3xl "
        +gothamBold.className
      }>
        {item.speed}
      </div>
      <div>Mbps</div>
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

export default async function Results({searchParams:{
  usage
}}: {searchParams:{usage:number}}) {
  const deals = await filteredDeals(
    '',{pounds:BigInt(0),pence:BigInt(0)},[],usage)

  return <QuizTemplate>
    {'error' in deals
    ? 'An error occurred fetching the offers'
    : deals.map((deal, id) => <Item key={id} item={deal} first={id === 0}/>)}
  </QuizTemplate>
}
