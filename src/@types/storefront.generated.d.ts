/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from "./storefront.types";

export type CustomerFragment = Pick<
  StorefrontTypes.Customer,
  "firstName" | "lastName" | "email" | "phone" | "acceptsMarketing"
>;

export type ProductFragment = Pick<
  StorefrontTypes.Product,
  "handle" | "title" | "description"
> & {
  featuredImage?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
      xl: StorefrontTypes.Image["url"];
      lg: StorefrontTypes.Image["url"];
    }
  >;
  compareAtPriceRange: {
    maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
  };
  priceRange: {
    maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
  };
};

export type CustomerAddressUpdateMutationVariables = StorefrontTypes.Exact<{
  dataAddress: StorefrontTypes.MailingAddressInput;
  token: StorefrontTypes.Scalars["String"]["input"];
  idAddress: StorefrontTypes.Scalars["ID"]["input"];
}>;

export type CustomerAddressUpdateMutation = {
  customerAddressUpdate?: StorefrontTypes.Maybe<{
    customerAddress?: StorefrontTypes.Maybe<
      Pick<
        StorefrontTypes.MailingAddress,
        | "firstName"
        | "lastName"
        | "address1"
        | "address2"
        | "city"
        | "country"
        | "zip"
        | "province"
      >
    >;
    customerUserErrors: Array<
      Pick<StorefrontTypes.CustomerUserError, "field" | "message" | "code">
    >;
  }>;
};

export type CustomerAddressDeleteMutationVariables = StorefrontTypes.Exact<{
  token: StorefrontTypes.Scalars["String"]["input"];
  idAddress: StorefrontTypes.Scalars["ID"]["input"];
}>;

export type CustomerAddressDeleteMutation = {
  customerAddressDelete?: StorefrontTypes.Maybe<
    Pick<
      StorefrontTypes.CustomerAddressDeletePayload,
      "deletedCustomerAddressId"
    > & {
      customerUserErrors: Array<
        Pick<StorefrontTypes.CustomerUserError, "field" | "message" | "code">
      >;
    }
  >;
};

export type CustomerUpdateMutationVariables = StorefrontTypes.Exact<{
  customer: StorefrontTypes.CustomerUpdateInput;
  token: StorefrontTypes.Scalars["String"]["input"];
}>;

export type CustomerUpdateMutation = {
  customerUpdate?: StorefrontTypes.Maybe<{
    customer?: StorefrontTypes.Maybe<
      Pick<
        StorefrontTypes.Customer,
        "firstName" | "lastName" | "email" | "phone" | "acceptsMarketing"
      >
    >;
    customerAccessToken?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.CustomerAccessToken, "accessToken">
    >;
    customerUserErrors: Array<
      Pick<StorefrontTypes.CustomerUserError, "field" | "message" | "code">
    >;
  }>;
};

export type QueryCustomerAddressQueryVariables = StorefrontTypes.Exact<{
  token: StorefrontTypes.Scalars["String"]["input"];
}>;

export type QueryCustomerAddressQuery = {
  customer?: StorefrontTypes.Maybe<{
    addresses: {
      edges: Array<{
        node: Pick<
          StorefrontTypes.MailingAddress,
          | "id"
          | "firstName"
          | "lastName"
          | "city"
          | "company"
          | "country"
          | "zip"
          | "province"
          | "address1"
          | "address2"
        >;
      }>;
    };
  }>;
};

export type GetCustomerAccessTokenQueryVariables = StorefrontTypes.Exact<{
  token: StorefrontTypes.Scalars["String"]["input"];
}>;

