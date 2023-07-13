import { initialCTMDealsSlashPostcodeValidation } from '@/3rd-party-api-calls/ctm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
) {
  const body = await req.json()

  const initialDeals =
    await initialCTMDealsSlashPostcodeValidation(body.postcode)

  if ('error' in initialDeals) {
    return NextResponse.json(initialDeals)
  } else {
    return NextResponse.json({})
  }
}
