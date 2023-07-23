import filteredDeals from "@/filtering/filter-deals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {
  const body = await req.json()
  return NextResponse.json({deals: await filteredDeals(
    body.regions,
    body.budget,
    body.benefits,
    body.usage
  )})
}
