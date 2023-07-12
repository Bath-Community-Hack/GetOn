import { getCTMSuppliers } from '../3rd-party-api-calls/ctm'
import { ofcomSocialTariffs } from '../3rd-party-api-calls/ofcom'
import { getAllDeals } from '../synthesis/all-deals'
import { getSocialTariffsFromProviders } from '../synthesis/social-tariffs'

export default async function Deals(
  {postcode}:{postcode?:string}
) {
  const deals = await getAllDeals(postcode)

  if (!Array.isArray(deals)) {
    return <>{deals.error}</>
  }

  return <div className="flex flex-col border-l ml-2 pl-2">
    <div className="border-b mb-2">Deals</div>
    {deals.map(
      ({name, href})=><div key={name}>
        <a className="hover:text-blue-400" {...{href}}>{name}</a>
      </div>
    )}
  </div>
}
