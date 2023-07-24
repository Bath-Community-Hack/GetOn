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
import { getBenefitOrder, getTopLevelBenefits } from '@/synthesis/all-deals'

const gotham = localFont({src: '../../public/fonts/Gotham-Font/GothamMedium.ttf'})

export default async function Home({searchParams}:{searchParams:{postCode?:string}}) {
  return (
    <main className={
      "font-semibold flex min-h-screen flex-col items-center justify-center bg-white p-3"
    }>
      <div className="max-w-lg flex-col flex items-center justify-center">
      <div className="text-[#1C75BC] font-bold">
        <p>Get what you&apos;re entitled to</p>
        <p>Get connected</p>
        <p>Get on with things...</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center p-2">
        <span className="flex-1 w-full max-w-sm">
          <Image className="w-full" alt="GetOn logo" src={GetOnLogo}/>
        </span>
        <span className="mx-3 w-fit text-sm font-bold whitespace-nowrap">powered by</span>
        <a className="flex-1 w-10/12 max-w-sm" href="https://techforgoodsw.org.uk/">
          <Image className="w-full my-2"
                 alt="Tech4Good South West logo"
                 src={Tech4Good} />
        </a>
      </div>
      <div className="text-sm">
        <details className="border border-black rounded-lg p-2 text-black">
          <summary className="cursor-pointer px-2 list-item">Limitations</summary>
          <div className="border-t border-black mt-2 p-2 pb-1">
          <p className="mb-2 text-black">
            GetOn is a work in progress - that means that while we
            expect the service to be useful <u>right now</u>, the
            information is currently presented at a fairly coarse
            level of detail. We hope to gradually increase
            the accuracy and helpfulness of the tool as time goes on.
          </p>
          <p className="mb-2 text-black">
            In particular, some of the benefit
            eligibility rules may be finer grained than we&apos;re able
            to display here, or we might have not yet drilled down
            far enough into the terms and conditions.
          </p>
          <p className="mb-2 text-black">
            The postcode search provides a broad filter based on
            region, but coverage is likely to vary within the region.
            In the future we would like to integrate with the
            providers&apos; postcode search as well.
          </p>
          <p className="mb-2 text-black">
            In the meantime please read the linked package
            information carefully, to make sure it matches
            what we&apos;ve said.
          </p>
          <p className="text-black">
            Here is a link to the{" "}
            <a href="https://docs.google.com/spreadsheets/d/1SqHtdJmKnxcvVesLHWeBl_KglYQihnpFzRRXutDy8bU/"
              className="text-blue-800 hover:text-blue-400 underline"
            >
              collated benefit eligibility data
            </a>{" "}
            used by GetOn.
          </p>
          </div>
        </details>
        <details className="border border-black rounded-lg p-2 text-black mt-2">
          <summary className="cursor-pointer px-2">Roadmap</summary>
          <div className="border-t border-black mt-2 p-2 pb-1">
            <ul>
              {[<>
                  <Image className="inline h-6 w-6" alt="info" src={i}/>
                  {" "}tooltips
                </>,
                'Distinguish general and income-based JSA/ESA, and support the different types of Social Services referral',
                'Information about zero-cost connections',
                'Postcode-specific connection speed advice',
                'Integrate with provider postcode search'
              ].map((content,i)=><li key={i}>
                <div className="flex items-start gap-2">
                  <div>☐</div>
                  <div>{content}</div>
                </div>
              </li>)}
            </ul>
          </div>
        </details>
        <p className="my-2">
          If you meet any of the following criteria, you may
          be eligible for a discounted broadband package known
          as a social tariff:
        </p>
        <ul className="list-disc ps-4">
          {(await getTopLevelBenefits()).map(
            (benefit:string)=><li key={benefit}>{benefit}</li>)}
        </ul>
        <p className="mt-2">
          The{" "}
          <a className="text-blue-800 hover:text-blue-400 underline"
                 href="https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/costs-and-billing/social-tariffs">
          Ofcom website
          </a>{" "}
          has a list of the social tariffs on offer from
          different internet service providers (ISPs).
        </p>
        <p className="mt-2">
          GetOn is here to help you navigate these offers. We&apos;ll
          show you only the ones available in your area, and which
          you&apos;re eligible for.
        </p>
        {/* <p className="mt-2">
            At any point, click the {" "}
            <Image className="inline h-6 w-6" alt="info" src={i}/>
            {" "} for more information.
            </p> */}
      </div>
      <a href="/location"
         className="mt-2 text-lg text-blue-800 underline hover:text-blue-400 w-7/12">
        <Image alt="Get Started" src={GetStarted} className="max-w-[250px] w-full"/>
      </a>
      </div>
    </main>
  )
}
