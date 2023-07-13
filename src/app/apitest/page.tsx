import Image from 'next/image'

import { OfcomTestTable } from '@/ServerComponents/OfcomTestTable'
import { CTMProvidersList } from '@/ServerComponents/CTMProvidersList'
import PostcodeInput from '@/ClientComponents/PostcodeInput'
import { useParams } from 'next/navigation'
import Deals from '@/ServerComponents/Deals'

export default function ApiTest({searchParams}:{searchParams:{postCode?:string}}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 min-w-[600px]">
      <h1 className="text-4xl mb-3">GetOn</h1>
      <PostcodeInput pagePostcode={searchParams.postCode ?? ''}/>
      {/*<OfcomTestTable/>*/}
      <div className="mb-3" />
      <div className="flex flex-row items-start">
      <CTMProvidersList postcode={searchParams.postCode ?? ''}/>
      <Deals postcode={searchParams.postCode ?? ''}/>
      </div>
    </main>
  )
}
