import { Benefit, OfcomRegion } from '@/synthesis/all-deals-types'
import { getAllDeals } from '../synthesis/all-deals'

export default async function filteredDeals(
  regions?: OfcomRegion[],
  budget?: number,
  benefits?: Benefit[],
  usage?: number
) {
  const deals = await getAllDeals()

  if ('error' in deals) {
    return deals
  }

  return deals.filter(deal =>{
    console.log(deal.name)
    console.log(benefits)
    console.log(deal.benefits)

    if (regions && regions.length > 0 && regions[0].length > 0 &&
      !deal.regions.some(regions.includes.bind(regions))) {
      return false
    }
    if (
      budget &&
      deal.price.pounds*100+deal.price.pence > budget*100
    ) return false
    if (benefits
      && deal.benefits.length > 0
      && !deal.benefits.some(benefits.includes.bind(benefits)))
    {
      return false
    }
    if (usage && deal.speed < usage) return false

    return true
  })
}
