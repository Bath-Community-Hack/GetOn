import filteredDeals from "@/filtering/filter-deals";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({},{headers: corsHeaders})
}

export async function POST(
  req: NextRequest
) {
  const body = await req.json()
  return NextResponse.json({deals: await filteredDeals(
    body.regions,
    body.budget,
    body.benefits,
    body.usage
  )}, {headers: corsHeaders})
}
