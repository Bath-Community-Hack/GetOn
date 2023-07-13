import Image from 'next/image'
import { ReactElement, ReactNode } from 'react'
import GetOnLogo from '../../public/images/NEWEST_GetOn_logo_Bath_v2.png'

import localFont from 'next/font/local'

const gotham = localFont({src: '../../public/fonts/Gotham-Font/GothamMedium.ttf'})

export default function QuizTemplate(
  {children}:{children:ReactNode}
) {
  return (
    <main className={ gotham.className + " flex text-sm min-h-screen flex-col items-center justify-start bg-white p-3" }>
      <Image className="m-2 w-8/12 max-w-[250px]" alt="GetOn logo" src={GetOnLogo}/>
      {children}
    </main>
  )
}
