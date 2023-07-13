'use client'

import PostcodeInputLive from "@/ClientComponents/PostcodeInputLive"
import QuizTemplate from "@/ServerComponents/QuizTemplate"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"

export default function Location() {
  const router = useRouter()

  const postcodeRef =
    useRef<{postcodeValid:()=>boolean|undefined}>()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (postcodeRef.current?.postcodeValid()) {
      const data = new FormData(e.target as HTMLFormElement)
      router.push(
        '/budget?postCode='+data.get('postcode')
      )
    }
  }

  return <QuizTemplate>
      <div className="w-full flex-grow flex flex-col justify-center items-center">
        <form {...{onSubmit}} className="flex flex-col items-center">
          <div>
            <div className="flex justify-between">
              <div className="text-[#25A]">
                What is your postcode?
              </div>
              <div>ℹ</div>
            </div>
          <div>
            <PostcodeInputLive ref={postcodeRef} />
          </div>
        </div>
        <div className="h-16"/>
        <div>
          <input type="submit" className="text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer"
            value="Step 2 of 4"
          />
        </div>
        </form>
      </div>
  </QuizTemplate>
}