export type GetCustomerAccessTokenQuery = {
  customer?: StorefrontTypes.Maybe<{
    orders: {
      edges: Array<{
        node: Pick<
          StorefrontTypes.Order,
          "name" | "orderNumber" | "financialStatus"
        > & {
          totalTax?: StorefrontTypes.Maybe<
            Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          >;
          totalPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
          totalShippingPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          successfulFulfillments?: StorefrontTypes.Maybe<
            Array<
              Pick<StorefrontTypes.Fulfillment, "trackingCompany"> & {
                trackingInfo: Array<
                  Pick<
                    StorefrontTypes.FulfillmentTrackingInfo,
                    "number" | "url"
                  >
                >;
              }
            >
          >;
          shippingAddress?: StorefrontTypes.Maybe<
            Pick<
              StorefrontTypes.MailingAddress,
              | "firstName"
              | "lastName"
              | "city"
              | "company"
              | "country"
              | "zip"
              | "province"
              | "address1"
              | "address2"
            >
          >;
          lineItems: {
            edges: Array<{
              node: Pick<StorefrontTypes.OrderLineItem, "quantity"> & {
                variant?: StorefrontTypes.Maybe<
                  Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    product: Pick<StorefrontTypes.Product, "handle" | "title">;
                    price: Pick<
                      StorefrontTypes.MoneyV2,
                      "amount" | "currencyCode"
                    >;
                    image?: StorefrontTypes.Maybe<
                      Pick<StorefrontTypes.Image, "url">
                    >;
                  }
                >;
              };
            }>;
          };
        };
      }>;
    };
  }>;
};

export type GetCollectionProductsQueryVariables = StorefrontTypes.Exact<{
  collection: StorefrontTypes.Scalars["String"]["input"];
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductCollectionSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<
    StorefrontTypes.Scalars["Boolean"]["input"]
  >;
}>;

export type GetCollectionProductsQuery = {
  collection?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Collection, "description"> & {
      image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url">>;
      products: {
        edges: Array<{
          node: Pick<
            StorefrontTypes.Product,
            "handle" | "title" | "description"
          > & {
            featuredImage?: StorefrontTypes.Maybe<
              Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
                xl: StorefrontTypes.Image["url"];
                lg: StorefrontTypes.Image["url"];
              }
            >;
            compareAtPriceRange: {
              maxVariantPrice: Pick<
                StorefrontTypes.MoneyV2,
                "amount" | "currencyCode"
              >;
              minVariantPrice: Pick<
                StorefrontTypes.MoneyV2,
                "amount" | "currencyCode"
              >;
            };
            priceRange: {
              maxVariantPrice: Pick<
                StorefrontTypes.MoneyV2,
                "amount" | "currencyCode"
              >;
              minVariantPrice: Pick<
                StorefrontTypes.MoneyV2,
                "amount" | "currencyCode"
              >;
            };
          };
        }>;
      };
    }
  >;
};

export type GetProductsQueryVariables = StorefrontTypes.Exact<{
  query?: StorefrontTypes.InputMaybe<
    StorefrontTypes.Scalars["String"]["input"]
  >;
  sort?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<
    StorefrontTypes.Scalars["Boolean"]["input"]
  >;
}>;

export type GetProductsQuery = {
  products: {
    edges: Array<{
      node: Pick<
        StorefrontTypes.Product,
        "handle" | "title" | "description"
      > & {
        featuredImage?: StorefrontTypes.Maybe<
          Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
            xl: StorefrontTypes.Image["url"];
            lg: StorefrontTypes.Image["url"];
          }
        >;
        compareAtPriceRange: {
          maxVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          minVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
        };
        priceRange: {
          maxVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          minVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
        };
      };
    }>;
  };
};

export type GetProductByHandleQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars["String"]["input"];
}>;

