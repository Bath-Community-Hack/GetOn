import { gql } from '@apollo/client'
import client from '../ApolloClient'


export async function getDataByPostcode(postcode: string) {
    client.query({
        query: gql`
        {
           deals(
            postcode: ${postcode}, 
            uprn: null, 
            sort: "RECOMMENDED", 
            reverse: false, 
            count: 10, 
            page: 1, 
            current_supplier: null
            ) {
                deal_filters(
                    postcode: ${postcode}
                    current_supplier: null    
                    filters: null
                    fixed_filters: null
                 ) {
                    connection_types   
                    package_types
                    contract_lengths
                    gift
                    download_speeds(
                        buckets: null
                        returnEmptyBuckets: null
                    ) {
                        min
                        max
                        num
                        __typename
                    }
                    suppliers {
                        ...Supplier
                        __typename
                    }
                    headline_prices(buckets: $headline_price_buckets) {
                        min
                        max
                        __typename
                    }
                    tv_pack_groups {
                        id
                        name
                        description
                        __typename
                    }
                    tv_channels {
                        id
                        name
                        image
                        code
                        __typename
                    }
                    __typename
                }
                deals(
                    postcode: ${postcode}
                    uprn: $null
                    first: 1
                    page: 1
                    sort: "RECOMMENDED"
                    reverse: false
                    current_supplier: null
                    filters: null
                    fixed_filters: null
                ) {
                    paginatorInfo {
                        currentPage: 1
                        firstItem: 
                        hasMorePages
                        lastItem
                        lastPage
                        perPage
                        total
                        __typename
                    }
                    data {
                        ...DealParts
                        __typename
                    }
                    __typename
                }
                all_suppliers: deal_filters(fixed_filters: $fixed_filters)
                @include(if: true) {
                    suppliers {
                        id
                        name
                        image
                        __typename
                    }
                    __typename
                }
                aggregates(
                    buckets: $aggregate_buckets
                    bucketField: DOWNLOAD_SPEED
                    aggregateFields: [MIN_MONTHLY_PRICE]
                    postcode: ${postcode}
                    current_supplier: null
                    filters: null
                    fixed_filters: null
                ) {
                    aggregateField
                    values {
                        min
                        value
                        __typename
                    }
                    __typename
                }
                featured_deals: deals(filters: null, first: 3, page: 1, sort: RECOMMENDED)
                @include(if: true) {
                    data {
                        ...DealParts
                        __typename
                    }
                    __typename
                }
                special_offers(fixed_filters: null)
                @include(if: null) {
                    id
                    name
                    download_speed
                    monthly_price
                    headline_price
                    discount_price
                    discount_total
                    discount_average_price
                    discount_months
                    discount_total
                    discount_type
                    discount_name
                    discount_description
                    discount_expiry
                    discount_promo_code
                    min_contract_length
                    promotion_text
                    sales_number
                    url
                    discount_expiry
                    voucher_description
                    promotional_value
                    promotion_image
                    promotion_description
                    supplier {
                        ...Supplier
                        __typename
                    }
                    __typename
                }
            }
            fragment DealParts on Deal {
                id
                sku
                name
                download_speed
                upload_speed
                estimated_speed {
                    min
                    max
                    __typename
                }
                limit
                phone_charge_peak
                free_evening_calls
                free_weekend_calls
                free_peak_calls
                free_mobile_calls
                monthly_price  
                initial_price
                delivery_price
                headline_price
                connection_price
                new_line_price
                total_first_year_cost  
                full_contract_cost  
                discount_price  
                discount_total  
                discount_average_price  
                discount_months  
                discount_total  
                discount_type  
                discount_name  
                discount_description  
                discount_expiry  
                discount_promo_code  
                equipment_price  
                existing_broadband_customers  
                featured  
                gift 
                min_contract_length  
                overcharge
                business  
                student  
                promotion_text
                sales_number  
                connection_type  
                connection_type_exact  
                phone_charge_peak  
                phone_charge_evening  
                phone_charge_weekend  
                static_ip  
                includes_tv  
                includes_phone  
                includes_mobile_bb  
                includes_home_bb  
                url  
                discount_expiry  
                voucher_description  
                promotional_value  
                promotion_image  
                promotion_description  
                gift_value  
                bullet_1  
                bullet_2  
                bullet_3  
                bullet_4  
                bullet_5  
                bullet_6  
                bullet_7  
                bullet_8  
                tv_bullet_1  
                tv_bullet_2  
                tv_bullet_3  
                tv_bullet_4  
                tv_bullet_5  
                tv_bullet_6  
                tv_bullet_7  
                accuracy  
                technology  
                supplier {    
                    ...Supplier    
                    __typename  
                }  
                tv_packs {    
                    ...TvPack   
                    __typename
                }  
                __typename
            }
            fragment Supplier on Supplier {
                id  
                name
                url  
                image  
                phone_number  
                score  
                __typename
            }
            fragment TvPack on TvPack {
                id  
                name  
                tv_channels {    
                    id    
                    name    
                    image    
                    popularity    
                    __typename  
                }  
                is_streaming_service  
                __typename}
            }
        }
        `,
    })
        .then((result) => console.log(result));
}


