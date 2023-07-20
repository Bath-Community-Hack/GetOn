import { manuallyScrapedSocialTariffsData, ofcomSocialTariffs } from '@/3rd-party-api-calls/ofcom'
import { getCTMDeals, getCTMSuppliers, getCTMSuppliersFromDeals } from '../3rd-party-api-calls/ctm'
import { getSocialTariffsFromProviders } from '../synthesis/social-tariffs'
import { Benefit, Deal } from './all-deals-types'

// FIXME if you match anything inside parentheses,
// discard what's outside the parentheses

export const benefitOrder: Benefit[] =
  manuallyScrapedSocialTariffsData[1].slice(4)

export async function getAllDeals(postcode: string = '')
: Promise<Deal[]|{error:string}> {
  /*
  const ctmDeals = await getCTMDeals(postcode)

  if (!Array.isArray(ctmDeals)) {
    return ctmDeals
  }

  const suppliers = getCTMSuppliersFromDeals(ctmDeals)
  */

  //const socialTariffs = await getSocialTariffsFromProviders(suppliers)
  const socialTariffs = await ofcomSocialTariffs()

  /*
  const ctmDealsCommonFormat = ctmDeals.map(deal => ({
    name: deal.supplier.name + " " + deal.name,
    href: deal.url,
    price: '£' + (deal.monthly_price/100).toFixed() + '.' + ((deal.monthly_price*100) % 100).toFixed(),
    speed: deal.download_speed,
    available: 'yes'
  }))
  */

  //return [...(socialTariffs as Deal[]), ...ctmDealsCommonFormat]
  return socialTariffs as Deal[]
}