export type GetProductByHandleQuery = {
  product?: StorefrontTypes.Maybe<
    Pick<
      StorefrontTypes.Product,
      "id" | "title" | "descriptionHtml" | "description"
    > & {
      seo: Pick<StorefrontTypes.Seo, "title" | "description">;
      options: Array<
        Pick<StorefrontTypes.ProductOption, "id" | "name"> & {
          optionValues: Array<
            Pick<StorefrontTypes.ProductOptionValue, "name"> & {
              swatch?: StorefrontTypes.Maybe<
                Pick<StorefrontTypes.ProductOptionValueSwatch, "color">
              >;
            }
          >;
        }
      >;
      media: {
        edges: Array<{
          node:
            | (Pick<
                StorefrontTypes.ExternalVideo,
                "originUrl" | "embedUrl" | "id" | "mediaContentType"
              > & {
                previewImage?: StorefrontTypes.Maybe<
                  Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
                    transformedSrc: StorefrontTypes.Image["url"];
                    xl: StorefrontTypes.Image["url"];
                    lg: StorefrontTypes.Image["url"];
                    sm: StorefrontTypes.Image["url"];
                    xs: StorefrontTypes.Image["url"];
                  }
                >;
              })
            | (Pick<StorefrontTypes.MediaImage, "id" | "mediaContentType"> & {
                previewImage?: StorefrontTypes.Maybe<
                  Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
                    transformedSrc: StorefrontTypes.Image["url"];
                    xl: StorefrontTypes.Image["url"];
                    lg: StorefrontTypes.Image["url"];
                    sm: StorefrontTypes.Image["url"];
                    xs: StorefrontTypes.Image["url"];
                  }
                >;
              })
            | (Pick<StorefrontTypes.Model3d, "id" | "mediaContentType"> & {
                previewImage?: StorefrontTypes.Maybe<
                  Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
                    transformedSrc: StorefrontTypes.Image["url"];
                    xl: StorefrontTypes.Image["url"];
                    lg: StorefrontTypes.Image["url"];
                    sm: StorefrontTypes.Image["url"];
                    xs: StorefrontTypes.Image["url"];
                  }
                >;
              })
            | (Pick<StorefrontTypes.Video, "id" | "mediaContentType"> & {
                sources: Array<
                  Pick<
                    StorefrontTypes.VideoSource,
                    "url" | "format" | "mimeType"
                  >
                >;
                previewImage?: StorefrontTypes.Maybe<
                  Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
                    transformedSrc: StorefrontTypes.Image["url"];
                    xl: StorefrontTypes.Image["url"];
                    lg: StorefrontTypes.Image["url"];
                    sm: StorefrontTypes.Image["url"];
                    xs: StorefrontTypes.Image["url"];
                  }
                >;
              });
        }>;
      };
      variants: {
        edges: Array<{
          node: Pick<
            StorefrontTypes.ProductVariant,
            "id" | "title" | "sku" | "availableForSale" | "barcode"
          > & {
            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">;
            image?: StorefrontTypes.Maybe<
              Pick<StorefrontTypes.Image, "url" | "width" | "height">
            >;
            selectedOptions: Array<
              Pick<StorefrontTypes.SelectedOption, "name" | "value">
            >;
            compareAtPrice?: StorefrontTypes.Maybe<
              Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
            >;
          };
        }>;
      };
    }
  >;
};

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars["ID"]["input"];
}>;

export type ProductRecommendationsQuery = {
  productRecommendations?: StorefrontTypes.Maybe<
    Array<
      Pick<StorefrontTypes.Product, "handle" | "title" | "description"> & {
        featuredImage?: StorefrontTypes.Maybe<
          Pick<StorefrontTypes.Image, "url" | "width" | "height"> & {
            xl: StorefrontTypes.Image["url"];
            lg: StorefrontTypes.Image["url"];
          }
        >;
        compareAtPriceRange: {
          maxVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          minVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
        };
        priceRange: {
          maxVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          minVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
        };
      }
    >
  >;
};

export type SuggestionsQueryVariables = StorefrontTypes.Exact<{
  query: StorefrontTypes.Scalars["String"]["input"];
}>;

export type SuggestionsQuery = {
  predictiveSearch?: StorefrontTypes.Maybe<{
    queries: Array<Pick<StorefrontTypes.SearchQuerySuggestion, "text">>;
    products: Array<
      Pick<StorefrontTypes.Product, "handle" | "title"> & {
        featuredImage?: StorefrontTypes.Maybe<{
          url: StorefrontTypes.Image["url"];
        }>;
        priceRange: {
          maxVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
          minVariantPrice: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >;
        };
      }
    >;
  }>;
};