//   {
//     "operationName": "deals",
//     "variables": {
//       "get_all_suppliers": true,
//       "get_featured_deals": false,
//       "get_special_offers": false,
//       "count": 10,
//       "page": 1,
//       "sort": "RECOMMENDED",
//       "reverse": false,
//       "current_supplier": null,
//       "postcode": ${postcode},
//       "uprn": null,
//       "filters": {
//         "connection_types": null,
//         "package_types": null,
//         "includes_home_bb": null,
//         "includes_mobile_bb": null,
//         "includes_tv": false,
//         "includes_phone": null,
//         "contract_lengths": null,
//         "download_speed": {
//           "min": 10,
//           "max": null
//         },
//         "monthly_price": null,
//         "headline_price": null,
//         "business": null,
//         "social_tariff": null,
//         "unlimited": null,
//         "gift": null,
//         "free_evening_calls": null,
//         "free_weekend_calls": null,
//         "free_peak_calls": null,
//         "free_mobile_calls": null,
//         "has_existing_customer_requirements": null,
//         "existing_broadband_customers": null,
//         "existing_mobiles_customers": null,
//         "suppliers": null,
//         "tv_pack_groups": null,
//         "tv_channels": null,
//         "deals": null
//       },
//       "fixed_filters": {
//         "connection_types": null,
//         "package_types": null,
//         "includes_home_bb": null,
//         "includes_mobile_bb": null,
//         "includes_tv": null,
//         "includes_phone": null,
//         "contract_lengths": null,
//         "download_speed": null,
//         "monthly_price": null,
//         "headline_price": null,
//         "business": false,
//         "social_tariff": false,
//         "unlimited": null,
//         "gift": null,
//         "free_evening_calls": null,
//         "free_weekend_calls": null,
//         "free_peak_calls": null,
//         "free_mobile_calls": null,
//         "has_existing_customer_requirements": null,
//         "existing_broadband_customers": null,
//         "existing_mobiles_customers": null,
//         "suppliers": null,
//         "tv_pack_groups": null,
//         "tv_channels": null,
//         "deals": null
//       },
//       "download_speed_buckets": [
//         {"min": 10},
//         {"min": 30},
//         {"min": 55},
//         {"min": 100},
//         {"min": 250},
//         {"min": 450}
//       ],
//       "headline_price_buckets": [
//         {"max": 10},
//         {"max": 20},
//         {"max": 30},
//         {"max": 40},
//         {"max": 50},
//         {"max": 60},
//         {"max": 70},
//         {"min": 70}
//       ],
//       "aggregate_buckets": [
//         {"min": 10},
//         {"min": 30},
//         {"min": 55},
//         {"min": 100},
//         {"min": 250},
//         {"min": 450}
//       ],
//       "return_empty_download_speed_buckets": true,
//       "mvt": null
//     },
//     "query": "query deals($postcode: String!, $uprn: ID, $sort: Sort, $reverse: Boolean, $count: Int, $page: Int, $current_supplier: ID, $filters: FilterDeal, $fixed_filters: FilterDeal, $download_speed_buckets: [RangeInput!], $headline_price_buckets: [RangeInput!], $aggregate_buckets: [RangeInput!], $get_all_suppliers: Boolean = false, $get_featured_deals: Boolean = false, $get_special_offers: Boolean = false, $return_empty_download_speed_buckets: Boolean) {  deal_filters(    postcode: $postcode    current_supplier: $current_supplier    filters: $filters    fixed_filters: $fixed_filters  ) {    connection_types    package_types    contract_lengths    gift    download_speeds(      buckets: $download_speed_buckets      returnEmptyBuckets: $return_empty_download_speed_buckets    ) {      min      max      num      __typename    }    suppliers {      ...Supplier      __typename    }    headline_prices(buckets: $headline_price_buckets) {      min      max      __typename    }    tv_pack_groups {      id      name      description      __typename    }    tv_channels {      id      name      image      code      __typename    }    __typename  }  deals(    postcode: $postcode    uprn: $uprn    first: $count    page: $page    sort: $sort    reverse: $reverse    current_supplier: $current_supplier    filters: $filters    fixed_filters: $fixed_filters  ) {    paginatorInfo {      currentPage      firstItem      hasMorePages      lastItem      lastPage      perPage      total      __typename    }    data {      ...DealParts      __typename    }    __typename  }  all_suppliers: deal_filters(fixed_filters: $fixed_filters) @include(if: $get_all_suppliers) {    suppliers {      id      name      image      __typename    }    __typename  }  aggregates(    buckets: $aggregate_buckets    bucketField: DOWNLOAD_SPEED    aggregateFields: [MIN_MONTHLY_PRICE]    postcode: $postcode    current_supplier: $current_supplier    filters: $filters    fixed_filters: $fixed_filters  ) {    aggregateField    values {      min      value      __typename    }    __typename  }  featured_deals: deals(filters: $filters, first: 3, page: 1, sort: RECOMMENDED) @include(if: $get_featured_deals) {    data {      ...DealParts      __typename    }    __typename  }  special_offers(fixed_filters: $fixed_filters) @include(if: $get_special_offers) {    id    name    download_speed    monthly_price    headline_price    discount_price    discount_total    discount_average_price    discount_months    discount_total    discount_type    discount_name    discount_description    discount_expiry    discount_promo_code    min_contract_length    promotion_text    sales_number    url    discount_expiry    voucher_description    promotional_value    promotion_image    promotion_description    supplier {      ...Supplier      __typename    }    __typename  }}fragment DealParts on Deal {  id  sku  name  download_speed  upload_speed  estimated_speed {    min    max    __typename  }  limit  phone_charge_peak  free_evening_calls  free_weekend_calls  free_peak_calls  free_mobile_calls  monthly_price  initial_price  delivery_price  headline_price  connection_price  new_line_price  total_first_year_cost  full_contract_cost  discount_price  discount_total  discount_average_price  discount_months  discount_total  discount_type  discount_name  discount_description  discount_expiry  discount_promo_code  equipment_price  existing_broadband_customers  featured  gift  min_contract_length  overcharge  business  student  promotion_text  sales_number  connection_type  connection_type_exact  phone_charge_peak  phone_charge_evening  phone_charge_weekend  static_ip  includes_tv  includes_phone  includes_mobile_bb  includes_home_bb  url  discount_expiry  voucher_description  promotional_value  promotion_image  promotion_description  gift_value  bullet_1  bullet_2  bullet_3  bullet_4  bullet_5  bullet_6  bullet_7  bullet_8  tv_bullet_1  tv_bullet_2  tv_bullet_3  tv_bullet_4  tv_bullet_5  tv_bullet_6  tv_bullet_7  accuracy  technology  supplier {    ...Supplier    __typename  }  tv_packs {    ...TvPack    __typename  }  __typename}fragment Supplier on Supplier {  id  name  url  image  phone_number  score  __typename}fragment TvPack on TvPack {  id  name  tv_channels {    id    name    image    popularity    __typename  }  is_streaming_service  __typename}"
//   }
