import { getTopLevelBenefits } from "@/synthesis/all-deals";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getTopLevelBenefits())
}
