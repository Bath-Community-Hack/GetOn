'use client'

import axios from "axios"
import { ChangeEvent, Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

async function validatePostcode(
  inputRef: RefObject<HTMLInputElement>,
  errorDisplayTimeoutHandle: ReturnType<typeof setTimeout>|undefined,
  setErrorDisplayTimeoutHandle: (h: ReturnType<typeof setTimeout>|undefined) => void,
  setPostcodeValid: (b: boolean) => void,
  setPostcodeError: (e: string) => void
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

export default forwardRef(function PostcodeInputLive({}, ref) {
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

  useEffect(() => {validatePostcode(
    inputRef,
    errorDisplayTimeoutHandle,
    setErrorDisplayTimeoutHandle,
    setPostcodeValid,
    setPostcodeError
  )}, [])

  return <>
    <input ref={inputRef}
      name="postcode"
      className={
        "px-2 py-2 mt-2 rounded-3xl text-center shadow-inner border"
        +" w-full shadow-[inset_2px_2px_3px_#888]"
        +(postcodeValid === false ? " border-red-400 border-2" : "")
      }
      type="text"
      {...{onChange}}
    />
    <div className="text-center mt-1">{postcodeError}</div>
  </>
})
