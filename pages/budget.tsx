import * as React from "react";

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
    onToggle: React.MouseEventHandler<HTMLElement>
}

const Toggle = ( props: ToggleProps ) => {
    return (
        <div className="toggle-list-item">
            <span className="toggle-label left-align">{props.title}</span>
            <div className="toggle-container">
                <span>Yes</span>
                <label className="toggle" onClick={props.onToggle}>
                    <input type="checkbox"></input>
                    <span className="toggle-handle"></span>
                </label>
                <span>No</span>
            </div>
        </div>
    );
};

const handleToggle = ( value: benefit ) => {
    // add each of the ON benefits to a list in state
}

export default function Budget() {
    return (
        <div>
            <div className="blurb">We just need a few details to find you the best tariff for your needs...</div>
            <div>
                <h2>Your Budget</h2>
                <div className="info-button"></div>
                <input type="radio" id="radio5pcm" name="yourBudget" value="5pcm"></input>
                <label htmlFor="radio5pcm">£5/month</label>
                <input type="radio" id="radio10pcm" name="yourBudget" value="10pcm"></input>
                <label htmlFor="radio10pcm">£10/month</label>
                <input type="radio" id="radio20pcm" name="yourBudget" value="20pcm"></input>
                <label htmlFor="radio20pcm">£20/month or more</label>
            </div>
            <div>
                <h2>Do you receive any of these benefits?</h2>
                <div className="info-button"></div>
                <Toggle title={"Universal Credit (UC)"} onToggle={()=> handleToggle(benefit.UC)} />
                <Toggle title={"Jobseeker's Allowance (JSA)"} onToggle={()=> handleToggle(benefit.JSA)} />
                <Toggle title={"Employment and Support Allowance (ESA)"} onToggle={()=> handleToggle(benefit.ESA)} />
                <Toggle title={"Pension Credit"} onToggle={()=> handleToggle(benefit.Pension)} />
                <Toggle title={"Personal Independence Payment (PIP)"} onToggle={()=> handleToggle(benefit.PIP)} />
                <Toggle title={"Income Support"} onToggle={()=> handleToggle(benefit.IncomeSupport)} />
            </div>
            <div className="next-step-button"></div>
        </div>
    );
};
