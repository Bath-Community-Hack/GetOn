'use client'
import { useState } from "react"
import React from "react"

const PersonalDetails = (): JSX.Element => {
    const [postcode, setPostcode] = useState<string>("")
    const handlePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostcode(event.target.value)
        console.log(postcode)
    }

    return (
        <div>
            <input className="text-black rounded" type="text" id="postcode" value={postcode} placeholder="Enter your postcode"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePostcode(event)}/>
        </div>
    )
}

export default PersonalDetails