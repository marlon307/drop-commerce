interface IImage {
  id: number;
  processed: true;
  name: string;
  order: number;
  extension: string;
  filter_image_url: string | null;
  small: {
    width: number;
    height: number;
    url: string;
  };
  thumb: {
    width: number;
    height: number;
    url: string;
  };
  medium: {
    width: number;
    height: number;
    url: string;
  };
  large: {
    width: number;
    height: number;
    url: string;
  }
}

interface ISkus {
  id: number;
  product_id: number;
  seller_id: string | null;
  sku: string;
  token: string;
  erp_id: null;
  blocked_sale: false;
  barcode: null;
  title: string;
  availability: number;
  availability_soldout: number;
  days_availability_formated: string;
  price_cost: number;
  price_sale: number;
  price_discount: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  quantity_managed: boolean;
  variations: [];
  combinations: string;
  order: number;
  total_in_stock: number;
  total_orders: null;
  allow_sell_without_customization: false;
  image_reference_sku_id: null;
  purchase_url: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  customizations: {
    data: []
  }
}

interface IDescription {
  description: Text;
}

interface IProduct {
  relevance: string | null;
  id: number;
  merchant_id: number;
  seller_id: string | null;
  affiliation_id: string | null;
  active: boolean;
  gift_value: string | null;
  searchable: boolean;
  simple: boolean;
  erp_id: string | null;
  ncm: string | null;
  has_variations: boolean;
  is_digital: boolean;
  warranty: number;
  custom_shipping: boolean;
  shipping_price: string | null;
  name: string;
  slug: string;
  sku: string;
  rating: number;
  priority: number;
  url: string;
  redirect_url_card: string | null;
  redirect_url_billet: string | null;
  preview_url: string;
  images: {
    data: IImage[];
  }
  skus: {
    data: ISkus[];
  }
  texts: {
    data: IDescription;
  }
}

interface IPorducts extends ISkus {
  firstImage: {
    data: IImage;
  }
}
