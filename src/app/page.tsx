import Image from 'next/image'

import { OfcomTestTable } from '../ServerComponents/OfcomTestTable'
import { CTMProvidersList } from '@/ServerComponents/CTMProvidersList'
import PostcodeInput from '@/ClientComponents/PostcodeInput'
import { useParams } from 'next/navigation'

export default function Home({searchParams}:{searchParams:{postCode?:string}}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl mb-3">GetOn</h1>
      <PostcodeInput pagePostcode={searchParams.postCode ?? ''}/>
      {/*<OfcomTestTable/>*/}
      <div className="mb-3" />
      <CTMProvidersList postcode={searchParams.postCode ?? ''}/>
    </main>
  )
}
