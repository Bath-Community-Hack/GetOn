import axios from 'axios'

const queryTemplate = {
  "operationName":"deals",
  "variables":{
    "get_all_suppliers":true,
    "get_featured_deals":false,
    "get_special_offers":false,
    "count":10,
    "page":1,
    "sort":"RECOMMENDED",
    "reverse":false,
    "current_supplier":null,
    "postcode":"",
    "uprn":null,
    "filters":{
      "connection_types":null,
      "package_types":null,
      "includes_home_bb":null,
      "includes_mobile_bb":null,
      "includes_tv":false,
      "includes_phone":null,
      "contract_lengths":null,
      "download_speed":{"min":10,"max":null},
      "monthly_price":null,
      "headline_price":null,
      "business":null,
      "social_tariff":null,
      "unlimited":null,
      "gift":null,
      "free_evening_calls":null,
      "free_weekend_calls":null,
      "free_peak_calls":null,
      "free_mobile_calls":null,
      "has_existing_customer_requirements":null,
      "existing_broadband_customers":null,
      "existing_mobiles_customers":null,
      "suppliers":null,
      "tv_pack_groups":null,
      "tv_channels":null,
      "deals":null},
    "fixed_filters":{
      "connection_types":null,
      "package_types":null,
      "includes_home_bb":null,
      "includes_mobile_bb":null,
      "includes_tv":null,
      "includes_phone":null,
      "contract_lengths":null,
      "download_speed":null,
      "monthly_price":null,
      "headline_price":null,
      "business":false,
      "social_tariff":false,
      "unlimited":null,
      "gift":null,
      "free_evening_calls":null,
      "free_weekend_calls":null,
      "free_peak_calls":null,
      "free_mobile_calls":null,
      "has_existing_customer_requirements":null,
      "existing_broadband_customers":null,
      "existing_mobiles_customers":null,
      "suppliers":null,
      "tv_pack_groups":null,
      "tv_channels":null,
      "deals":null
    },
    "download_speed_buckets":[
      {"min":10},
      {"min":30},
      {"min":55},
      {"min":100},
      {"min":250},
      {"min":450}
    ],
    "headline_price_buckets":[
      {"max":10},
      {"max":20},
      {"max":30},
      {"max":40},
      {"max":50},
      {"max":60},
      {"max":70},
      {"min":70}
    ],
    "aggregate_buckets":[
      {"min":10},
      {"min":30},
      {"min":55},
      {"min":100},
      {"min":250},
      {"min":450}],
    "return_empty_download_speed_buckets":true,
    "mvt":null
  },
  "query":"query deals($postcode: String!, $uprn: ID, $sort: Sort, $reverse: Boolean, $count: Int, $page: Int, $current_supplier: ID, $filters: FilterDeal, $fixed_filters: FilterDeal, $download_speed_buckets: [RangeInput!], $headline_price_buckets: [RangeInput!], $aggregate_buckets: [RangeInput!], $get_all_suppliers: Boolean = false, $get_featured_deals: Boolean = false, $get_special_offers: Boolean = false, $return_empty_download_speed_buckets: Boolean) {\n  deal_filters(\n    postcode: $postcode\n    current_supplier: $current_supplier\n    filters: $filters\n    fixed_filters: $fixed_filters\n  ) {\n    connection_types\n    package_types\n    contract_lengths\n    gift\n    download_speeds(\n      buckets: $download_speed_buckets\n      returnEmptyBuckets: $return_empty_download_speed_buckets\n    ) {\n      min\n      max\n      num\n      __typename\n    }\n    suppliers {\n      ...Supplier\n      __typename\n    }\n    headline_prices(buckets: $headline_price_buckets) {\n      min\n      max\n      __typename\n    }\n    tv_pack_groups {\n      id\n      name\n      description\n      __typename\n    }\n    tv_channels {\n      id\n      name\n      image\n      code\n      __typename\n    }\n    __typename\n  }\n  deals(\n    postcode: $postcode\n    uprn: $uprn\n    first: $count\n    page: $page\n    sort: $sort\n    reverse: $reverse\n    current_supplier: $current_supplier\n    filters: $filters\n    fixed_filters: $fixed_filters\n  ) {\n    paginatorInfo {\n      currentPage\n      firstItem\n      hasMorePages\n      lastItem\n      lastPage\n      perPage\n      total\n      __typename\n    }\n    data {\n      ...DealParts\n      __typename\n    }\n    __typename\n  }\n  all_suppliers: deal_filters(fixed_filters: $fixed_filters) @include(if: $get_all_suppliers) {\n    suppliers {\n      id\n      name\n      image\n      __typename\n    }\n    __typename\n  }\n  aggregates(\n    buckets: $aggregate_buckets\n    bucketField: DOWNLOAD_SPEED\n    aggregateFields: [MIN_MONTHLY_PRICE]\n    postcode: $postcode\n    current_supplier: $current_supplier\n    filters: $filters\n    fixed_filters: $fixed_filters\n  ) {\n    aggregateField\n    values {\n      min\n      value\n      __typename\n    }\n    __typename\n  }\n  featured_deals: deals(filters: $filters, first: 3, page: 1, sort: RECOMMENDED) @include(if: $get_featured_deals) {\n    data {\n      ...DealParts\n      __typename\n    }\n    __typename\n  }\n  special_offers(fixed_filters: $fixed_filters) @include(if: $get_special_offers) {\n    id\n    name\n    download_speed\n    monthly_price\n    headline_price\n    discount_price\n    discount_total\n    discount_average_price\n    discount_months\n    discount_total\n    discount_type\n    discount_name\n    discount_description\n    discount_expiry\n    discount_promo_code\n    min_contract_length\n    promotion_text\n    sales_number\n    url\n    discount_expiry\n    voucher_description\n    promotional_value\n    promotion_image\n    promotion_description\n    supplier {\n      ...Supplier\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment DealParts on Deal {\n  id\n  sku\n  name\n  download_speed\n  upload_speed\n  estimated_speed {\n    min\n    max\n    __typename\n  }\n  limit\n  phone_charge_peak\n  free_evening_calls\n  free_weekend_calls\n  free_peak_calls\n  free_mobile_calls\n  monthly_price\n  initial_price\n  delivery_price\n  headline_price\n  connection_price\n  new_line_price\n  total_first_year_cost\n  full_contract_cost\n  discount_price\n  discount_total\n  discount_average_price\n  discount_months\n  discount_total\n  discount_type\n  discount_name\n  discount_description\n  discount_expiry\n  discount_promo_code\n  equipment_price\n  existing_broadband_customers\n  featured\n  gift\n  min_contract_length\n  overcharge\n  business\n  student\n  promotion_text\n  sales_number\n  connection_type\n  connection_type_exact\n  phone_charge_peak\n  phone_charge_evening\n  phone_charge_weekend\n  static_ip\n  includes_tv\n  includes_phone\n  includes_mobile_bb\n  includes_home_bb\n  url\n  discount_expiry\n  voucher_description\n  promotional_value\n  promotion_image\n  promotion_description\n  gift_value\n  bullet_1\n  bullet_2\n  bullet_3\n  bullet_4\n  bullet_5\n  bullet_6\n  bullet_7\n  bullet_8\n  tv_bullet_1\n  tv_bullet_2\n  tv_bullet_3\n  tv_bullet_4\n  tv_bullet_5\n  tv_bullet_6\n  tv_bullet_7\n  accuracy\n  technology\n  supplier {\n    ...Supplier\n    __typename\n  }\n  tv_packs {\n    ...TvPack\n    __typename\n  }\n  __typename\n}\n\nfragment Supplier on Supplier {\n  id\n  name\n  url\n  image\n  phone_number\n  score\n  __typename\n}\n\nfragment TvPack on TvPack {\n  id\n  name\n  tv_channels {\n    id\n    name\n    image\n    popularity\n    __typename\n  }\n  is_streaming_service\n  __typename\n}\n"
}

