'use client'
import { useEffect, useState } from "react"
import Image from "next/image"

import useDerivedState from '../useDerivedState'

import fullPerson from '../../public/images/Figure_fill.png'
import emptyPerson from '../../public/images/Figure_blank.png'
import info from '../../public/images/info.png'

interface UsageCalculatorProps {
    usage: number
    setUsage: (mbps: number) => void
}

function PeopleSelector({people, setPeople}:{
    people: number, setPeople:(p:number)=>void
}) {
    return <div className="flex my-2 items-center max-w-[240px] justify-between">
    <div className="flex justify-start">
    {[...Array(5)].map((_,i)=>(
        <button key={i}
                onClick={()=>{
                    if (i === 0 && people === 1) {
                        setPeople(0)
                    } else {
                        setPeople(i+1)
                    }
                }} >
            <Image height={70}
                   alt="Selected person icon"
                   src={i+1 <= people ? fullPerson : emptyPerson}/>
        </button>
    ))}
    </div>
    <p>{people}{people > 4 ? '+ ':' '}{people === 1 ? 'person' : 'people'}</p>
    </div>
}

const coefficients = {
    streaming: 4.5,
    social: 2,
    work: 5,
    gaming: 6
}

const UsageCalculator = (props: UsageCalculatorProps) => {

    const [total, setTotal] = useState(0)
    const [people, setPeople] = useState<Record<string,number>>({
        streaming: 0,
        social: 0,
        work: 0,
        gaming: 0
    })
    const [streaming, setStreaming] = useDerivedState(
        [people, setPeople], ['streaming'])
    const [social, setSocial] = useDerivedState(
        [people, setPeople], ['social'])
    const [work, setWork] = useDerivedState(
        [people, setPeople], ['work'])
    const [gaming, setGaming] = useDerivedState(
        [people, setPeople], ['gaming'])

    function setTotalConstrained(n:number) {
        const max = Math.max(streaming, social, work, gaming)
        setTotal(Math.max(n,max))
    }

    function calculateUsage(
        people: Record<string,number>, total:number
    ) {
        const orderedCoeffs = Object.entries(coefficients)
        orderedCoeffs.sort(([_,a],[__,b]) => b-a)
        let usage = 0
        let remaining = total
        for (const [key,coeff] of orderedCoeffs) {
            const num = Math.min(remaining,people[key])
            usage += num * coeff
            remaining -= num
        }
        return usage * 0.75
    }

    useEffect(() => {
        props.setUsage(calculateUsage(people, total))
    }, [people, total])

    function setAndSyncTotal(f: (n:number) => void) {
        return (n:number) => {
            if (n > total) {
                setTotal(n)
            }
            f(n)
        }
    }

    return (
        <div className="w-fit mt-3">
            <div className="flex flex-row items-center">
                <div className="text-[#1C75BC] text-lg leading-5 font-bold flex-grow">
                    How many people live in this household?
                </div>
                <div className="w-8 ms-2 flex-none">
                    <Image src={info} alt="info"/>
                </div>
            </div>
            <PeopleSelector people={total} setPeople={setTotalConstrained}/>
            <div className="flex flex-row items-center mb-2">
                <div className="text-[#1C75BC] text-lg leading-5 font-bold flex-grow">
                    And what do they use the internet for?
                </div>
                <div className="w-8 ms-2 flex-none">
                <Image src={info} alt="info"/>
                </div>
            </div>
            <p>Streaming Music / Movies</p>
            <PeopleSelector people={streaming} setPeople={setAndSyncTotal(setStreaming)}/>
            <p>Social Media / Browsing</p>
            <PeopleSelector people={social} setPeople={setAndSyncTotal(setSocial)}/>
            <p>Work / Schoolwork</p>
            <PeopleSelector people={work} setPeople={setAndSyncTotal(setWork)}/>
            <p>Gaming</p>
            <PeopleSelector people={gaming} setPeople={setAndSyncTotal(setGaming)}/>

            <div className="w-full mt-3 border-b border-[#1C75BC]"/>
            <div className="text-center mt-2">
                <div className="font-extrabold text-[#1C75BC] text-xl">
                    Your peak usage:
                </div>
                <div className="flex items-center justify-center mt-2">
                    <span className="font-extrabold text-[#1C75BC] text-5xl">
                        {props.usage}
                    </span>
                    <div className="w-3" />
                    <span className="font-bold">Megabytes <p>/ second</p></span>
                </div>
            </div>
        </div>
    )

}

export default UsageCalculator
