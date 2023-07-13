import Image from 'next/image'
import results from '../../../public/images/results.png'

export default function Results() {
  return <main className="flex min-h-screen flex-col items-center justify-start">
    <Image className="max-w-[400px] w-full" src={results} alt="yes, the whole page is a screenshot. woops" />
  </main>
}
