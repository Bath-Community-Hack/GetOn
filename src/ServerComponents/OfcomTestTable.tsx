import axios from 'axios'
import { parse } from 'node-html-parser'

export async function OfcomTestTable() {
  const page = parse(
    await axios.get('https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/costs-and-billing/social-tariffs')
               .then(res => res.data))

  const domrows =
    page.querySelector('.lookup-table__table')
       ?.querySelectorAll('tbody tr')

  if (!domrows) {
    return <>Couldn&apos;t find Ofcom&apos;s social tariffs table</>
  }

  return <>{
    domrows.map(domrow => {
      const tds = domrow.querySelectorAll('td')

      const name = tds[0].querySelector('a')?.childNodes[0].innerText
      const price = tds[1].innerText
      const speed = tds[2].innerText
      const available = tds[3].innerText

      return { name, price, speed, available }
    }).map(({name, price, speed, available})=>
      <div key={name}>
        {name}
        {" | "}{price}
        {" | "}{speed}
        {" | "}{available}
      </div>)
  }</>
}
