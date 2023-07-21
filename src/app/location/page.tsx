'use client'

import PostcodeInputLive from "@/ClientComponents/PostcodeInputLive"
import QuizTemplate from "@/ServerComponents/QuizTemplate"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import i from '../../../public/images/info.png'
import Image from "next/image"
import Step1of3 from '../../../public/images/step_1of3.png'

export default function Location() {
  const router = useRouter()

  const postcodeRef =
    useRef<{postcodeValid:()=>boolean|undefined}>()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (postcodeRef.current?.postcodeValid()) {
      const data = new FormData(e.target as HTMLFormElement)
      // FIXME get regions from api and add those instead
      router.push(
        '/budget?postCode='+data.get('postcode')
      )
    }
  }

  const submitRef = useRef<HTMLInputElement>(null)

  console.log(submitRef)

  return <QuizTemplate>
      In just three quick steps we can find you the best broadband
      connection plan to meet your needs.
      <div className="w-full flex-grow flex flex-col items-center gap-4">
        <Image className="mt-4 w-7/12 max-w-[220px]" src={Step1of3} alt="Step 1 of 3" />
        <form {...{onSubmit}} className="flex flex-col items-center">
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[#1C75BC] font-semibold p-2">
                What is the postcode of where you&apos;d like
                connection?
              </div>
              <div className="flex-none ms-2 w-8">
                <Image src={i} alt="info" />
              </div>
            </div>
          <div className="px-2">
            <PostcodeInputLive ref={postcodeRef} submit={submitRef} />
          </div>
        </div>
        <div className="h-16"/>
        <div>
          <input ref={submitRef} hidden type="submit" className="text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer"
          />
        </div>
        </form>
      </div>
  </QuizTemplate>
}
