'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, FormHTMLAttributes, useState } from 'react'

export default function PostcodeInput({pagePostcode}:{
  pagePostcode: string
}) {
  const router = useRouter()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    router.push("/?postCode="+data.get('postcode'))
  }

  return <form {...{onSubmit}}>
    <input type="text"
           name="postcode"
           placeholder="Type postcode"
           className="rounded text-black px-2 py-1 border"
           defaultValue={pagePostcode} />
  </form>
}
