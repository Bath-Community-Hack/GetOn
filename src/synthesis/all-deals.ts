import { getManuallyScrapedSocialTariffsData, ofcomSocialTariffs } from '@/3rd-party-api-calls/ofcom'
import { getCTMDeals, getCTMSuppliers, getCTMSuppliersFromDeals } from '../3rd-party-api-calls/ctm'
import { getSocialTariffsFromProviders } from '../synthesis/social-tariffs'
import { Benefit, Deal, OfcomRegion } from './all-deals-types'

export const onsOfcomRegionCodes: Record<string,OfcomRegion> = {
  'K02000001': 'UK', // don't think this shows up on within
  'E92000001': 'England',
  'W92000004': 'Wales',
  'S92000003': 'Scotland',
  'E12000007': 'London',
  'E10000003': 'Cambridgeshire',
  'E10000012': 'Essex',
  'E10000024': 'Nottinghamshire',
  'E10000023': 'Yorkshire',
  'E10000007': 'Derbyshire',
  'W06000022': 'Newport',
  'E12000008': 'South East England',
  'E06000010': 'Hull',
  'E10000011': 'East Sussex',
  'E10000016': 'Kent',
  'S08000024': 'Lothian',
  'E06000025': 'South Gloucestershire',
  'E12000009': 'South West',
  'E06000052': 'Cornwall',
  'E10000008': 'Devon',
  'E06000046': 'Isle of Wight',
}

let benefitOrder: Benefit[] | null = null

export async function getBenefitOrder() {
  if (!benefitOrder) {
    benefitOrder =
      (await getManuallyScrapedSocialTariffsData())[1]
        .slice(4) as Benefit[]
  }
  return benefitOrder
}

export async function getTopLevelBenefits() {
  return (await getBenefitOrder()).filter(
    benefit =>
    !['No restriction', 'Generic benefits'].includes(benefit)
      && !benefit.match(/\(.+\)/))
}

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
