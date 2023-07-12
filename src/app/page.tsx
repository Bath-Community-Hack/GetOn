"use client"
import PersonalDetails from '@/PersonalDetails/PersonalDetails'
import {getDataByPostcode} from './ServerComponents/GoCompareFetch'
import { useState } from 'react'
import './globals.css'

export default function Home() {

  const [postcode, setPostcode] = useState<string>("")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      GetOn
      <PersonalDetails postcode={postcode} setPostcode={setPostcode}/> 
      <button onClick={() => {getDataByPostcode(postcode)}}>Search</button>
    </main>
  )
}
