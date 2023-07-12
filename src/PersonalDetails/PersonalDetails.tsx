'use client'
import { useState } from "react"
import React from "react"

interface PersonalDetailsProps {
    postcode: string
	setPostcode: Function
	 
}


const PersonalDetails = (props: PersonalDetailsProps): JSX.Element => {
    const handlePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setPostcode(event.target.value)
        console.log(props.postcode)
    }

    return (
        <div>
            <input className="rounded" type="text" id="postcode" value={props.postcode} placeholder="Enter your postcode"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePostcode(event)}/>
        </div>
    )
}

export default PersonalDetails