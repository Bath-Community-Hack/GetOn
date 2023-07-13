import Image from 'next/image'
import { ReactElement, ReactNode } from 'react'
import GetOnLogo from '../../public/Get On-02.png'

export default function QuizTemplate(
  {children}:{children:ReactNode}
) {
  return (
    <main className="flex text-sm min-h-screen flex-col items-center justify-start bg-white text-black p-2">
      <Image className="m-2" alt="GetOn logo" src={GetOnLogo}/>
      We just need a few details to find you the best tariff for
      your needs.
      {children}
    </main>
  )
}
