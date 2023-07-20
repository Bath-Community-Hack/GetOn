import Image from 'next/image'

import { OfcomTestTable } from '../ServerComponents/OfcomTestTable'
import { CTMProvidersList } from '@/ServerComponents/CTMProvidersList'
import PostcodeInput from '@/ClientComponents/PostcodeInput'
import { useParams } from 'next/navigation'
import Deals from '../ServerComponents/Deals'
import GetOnLogo from '../../public/images/NEWEST_GetOn_logo_Bath_v2.png'
import Tech4Good from '../../public/images/techforgood-SW-white.png'
import i from '../../public/images/info.png'
import GetStarted from '../../public/images/get_started.png'

import localFont from 'next/font/local'

const gotham = localFont({src: '../../public/fonts/Gotham-Font/GothamMedium.ttf'})

export default function Home({searchParams}:{searchParams:{postCode?:string}}) {
  return (
    <main className={
      gotham.className
      + " flex min-h-screen flex-col items-center justify-center bg-white p-3"
    }>
      <div className="text-[#1C75BC] font-bold">
        <p>Get what you&apos;re entitled to</p>
        <p>Get connected</p>
        <p>Get on with things...</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center p-2">
        <Image className="w-full max-w-sm" alt="GetOn logo" src={GetOnLogo}/>
        <span className="mx-3 w-fit text-sm font-bold whitespace-nowrap">powered by</span>
        <a href="https://techforgoodsw.org.uk/">
        <Image className="w-10/12 my-2 max-w-sm"
               alt="Tech4Good South West logo"
               src={Tech4Good} />
        </a>
      </div>
      <div className="text-sm">
        <p className="mb-2">
          If you receive any of the following benefits, you may
          be eligible for a discounted broadband package known
          as a social tariff:
        </p>
        <p>
          <ul className="list-disc ps-4">
            <li>Universal credit</li>
            <li>Jobseekers allowance</li>
            <li>Employment and support allowance</li>
            <li>Pension credit</li>
            <li>Income support</li>
            <li>Personal Independence Payments</li>
            <li>Disability benefit</li>
          </ul>
        </p>
        <p className="mt-2">
          The{" "}
          <a className="text-blue-800 hover:text-blue-400 underline"
                 href="https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/costs-and-billing/social-tariffs">
          Ofcom website
          </a>{" "}
          has a long list of the social tariffs on offer from
          different internet service providers (ISPs).
        </p>
        <p className="mt-2">
          GetOn is here to help you find the offers available to you, which fit your requirements.
        </p>
        <p className="mt-2">
          At any point, click the {" "}
          <Image className="inline h-6 w-6" alt="info" src={i}/>
          {" "} for more information.
        </p>
      </div>
      <a href="/location"
         className="mt-2 text-lg text-blue-800 underline hover:text-blue-400 w-7/12 max-w-[250px]">
        <Image alt="Get Started" src={GetStarted}/>
      </a>
    </main>
  )
}
