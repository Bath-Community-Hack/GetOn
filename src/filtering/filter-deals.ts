import { Benefit, OfcomRegion } from '@/synthesis/all-deals-types'
import { getAllDeals } from '../synthesis/all-deals'

const penaltyPerMbps = 0.25

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

  const filteredAndPenalisedDeals = deals.filter(deal =>{
    /*
    console.log(deal.name)
    console.log(benefits)
    console.log(deal.benefits)
    */

    if (regions && regions.length > 0 && regions[0].length > 0 &&
      !deal.regions.some(region =>
        regions.includes(region) || region === 'UK')) {
      return false
    }
    if (deal.benefits.length > 0
      && !deal.benefits.includes('No restriction' as Benefit)) {
      if (benefits
        && !deal.benefits.some(
          benefit =>
            benefits.includes(benefit)
            || benefit === 'Generic benefits'))
      {
        return false
      }
    }

    return true
  }).map(deal => {
    let valid = true
    let penalty = 0
    if (budget !== undefined) {
      const dealPence = deal.price.pounds*100+deal.price.pence
      const budgetPence = budget*100
      const budgetPenalty = (dealPence - budgetPence)/100
      penalty += budgetPenalty
      valid &&= budgetPenalty <= 0
    }
    if (usage !== undefined && deal.speed !== 'mobile') {
      const usagePenalty = penaltyPerMbps * (usage - deal.speed)
      penalty += usagePenalty
      valid &&= usagePenalty <= 0
    }
    return {...deal, penalty, valid}
  })

  filteredAndPenalisedDeals.sort(({penalty:a},{penalty:b})=>a-b)

  return filteredAndPenalisedDeals
}
