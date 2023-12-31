'use client'

import axios from "axios"
import { ChangeEvent, Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import arrow from '../../public/images/arrow.png'
import Image from "next/image"
import { useSearchParams } from "next/navigation"

async function validatePostcode(
  inputRef: RefObject<HTMLInputElement>,
  errorDisplayTimeoutHandle: ReturnType<typeof setTimeout>|undefined,
  setErrorDisplayTimeoutHandle: (h: ReturnType<typeof setTimeout>|undefined) => void,
  setPostcodeValid: (b: boolean|undefined) => void,
  setPostcodeError: (e: string) => void,
  setRegions: (regions: string[]) => void
) {
  const postcode = inputRef.current?.value ?? ''

  if (postcode.length === 0) {
    setPostcodeValid(undefined)
    setPostcodeError('')
    return
  }

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
          ()=>{
            if (postcode === inputRef.current?.value) {
              setPostcodeError(data.error)
            }
          }, 2000))
      setRegions([])
    } else {
      setPostcodeValid(true)
      setPostcodeError('')
      setRegions(data.regions)
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

  const [regions, setRegions] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('postcode') && inputRef.current) {
      inputRef.current.value = localStorage.getItem('postcode') as string
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('regions', JSON.stringify(regions))
  }, [regions])

  useImperativeHandle(ref, () => ({
    postcodeValid:
    () => postcodeValid
     && (inputRef.current?.value.length ?? 0) > 0,
    regions: () => regions
  }))

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    localStorage.setItem('postcode', e.target.value)
    setPostcodeValid(undefined)
    setPostcodeError('')
    setRegions([])
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
        setPostcodeError,
        setRegions
      )
    }, 300))
  }

  useEffect(() => {validatePostcode(
    inputRef,
    errorDisplayTimeoutHandle,
    setErrorDisplayTimeoutHandle,
    setPostcodeValid,
    setPostcodeError,
    setRegions
  )}, [])

  return <>
    <div className={
      "flex flex-row p-1"
      +" mt-2 rounded-3xl text-center border"
      +" w-full shadow-[inset_2px_2px_3px_#888]"
      +(postcodeValid === false ? " outline outline-red-500"
      : (postcodeValid === true ? " outline outline-green-500"
      : " focus-within:outline focus-within:outline-blue-500"))
    } onClick={()=>inputRef.current?.focus()}>
      <div className="flex-grow flex flex-row items-center justify-center ms-2 my-1">
        <span className="block w-full"><input ref={inputRef}
          name="postcode"
          className="outline-none w-32 text-center"
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
    {regions.length > 0 &&
     <div className="text-center text-gray-400">
       Regions: {regions.join(', ')}
     </div>}
  </>
})
