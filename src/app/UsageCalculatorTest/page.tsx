'use client'
import UsageCalculator from "../../ClientComponents/UsageCalculator";
import { useState } from "react";

export default function UsageCalculatorTest() {

    const [usage, setUsage] = useState(0)

    return (
            <UsageCalculator setUsage={setUsage} />
        )
}