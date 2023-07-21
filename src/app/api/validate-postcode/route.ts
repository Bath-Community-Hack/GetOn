import { initialCTMDealsSlashPostcodeValidation } from '@/3rd-party-api-calls/ctm'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
) {
  const body = await req.json()
  const postcodeInput: string = body.postcode
  const postcode =
    postcodeInput.toUpperCase().replaceAll(' ', '')

  const data = (await axios.post(
    'https://statistics.data.gov.uk/sparql.json',
    new URLSearchParams({
      'query':
      'SELECT * WHERE {'
        +'<http://statistics.data.gov.uk/id/postcode/unit/'
        +postcode+'>'
        +' <http://publishmydata.com/def/ontology/foi/within> ?within'
        //+' <http://www.w3.org/2000/01/rdf-schema#label> ?postcode'
        +'}'
    }))).data

  return NextResponse.json({error: JSON.stringify(data)})

  /*
  const initialDeals =
    await initialCTMDealsSlashPostcodeValidation(body.postcode)
  */

  if (!data.results.bindings.find(
    (binding:any)=>binding.postcode))
  {
    return NextResponse.json({error: 'Please enter a valid postcode'})
  } else {
    return NextResponse.json({postcode})
  }
}
