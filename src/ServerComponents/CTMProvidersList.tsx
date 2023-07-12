import { getCTMSuppliers } from '@/3rd-party-api-calls/ctm'

export async function CTMProvidersList(
  {postcode}:{postcode?:string}
) {
  const suppliers = await getCTMSuppliers(postcode)

  if (!Array.isArray(suppliers)) {
    return <>{suppliers.error}</>
  }

  return <>
    {suppliers.map(supplier => <div key={supplier}>{supplier}</div>)}
  </>
}
