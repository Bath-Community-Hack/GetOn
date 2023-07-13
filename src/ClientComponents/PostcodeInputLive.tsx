'use client'

import axios from "axios"
import { ChangeEvent, Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import arrow from '../../public/images/arrow.png'
import Image from "next/image"

async function validatePostcode(
  inputRef: RefObject<HTMLInputElement>,
  errorDisplayTimeoutHandle: ReturnType<typeof setTimeout>|undefined,
  setErrorDisplayTimeoutHandle: (h: ReturnType<typeof setTimeout>|undefined) => void,
  setPostcodeValid: (b: boolean) => void,
  setPostcodeError: (e: string) => void,
) {
  const postcode = inputRef.current?.value ?? ''

  const data = await axios.post(
    '/api/validate-postcode',
    {postcode}
  ).then(res => res.data)

  if (postcode === inputRef.current?.value) {
    if (errorDisplayTimeoutHandle) {
      clearTimeout(errorDisplayTimeoutHandle)
      setErrorDisplayTimeoutHandle(undefined)
    }

    if ('error' in data) {
      setPostcodeValid(false)
      setErrorDisplayTimeoutHandle(
        setTimeout(
          ()=>setPostcodeError(data.error), 2000))
    } else {
      setPostcodeValid(true)
      setPostcodeError('')
    }
  }
}

export default forwardRef(function PostcodeInputLive({submit}: {
  submit: RefObject<HTMLInputElement>
}, ref) {

  const [timeoutHandle, setTimeoutHandle] =
    useState<ReturnType<typeof setTimeout>|undefined>(undefined)
  const [errorDisplayTimeoutHandle, setErrorDisplayTimeoutHandle] =
    useState<ReturnType<typeof setTimeout>|undefined>(undefined)

  const [postcodeValid, setPostcodeValid] =
    useState<boolean|undefined>(undefined)
  const [postcodeError, setPostcodeError] =
    useState<string|undefined>(undefined)

  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    postcodeValid:
    () => postcodeValid
     && (inputRef.current?.value.length ?? 0) > 0
  }))

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setPostcodeValid(undefined)
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
      setTimeoutHandle(undefined)
    }
    setTimeoutHandle(setTimeout(() => {
      validatePostcode(
        inputRef,
        errorDisplayTimeoutHandle,
        setErrorDisplayTimeoutHandle,
        setPostcodeValid,
        setPostcodeError
      )
    }, 300))
  }

  /*
  useEffect(() => {validatePostcode(
    inputRef,
    errorDisplayTimeoutHandle,
    setErrorDisplayTimeoutHandle,
    setPostcodeValid,
    setPostcodeError
  )}, [])
  */

  return <>
    <div className={
      "flex flex-row"
      +" mt-2 rounded-3xl text-center shadow-inner border"
      +" w-full shadow-[inset_2px_2px_3px_#888]"
      +(postcodeValid === false ? " outline outline-red-500"
      : (postcodeValid === true ? " outline outline-green-500"
      : " focus-within:outline focus-within:outline-blue-500"))
    }>
      <div className="flex-grow flex flex-row items-center ms-2 my-1">
        <span className="block w-full"><input ref={inputRef}
          name="postcode"
          className="outline-none w-full"
          type="text"
          {...{onChange}}
        /></span>
      </div>
      <button className="flex-none w-8"
              onClick={()=>{
                submit.current?.click()
              }
              }>
        <Image src={arrow} alt="right arrow" />
      </button>
    </div>
    <div className="text-center mt-1">{postcodeError}</div>
  </>
})
