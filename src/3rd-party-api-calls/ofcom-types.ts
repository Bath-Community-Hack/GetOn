import { Deal } from '../synthesis/all-deals-types'

export type OfcomSocialTariff = Deal

export type OfcomSocialTariffOfcomPageData = {
  href: string,
  name: string,
  price: {
    pounds: bigint,
    pence: bigint
  },
  rawRegions: string
}
