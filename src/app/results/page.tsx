import Image from 'next/image'
import results from '../../../public/images/results.png'

import localFont from 'next/font/local'

const gotham = localFont({src: '../../../public/fonts/Gotham-Font/GothamMedium.ttf'})

export default function Results() {
  return <main className={gotham.className + " flex min-h-screen flex-col items-center justify-start" }>
    <Image className="max-w-[400px] w-full" src={results} alt="yes, the whole page is a screenshot. woops" />
    <div className="text-center mt-3 max-w-[400px]">
    <a className="text-[#1C75BC] hover:text-blue-400"
       href="/apitest">
      (We ran out of time... Click this link for a demo of the package search functionality)
    </a>
    </div>
  </main>
}
