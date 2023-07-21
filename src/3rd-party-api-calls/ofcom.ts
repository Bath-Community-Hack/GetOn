import axios from 'axios'
import { parse } from 'node-html-parser'
import { parse as csvParse } from 'csv-parse/sync'
import { readFile, readFileSync } from 'fs'
import https from 'https'
import { OfcomSocialTariff, OfcomSocialTariffOfcomPageData } from './ofcom-types'

let manuallyScrapedSocialTariffsData: null | string[][] = null

import { getBenefitOrder } from '@/synthesis/all-deals'
import { OfcomRegion, ofcomRegions } from '@/synthesis/all-deals-types'
import path from 'path'

function getRegionsFromRawString(rawRegions: string) {
  const inParens = rawRegions.match(/\((.*)\)/)
  const useParens = inParens && inParens[1] !== 'various locations'
  const matchString = useParens ? inParens[1] : rawRegions
  const sortedRegions = ofcomRegions
    .filter(region=>!/^\d+$/.test(region)).sort(
    (a,b)=>b.length-a.length)
  return sortedRegions.reduce(
    (accum, region) => {
      const match = matchString.indexOf(region)
      if (match > -1) {
        if (!accum.mask[match]) {
          const newMask = [...accum.mask]
          for (let i = 0; i < region.length; ++i) {
            newMask[match+i] = true
          }
          return {
            mask: newMask,
            regions: [...accum.regions, region]
          }
        } else {
          return accum
        }
      }
      return accum
    },
    { mask: Array(sortedRegions.length).fill(false),
      regions: [] as OfcomRegion[]}
    ).regions
}

export async function enrich(
  {name, href, price, speed, rawRegions}: OfcomSocialTariffOfcomPageData
): Promise<OfcomSocialTariff>
{
  const scrapedTariffData = (await getManuallyScrapedSocialTariffsData()).find(
    entry => entry[0].startsWith(name))

  if (scrapedTariffData === undefined) {
    return {
      name, href, price:parsePrice(price),
      speed: parseSpeed(speed),
      regions: getRegionsFromRawString(rawRegions), benefits: []
    }
  }

  return {name, href,
          price:parsePrice(price),
          speed:parseSpeed(speed),
          regions: getRegionsFromRawString(rawRegions),
          benefits: (await getBenefitOrder()).filter((_,i) =>
            scrapedTariffData[i+4].startsWith('Y'))}
}

export async function getManuallyScrapedSocialTariffsData()
: Promise<string[][]> {
  if (!manuallyScrapedSocialTariffsData) {
    manuallyScrapedSocialTariffsData =
      await new Promise(resolve => {
        https.get(
          'https://docs.google.com/spreadsheets/d/1SqHtdJmKnxcvVesLHWeBl_KglYQihnpFzRRXutDy8bU/gviz/tq?tqx=out:csv&sheet=ExtraData',
          res => {
            const chunks: Uint8Array[] = []
            res.on('data', d => {chunks.push(d)})
            res.on('end', () =>
              resolve(csvParse(Buffer.concat(chunks))))
          })
      })
  }
  return manuallyScrapedSocialTariffsData as string[][]
}

function parsePrice(s: string): {
  pounds: number,
  pence: number
} {
  const poundIndex = s.indexOf('£')

  if (poundIndex === -1) throw new Error('Not a valid price')

  const numberString = s.slice(poundIndex+1)

  const dotIndex = numberString.indexOf('.')

  if (dotIndex === -1) {
    return {
      pounds: parseInt(numberString),
      pence: 0
    }
  } else {
    const poundsString = numberString.slice(0,dotIndex)
    const penceString = numberString.slice(dotIndex+1)
    return {
      pounds: parseInt(poundsString),
      pence: parseInt(penceString)
    }
  }
}

function parseSpeed(s: string): number | 'mobile' {
  if (s.includes('5G')) return 'mobile'
  else return Number(s.match(/\d+/g)?.at(-1))
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

  return Promise.all(domrows.map(domrow => {
    const tds = domrow.querySelectorAll('td')

    const a = tds[0].querySelector('a')
    const href = a?.attributes['href'] as string
    const name = a?.childNodes[0].innerText as string
    const price = tds[1].innerText
    const speed = tds[2].innerText
    const rawRegions = tds[3].innerText

    return enrich(
      { name, href, price, speed, rawRegions })
  }))
}
