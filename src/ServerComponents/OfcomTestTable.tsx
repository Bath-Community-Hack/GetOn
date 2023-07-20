import { ofcomSocialTariffs } from '../3rd-party-api-calls/ofcom'

export async function OfcomTestTable() {
  const socialTariffs = await ofcomSocialTariffs()

  if (!socialTariffs) {
    return <>Couldn&apos;t find Ofcom&apos;s social tariffs table</>
  }

  return <>{
    socialTariffs.map(({name, price, speed})=>
      <div key={name}>
        {name}
        {" | "}{price.pounds}
        {" | "}{speed}
      </div>)
  }</>
}
