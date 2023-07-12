import { getCTMSuppliers } from '@/3rd-party-api-calls/ctm'

export async function CTMProvidersList(
  {postcode}:{postcode?:string}
) {
  const suppliers = await getCTMSuppliers(postcode)

  if (!Array.isArray(suppliers)) {
    return <>{/*suppliers.error*/}</>
  }

  return <div className="flex flex-col">
    <div className="border-b mb-2">Providers</div>
    {suppliers.map(supplier => <div key={supplier}>{supplier}</div>)}
  </div>
}
