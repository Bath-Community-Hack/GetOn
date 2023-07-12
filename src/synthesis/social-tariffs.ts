import { OfcomSocialTariff, ofcomSocialTariffs } from '../3rd-party-api-calls/ofcom'

const ctmProviderToSocialTariffSearchPattern: Record<string,string> = {
  "Shell Energy Broadband": "Shell",

}

// EE and VOXI are mobile, YouFibre isn't everywhere
// TODO might be worth mentioning
const bathSpecificSearchPatternsNotInCTM = [
  "Grayshott", "Truespeed", "EE Basics", "VOXI For Now", "YouFibre"
]

export async function getSocialTariffsFromProviders(
  providers: string[],
  ofcomSocialTariffsCache?: OfcomSocialTariff[]
): Promise<OfcomSocialTariff[] | undefined>
{
  if (!ofcomSocialTariffsCache) {
    ofcomSocialTariffsCache = await ofcomSocialTariffs()
  }

  if (!ofcomSocialTariffsCache) { return }

  return [
    ...providers.flatMap(provider =>
      (ofcomSocialTariffsCache as OfcomSocialTariff[])
        .filter(({name})=>{
        const searchPattern =
            ctmProviderToSocialTariffSearchPattern[provider]

          return name.toLowerCase().includes(
            (searchPattern ?? provider).toLowerCase())
        })),
    ...bathSpecificSearchPatternsNotInCTM.flatMap(
      searchPattern =>
        (ofcomSocialTariffsCache as OfcomSocialTariff[]).filter(
          ({name})=>name.toLowerCase().includes(
            searchPattern.toLowerCase())))
  ]
}
