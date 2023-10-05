import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  if (params.id) {
    // const data = await fetch(`https://api.dooki.com.br/v2/3072/catalog/products/${params.id}?include=skus,images,firstImage`, {
    //   headers: {
    //     
    //   }
    // })
    // const product = await data.json()
    return {
      "relevance": null,
      "id": 23331644,
      "merchant_id": 778613,
      "seller_id": null,
      "affiliation_id": null,
      "active": true,
      "gift_value": "0.00",
      "searchable": true,
      "simple": true,
      "erp_id": null,
      "ncm": null,
      "has_variations": false,
      "is_digital": false,
      "warranty": 0,
      "custom_shipping": false,
      "shipping_price": "0.00",
      "name": "Produto Teste",
      "slug": "produto-teste",
      "sku": "67QZL57WB",
      "rating": 0,
      "priority": 1,
      "url": "https://3072.catalog.yampi.io/produto-teste/p",
      "redirect_url_card": null,
      "redirect_url_billet": null,
      "preview_url": "https://3072.bubbstorelive.com.br/produto-teste/p?skipCache=1",
      "images": {
        "data": [
          {
            "id": 1494824710,
            "processed": true,
            "name": "produto-teste-651e9f05e114f",
            "order": 0,
            "extension": "png",
            "filter_image_url": null,
            "small": {
              "width": 50,
              "height": 50,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-small.png"
            },
            "thumb": {
              "width": 250,
              "height": 250,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-thumb.png"
            },
            "medium": {
              "width": 500,
              "height": 500,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-medium.png"
            },
            "large": {
              "width": 1000,
              "height": 1000,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-large.png"
            }
          },
          {
            "id": 1494824711,
            "processed": true,
            "name": "produto-teste-651e9f05e2225",
            "order": 1,
            "extension": "png",
            "filter_image_url": null,
            "small": {
              "width": 50,
              "height": 50,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e2225-small.png"
            },
            "thumb": {
              "width": 250,
              "height": 250,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e2225-thumb.png"
            },
            "medium": {
              "width": 500,
              "height": 500,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e2225-medium.png"
            },
            "large": {
              "width": 1000,
              "height": 1000,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e2225-large.png"
            }
          },
          {
            "id": 1494824712,
            "processed": true,
            "name": "produto-teste-651e9f05e32d0",
            "order": 2,
            "extension": "png",
            "filter_image_url": null,
            "small": {
              "width": 50,
              "height": 50,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e32d0-small.png"
            },
            "thumb": {
              "width": 250,
              "height": 250,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e32d0-thumb.png"
            },
            "medium": {
              "width": 500,
              "height": 500,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e32d0-medium.png"
            },
            "large": {
              "width": 1000,
              "height": 1000,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e32d0-large.png"
            }
          },
          {
            "id": 1495062997,
            "processed": true,
            "name": "produto-teste-651eb99276fbd",
            "order": 3,
            "extension": "png",
            "filter_image_url": null,
            "small": {
              "width": 50,
              "height": 50,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651eb99276fbd-small.png"
            },
            "thumb": {
              "width": 250,
              "height": 250,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651eb99276fbd-thumb.png"
            },
            "medium": {
              "width": 500,
              "height": 500,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651eb99276fbd-medium.png"
            },
            "large": {
              "width": 1000,
              "height": 1000,
              "url": "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651eb99276fbd-large.png"
            }
          }
        ]
      },
      "skus": {
        "data": [
          {
            "id": 159370635,
            "product_id": 23331644,
            "seller_id": null,
            "sku": "67QZL57WB",
            "token": "E7KQCB73NB",
            "erp_id": null,
            "blocked_sale": false,
            "barcode": null,
            "title": "Produto Teste",
            "availability": 1,
            "availability_soldout": -1,
            "days_availability_formated": "1 dia útil",
            "price_cost": 0,
            "price_sale": 70,
            "price_discount": 0,
            "width": 12,
            "height": 8,
            "length": 15,
            "weight": 0.7,
            "quantity_managed": true,
            "variations": [],
            "combinations": "159370635",
            "order": 0,
            "total_in_stock": 50,
            "total_orders": null,
            "allow_sell_without_customization": false,
            "image_reference_sku_id": null,
            "purchase_url": "https://3072.pay.yampi.com.br/r/E7KQCB73NB",
            "created_at": {
              "date": "2023-10-05 08:33:25.000000",
              "timezone_type": 3,
              "timezone": "America/Sao_Paulo"
            },
            "updated_at": {
              "date": "2023-10-05 10:26:42.000000",
              "timezone_type": 3,
              "timezone": "America/Sao_Paulo"
            },
            "customizations": {
              "data": []
            }
          }
        ]
      }
    };
  }

  throw error(404, 'Not found');
};
