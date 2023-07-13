'use client'
import { useState } from "react"

interface usageCalculorProps {
    setUsage: Function
}

const UsageCalculor = (props: usageCalculorProps) => {

    const [numberOfUsersStreaming, setNumberOfUsersStreaming] = useState([false, false, false, false, false])
    console.log(numberOfUsersStreaming)

    // TODO: need to change this so that when the user click on one icon, it updates the whole array accordingly(e.g if I click to select the 3rd guy, array elements 0, 1 and 2 should be set to true, array elements 4 and 5 should be set to false)
    const handleStreamingUsers = (index) => {
        let updatedNumberOfUsersStreaming = [...numberOfUsersStreaming]
        updatedNumberOfUsersStreaming[index] = numberOfUsersStreaming[index]? false: true 
        setNumberOfUsersStreaming(updatedNumberOfUsersStreaming)
        console.log(updatedNumberOfUsersStreaming)
    }

    return (
        <div>
            <img src="/images/Get On-02.png" alt="Get On logo" />
            <h1>Who Will Use The Internet?</h1>
            <h2>Streaming Music / Movies</h2>
            {numberOfUsersStreaming.map((element, index) => (
            element?
            <button onClick={event=>handleStreamingUsers(index)} id={"streamingUser" + (index + 1)}>
                 <img src="/images/Get On-04.png"/></button> 
            : <button onClick={event=>handleStreamingUsers(index)} id={"streamingUser" + (index + 1)}><img src="/images/Get On-05.png" /> </button>
        ))}
             
            <h2>Social Media / Browsing</h2>
            <h2>Work / Schoolwork</h2>
            <h2>Gaming</h2>
        </div>
    )

}

export default UsageCalculor