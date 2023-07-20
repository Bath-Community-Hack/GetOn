import { Benefit, OfcomRegion, getAllDeals } from '../synthesis/all-deals'

export default async function filteredDeals(
  regions: OfcomRegion[],
  budget: { pounds: bigint, pence: bigint },
  benefits: Benefit[],
  speed: number
) {
  const deals = await getAllDeals()

  if ('error' in deals) {
    return deals
  }

  return deals.filter(deal =>{
    // FIXME country
    // FIXME benefits
    if (deal.speed < speed) return false

    return true
  })
}