type CTMResult = any[] | { error: string }

export async function initialCTMDealsSlashPostcodeValidation(
  postcode: string
): Promise<{data:any[],paginatorInfo:{lastPage:number}}|{error:string}> {
  queryTemplate.variables.postcode = postcode

  const res =
    await axios.post(
      'https://broadband.comparethemarket.com/graphql',
      queryTemplate,
    ).then(res => res.data)

  if (!res.data) {
    return { error: 'Please enter a valid postcode' }
  }

  return res.data.deals
}

export async function getCTMDeals(
  postcode: string = ''
): Promise<CTMResult> {
  const deals = []

  queryTemplate.variables.postcode = postcode

  const initialDeals =
    await initialCTMDealsSlashPostcodeValidation(postcode)

  if ('error' in initialDeals) {
    return initialDeals
  }

  deals.push(...initialDeals.data)

  deals.push(...(await Promise.all(
    [...Array(initialDeals.paginatorInfo.lastPage)]
      .slice(1)
      .map(async (_,i)=>{
        queryTemplate.variables.page = i
        return await axios.post(
          'https://broadband.comparethemarket.com/graphql',
          queryTemplate,
        ).then(res => res.data.data.deals.data)
  }))).flat())

  return deals
}

export function getCTMSuppliersFromDeals(ctmDeals: any[]) {
  return [...new Set(ctmDeals.map(deal => deal.supplier.name))]
}

export async function getCTMSuppliers(postcode: string = '') {
  const deals = await getCTMDeals(postcode)
  if (!Array.isArray(deals)) return deals
  else return getCTMSuppliersFromDeals(deals)
}
