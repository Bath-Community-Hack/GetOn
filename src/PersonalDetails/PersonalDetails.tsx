'use client'
import { useState } from "react"

const PersonalDetails = () => {
    const [postcode, setPostcode] = useState("")
    const handlePostcode = (event) => {
        setPostcode(event.target.value)
    }

    return (
        <div>
            <input type="text" id="postcode" value={postcode} placeholder="Enter your postcode"  onChange={event => handlePostcode(event)} className="text-black rounded"/>
        </div>
    )
}

export default PersonalDetails