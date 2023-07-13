import * as React from "react";
import { useState } from "react";

enum benefit {
    Other = 0,
    UC,
    JSA,
    ESA,
    Pension,
    PIP,
    IncomeSupport
}

type ToggleProps = {
    title: string;
    id: benefit
}

const Toggle = ( props: ToggleProps ) => {
    return (
        <div className="toggle-list-item">
            <span className="toggle-label left-align">{props.title}</span>
            <div className="toggle-container">
                <span>Yes</span>
                <label className="toggle">
                    <input type="checkbox" name="yourBenefits" value={props.id.toString()}></input>
                    <span className="toggle-handle"></span>
                </label>
                <span>No</span>
            </div>
        </div>
    );
};


export default function Budget() {
    const [setBudget] = useState("")
    const [setBenefits] = useState(Array<benefit>)

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        console.log(data)
      }

    return (
        <form {...{onSubmit}}>
            <div className="blurb">We just need a few details to find you the best tariff for your needs...</div>
            <div>
                <p>Your Budget:</p>
                <div className="info-button"></div>
                <input type="radio" id="radio5pcm" name="yourBudget" value="5pcm"></input>
                <label htmlFor="radio5pcm">£5/month</label>
                <input type="radio" id="radio10pcm" name="yourBudget" value="10pcm"></input>
                <label htmlFor="radio10pcm">£10/month</label>
                <input type="radio" id="radio20pcm" name="yourBudget" value="20pcm"></input>
                <label htmlFor="radio20pcm">£20/month or more</label>
            </div>
            <div>
                <p>If you receive benefits you may be elgible for a Social Tariff. If you would be interested in seeing these options please tell us if you receive any of these benefits:</p>
                <div className="info-button"></div>
                <Toggle title={"Universal Credit (UC)"} id={benefit.UC} />
                <Toggle title={"Jobseeker's Allowance (JSA)"} id={benefit.JSA} />
                <Toggle title={"Employment and Support Allowance (ESA)"} id={benefit.ESA} />
                <Toggle title={"Pension Credit"} id={benefit.Pension} />
                <Toggle title={"Personal Independence Payment (PIP)"} id={benefit.PIP} />
                <Toggle title={"Income Support"} id={benefit.IncomeSupport} />
            </div>
            <div className="next-step-button">
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
};
