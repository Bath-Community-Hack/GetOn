import { OfcomSocialTariff, OfcomSocialTariffOfcomPageData, getManuallyScrapedSocialTariffsData } from './ofcom'

export const manuallyScrapedSocialTariffsData =
  getManuallyScrapedSocialTariffsData()

export function appendManuallyScrapedData(
  {name, href, price}: OfcomSocialTariffOfcomPageData
): OfcomSocialTariff
{
  const scrapedTariffData = manuallyScrapedSocialTariffsData.find(
    entry => entry[2] === name)

  if (scrapedTariffData === undefined) {
    return {name, href, price, speed: 0, regions: [], benefits: []}
  }

  const speed = Number(scrapedTariffData[3])

  return {name, href, price, speed, regions: [], benefits: []}
}
