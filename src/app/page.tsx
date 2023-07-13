import Image from 'next/image'

import { OfcomTestTable } from '../ServerComponents/OfcomTestTable'
import { CTMProvidersList } from '@/ServerComponents/CTMProvidersList'
import PostcodeInput from '@/ClientComponents/PostcodeInput'
import { useParams } from 'next/navigation'
import Deals from '../ServerComponents/Deals'
import GetOnLogo from '../../public/Get On-02.png'

export default function Home({searchParams}:{searchParams:{postCode?:string}}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white text-black p-2">
      <div className="text-[#28D]">
        <p>Get what you&apos;re entitled to</p>
        <p>Get connected</p>
        <p>Get on with things...</p>
      </div>
      <Image className="m-2" alt="GetOn logo" src={GetOnLogo}/>
      <div className="text-sm">
        <p>
          GetOn is here to help you find the perfect broadband
          package for your needs.
        </p>
        <p>
          We are unaffiliated with any provider and are the only
          resource that includes social tariffs alongside
          commercial offers.
        </p>
        <p>
          At any point, click the ℹ for more information.
        </p>
      </div>
      <div className="flex flex-col justify-center flex-grow">
        <div>
          <a href="/location"
             className="text-lg text-blue-800 underline hover:text-blue-400">
            Get started
          </a>
        </div>
      </div>
    </main>
  )
}
