"use client"
import PersonalDetails from '@/PersonalDetails/PersonalDetails'
import {getDataByPostcode} from './ServerComponents/GoCompareFetch'
import './globals.css'



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      GetOn
      <PersonalDetails/> 
      <input type="text" className="rounded" />
      <button onClick={() => {getDataByPostcode('BA2 6AH')}}>Search</button>
    </main>
  )
}
