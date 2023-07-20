import axios from 'axios'
import { parse } from 'node-html-parser'
import { parse as csvParse } from 'csv-parse/sync'
import { readFile, readFileSync } from 'fs'
import { OfcomSocialTariff, OfcomSocialTariffOfcomPageData } from './ofcom-types'

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

export function getManuallyScrapedSocialTariffsData(): any[] {
  return csvParse(readFileSync('assets/list_of_providers_and_social_tariff_selection.csv'))
}

function parsePrice(s: string): {
  pounds: bigint,
  pence: bigint
} {
  const poundIndex = s.indexOf('£')

  if (poundIndex === -1) throw new Error('Not a valid price')

  const numberString = s.slice(poundIndex+1)

  const dotIndex = numberString.indexOf('.')

  if (dotIndex === -1) {
    return {
      pounds: BigInt(parseInt(numberString)),
      pence: BigInt(0)
    }
  } else {
    const poundsString = numberString.slice(0,dotIndex)
    const penceString = numberString.slice(dotIndex+1)
    return {
      pounds: BigInt(parseInt(poundsString)),
      pence: BigInt(parseInt(penceString))
    }
  }
}

export async function ofcomSocialTariffs()
: Promise<OfcomSocialTariff[] | undefined>
{
  const page = parse(
    await axios.get('https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/costs-and-billing/social-tariffs')
               .then(res => res.data))

  const domrows =
    page.querySelector('.lookup-table__table')
       ?.querySelectorAll('tbody tr')

  if (!domrows) { return }

  return domrows.map(domrow => {
    const tds = domrow.querySelectorAll('td')

    const a = tds[0].querySelector('a')
    const href = a?.attributes['href'] as string
    const name = a?.childNodes[0].innerText as string
    const price = parsePrice(tds[1].innerText)
    //const speed = tds[2].innerText
    //const available = tds[3].innerText

    return appendManuallyScrapedData({ name, href, price })
  })
}