interface GeneratedQueryTypes {
  "\n#graphql\nquery queryCustomerAddress($token: String!) {\n  customer(customerAccessToken: $token) {\n    addresses(first: 10) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          city\n          company\n          country\n          zip\n          province\n          address1\n          address2\n        }\n      }\n    }\n  }\n}\n": {
    return: QueryCustomerAddressQuery;
    variables: QueryCustomerAddressQueryVariables;
  };
  "\n#graphql\nquery getCustomerAccessToken($token: String!) {\n  customer(customerAccessToken: $token) {\n    orders(first: 10, reverse: true) {\n      edges {\n        node {\n          name\n          orderNumber\n          financialStatus\n          totalTax {\n            amount\n            currencyCode\n          }\n          totalPrice {\n            amount\n            currencyCode\n          }\n          totalShippingPrice {\n            amount\n            currencyCode\n          }\n          successfulFulfillments {\n            trackingCompany\n            trackingInfo {\n              number\n              url\n            }\n          }\n          shippingAddress {\n            firstName\n            lastName\n            city\n            company\n            country\n            zip\n            province\n            address1\n            address2\n          }\n          lineItems(first: 250) {\n            edges {\n              node {\n                quantity\n                variant {\n                  id\n                  title\n                  product {\n                    handle\n                    title\n                  }\n                  price {\n                    amount\n                    currencyCode\n                  }\n                  image {\n                    url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": {
    return: GetCustomerAccessTokenQuery;
    variables: GetCustomerAccessTokenQueryVariables;
  };
  "\n#graphql\nquery getCollectionProducts($collection: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {\n  collection(handle: $collection) {\n    description\n    image {\n      url(transform: {maxWidth: 200, maxHeight: 150 crop: CENTER, preferredContentType: WEBP })\n    }\n    products(first: 100, sortKey: $sortKey, reverse: $reverse) {\n      edges {\n        node {\n          ...product\n        }\n      }\n    }\n  }\n}\n\n  #graphql\n  fragment product on Product {\n    handle\n    title\n    description\n    featuredImage {\n      url\n      xl: url(transform: { maxHeight: 955, maxWidth: 955, crop: CENTER, preferredContentType: WEBP })\n      lg: url(transform: { maxHeight: 318, maxWidth: 318, crop: CENTER, preferredContentType: WEBP })\n      width\n      height\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": {
    return: GetCollectionProductsQuery;
    variables: GetCollectionProductsQueryVariables;
  };
  "\n#graphql\nquery getProducts($query: String, $sort: ProductSortKeys, $reverse: Boolean) {\n  products(first: 100, query: $query, sortKey: $sort, reverse: $reverse) {\n    edges {\n      node {\n        ...product\n      }\n    }\n  }\n}\n\n  #graphql\n  fragment product on Product {\n    handle\n    title\n    description\n    featuredImage {\n      url\n      xl: url(transform: { maxHeight: 955, maxWidth: 955, crop: CENTER, preferredContentType: WEBP })\n      lg: url(transform: { maxHeight: 318, maxWidth: 318, crop: CENTER, preferredContentType: WEBP })\n      width\n      height\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": {
    return: GetProductsQuery;
    variables: GetProductsQueryVariables;
  };
  "\n#graphql\nquery getProductByHandle($handle: String!) {\n  product(handle: $handle) {\n    id\n    title\n    descriptionHtml\n    description\n    seo {\n      title\n      description\n    }\n    options {\n      id\n      name\n      optionValues {\n        name\n        swatch {\n          color\n        }\n      }\n    }\n    media(first: 50) {\n      edges {\n        node {\n          id\n          previewImage {\n            url\n            transformedSrc: url(transform: { maxHeight: 72, maxWidth: 72, crop: CENTER, preferredContentType: WEBP })\n            xl: url(transform: { maxHeight: 930, maxWidth: 930, crop: CENTER, preferredContentType: WEBP })\n            lg: url(transform: { maxHeight: 681, maxWidth: 681, crop: CENTER, preferredContentType: WEBP })\n            sm: url(transform: { maxHeight: 450, maxWidth: 450, crop: CENTER, preferredContentType: WEBP })\n            xs: url(transform: { maxHeight: 341, maxWidth: 341, crop: CENTER, preferredContentType: WEBP })\n            width\n            height\n          }\n          mediaContentType\n          ... on Video {\n            id\n            sources {\n              url\n              format\n              mimeType\n            }\n          }\n          ... on ExternalVideo {\n            originUrl\n            embedUrl\n            previewImage {\n              url\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n    variants(first: 50) {\n      edges {\n        node {\n          id\n          title\n          sku\n          availableForSale\n          barcode\n          price {\n            amount\n            currencyCode\n          }\n          image {\n            url\n            width\n            height\n          }\n          selectedOptions {\n            name\n            value\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n}": {
    return: GetProductByHandleQuery;
    variables: GetProductByHandleQueryVariables;
  };
  "\n#graphql\nquery productRecommendations($productId: ID!) {\n  productRecommendations(productId: $productId) {\n    ...product\n  }\n}\n\n  #graphql\n  fragment product on Product {\n    handle\n    title\n    description\n    featuredImage {\n      url\n      xl: url(transform: { maxHeight: 955, maxWidth: 955, crop: CENTER, preferredContentType: WEBP })\n      lg: url(transform: { maxHeight: 318, maxWidth: 318, crop: CENTER, preferredContentType: WEBP })\n      width\n      height\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": {
    return: ProductRecommendationsQuery;
    variables: ProductRecommendationsQueryVariables;
  };
  "\n#graphql\nquery suggestions($query: String!) {\n  predictiveSearch(query: $query) {\n    queries {\n      text\n    }\n    products {\n      handle\n      title\n      featuredImage {\n        url: url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })\n      }\n      priceRange {\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n}\n": {
    return: SuggestionsQuery;
    variables: SuggestionsQueryVariables;
  };
}

