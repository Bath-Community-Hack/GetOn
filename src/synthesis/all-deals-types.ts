export const ofcomRegions = [
  'UK',
  'England',
  'Wales',
  'Scotland',
  'Northern Ireland',
  'London',
  'Cambridgeshire',
  'Essex',
  'Nottinghamshire',
  'Yorkshire',
  'Derbyshire',
  'Newport',
  'South East England',
  'Hull',
  'East Sussex',
  'Kent',
  'Lothian',
  'South Gloucestershire',
  'South West',
  'Cornwall',
  'Devon',
  'Isle of Wight',
] as const;
export type OfcomRegion = typeof ofcomRegions[number];

// idk this is from https://github.com/seancroach/ts-opaque/blob/latest/source/Opaque.ts
declare const benefitSymbol: unique symbol;
export type Benefit = string & { [benefitSymbol]: string }

export type Deal = {
  name: string,
  href: string,
  price: {
    pounds: number,
    pence: number
  },
  speed: number | 'mobile',
  regions: OfcomRegion[],
  benefits: Benefit[]
}
