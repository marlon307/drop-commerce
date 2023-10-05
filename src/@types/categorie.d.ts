interface ICategorie {
  id: number;
  merchant_id: number;
  active: boolean;
  featured: boolean;
  parent_id: string | null;
  is_parent: boolean;
  ml_category: string | null;
  price_factor: string;
  name: strin;
  slug: strin;
  url: string;
  url_path: string;
  slug_path: strin;
  description: string;
  external_url: string | null;
  canonical_url: string | null;
  order: number;
  sort_by: string | null;
  total_banners: number;
  filters_values_ids: number[];
  category_cover: string | null;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string
  };
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  }
}
