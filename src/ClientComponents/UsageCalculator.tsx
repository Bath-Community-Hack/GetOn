'use client'
import { useState } from "react"
import Image from "next/image"

import fullPerson from '../../public/Get On-04.png'
import emptyPerson from '../../public/Get On-05.png'

interface UsageCalculatorProps {
    setUsage: Function
}

function PeopleSelector({people, setPeople}:{
    people: number, setPeople:(p:number)=>void
}) {
    return <div className="flex items-center max-w-[240px] justify-between">
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

const UsageCalculator = (props: UsageCalculatorProps) => {
    const [total, setTotal] = useState(0)
    const [streaming, setStreaming] = useState(0)
    const [social, setSocial] = useState(0)
    const [work, setWork] = useState(0)
    const [gaming, setGaming] = useState(0)

    function setTotalConstrained(n:number) {
        const max = Math.max(streaming, social, work, gaming)
        setTotal(Math.max(n,max))
    }

    function setAndSyncTotal(f: (n:number) => void) {
        return (n:number) => {
            if (n > total) {
                setTotal(n)
            }
            f(n)
            // FIXME update usage
        }
    }

    return (
        <div className="w-fit">
            <div className="text-[#28D] text-lg font-bold">
                Who Will Use The Internet?
            </div>
            <p>Total number of people</p>
            <PeopleSelector people={total} setPeople={setTotalConstrained}/>
            <p>Streaming Music / Movies</p>
            <PeopleSelector people={streaming} setPeople={setAndSyncTotal(setStreaming)}/>
            <p>Social Media / Browsing</p>
            <PeopleSelector people={social} setPeople={setAndSyncTotal(setSocial)}/>
            <p>Work / Schoolwork</p>
            <PeopleSelector people={work} setPeople={setAndSyncTotal(setWork)}/>
            <p>Gaming</p>
            <PeopleSelector people={gaming} setPeople={setAndSyncTotal(setGaming)}/>
        </div>
    )

}

export default UsageCalculator