interface GeneratedMutationTypes {
  "\n#graphql\nmutation customerAddressUpdate($dataAddress: MailingAddressInput!, $token: String!, $idAddress: ID!) {\n  customerAddressUpdate(address: $dataAddress, customerAccessToken: $token, id: $idAddress) {\n    customerAddress {\n      firstName\n      lastName\n      address1\n      address2\n      city\n      country\n      zip\n      province\n    }\n    customerUserErrors {\n      field\n      message\n      code\n    }\n  }\n}\n": {
    return: CustomerAddressUpdateMutation;
    variables: CustomerAddressUpdateMutationVariables;
  };
  "\n#graphql\nmutation customerAddressDelete($token: String!, $idAddress: ID!) {\n  customerAddressDelete(customerAccessToken: $token, id: $idAddress) {\n    customerUserErrors {\n      field\n      message\n      code\n    }\n    deletedCustomerAddressId\n  }\n}\n": {
    return: CustomerAddressDeleteMutation;
    variables: CustomerAddressDeleteMutationVariables;
  };
  "\n#graphql\nmutation customerUpdate($customer: CustomerUpdateInput!, $token: String!) {\n  customerUpdate(customer: $customer, customerAccessToken: $token) {\n    customer {\n      ...customer\n    }\n    customerAccessToken {\n      accessToken\n    }\n    customerUserErrors {\n      field\n      message\n      code\n    }\n  }\n}\n\n#graphql\nfragment customer on Customer {\n  firstName\n  lastName\n  email\n  phone\n  acceptsMarketing\n}\n": {
    return: CustomerUpdateMutation;
    variables: CustomerUpdateMutationVariables;
  };
}
declare module "@shopify/storefront-api-client" {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
