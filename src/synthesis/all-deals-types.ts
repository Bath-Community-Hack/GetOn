export type OfcomRegion
  = 'UK'
  | 'England'
  | 'Wales'
  | 'Scotland'
  | 'London'
  | 'Cambridgeshire'
  | 'Essex'
  | 'Nottinghamshire'
  | 'Yorkshire'
  | 'Derbyshire'
  | 'Newport'
  | 'South East England'
  | 'Hull'
  | 'East Sussex'
  | 'Kent'
  | 'Lothian'
  | 'South Gloucestershire'
  | 'South West'
  | 'Cornwall'
  | 'Devon'
  | 'Isle of Wight'

// idk this is from https://github.com/seancroach/ts-opaque/blob/latest/source/Opaque.ts
declare const benefitSymbol: unique symbol;
export type Benefit = string & { [benefitSymbol]: string }

export type Deal = {
  name: string,
  href: string,
  price: {
    pounds: bigint,
    pence: bigint
  },
  speed: number,
  regions: OfcomRegion[],
  benefits: Benefit[]
}
