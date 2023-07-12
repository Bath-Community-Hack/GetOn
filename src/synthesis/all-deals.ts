import { getCTMDeals, getCTMSuppliers, getCTMSuppliersFromDeals } from '../3rd-party-api-calls/ctm'
import { getSocialTariffsFromProviders } from '../synthesis/social-tariffs'

export type Deal = {
  name: string,
  href: string,
  price: string,
  speed: string,
  available: string
}

export async function getAllDeals(postcode: string = '')
: Promise<Deal[]|{error:string}> {
  const ctmDeals = await getCTMDeals(postcode)

  if (!Array.isArray(ctmDeals)) {
    return ctmDeals
  }

  const suppliers = getCTMSuppliersFromDeals(ctmDeals)

  const socialTariffs = await getSocialTariffsFromProviders(suppliers)

  const ctmDealsCommonFormat = ctmDeals.map(deal => ({
    name: deal.supplier.name + " " + deal.name,
    href: deal.url,
    price: '£' + (deal.monthly_price/100).toFixed() + '.' + ((deal.monthly_price*100) % 100).toFixed(),
    speed: deal.download_speed,
    available: 'yes'
  }))

  return [...socialTariffs, ...ctmDealsCommonFormat]
}
