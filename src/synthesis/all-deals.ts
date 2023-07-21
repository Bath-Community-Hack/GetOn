import { getManuallyScrapedSocialTariffsData, ofcomSocialTariffs } from '@/3rd-party-api-calls/ofcom'
import { getCTMDeals, getCTMSuppliers, getCTMSuppliersFromDeals } from '../3rd-party-api-calls/ctm'
import { getSocialTariffsFromProviders } from '../synthesis/social-tariffs'
import { Benefit, Deal, OfcomRegion } from './all-deals-types'

export const onsOfcomRegionCodes: Record<OfcomRegion,string> = {
  'UK': 'K02000001', // don't think this shows up on within
  'England': 'E92000001',
  'Wales': 'W92000004',
  'Scotland': 'S92000003',
  'London': 'E12000007',
  'Cambridgeshire': 'E10000003',
  'Essex': 'E10000012',
  'Nottinghamshire': 'E10000024',
  'Yorkshire': 'E10000023',
  'Derbyshire': 'E10000007',
  'Newport': 'W06000022',
  'South East England': 'E12000008',
  'Hull': 'E06000010',
  'East Sussex': 'E10000011',
  'Kent': 'E10000016',
  'Lothian': 'S17000012',
  'South Gloucestershire': 'E06000025',
  'South West': 'E12000009',
  'Cornwall': 'E06000052',
  'Devon': 'E10000008',
  'Isle of Wight': 'E06000046',
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
