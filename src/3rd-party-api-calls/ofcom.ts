import axios from 'axios'
import { parse } from 'node-html-parser'
import { Deal } from '../synthesis/all-deals'

export type OfcomSocialTariff = Deal

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
    const price = tds[1].innerText
    const speed = tds[2].innerText
    const available = tds[3].innerText

    return { name, href, price, speed, available }
  })
}
