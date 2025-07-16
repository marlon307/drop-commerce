/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type ProductFragment = (
  Pick<StorefrontTypes.Product, 'handle' | 'title' | 'description'>
  & { featuredImage?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
    & { xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'] }
  )>, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
);

export type GetProductByHandleQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetProductByHandleQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'title' | 'descriptionHtml' | 'description'>
    & { seo: Pick<StorefrontTypes.Seo, 'title' | 'description'>, options: Array<(
      Pick<StorefrontTypes.ProductOption, 'id' | 'name'>
      & { optionValues: Array<(
        Pick<StorefrontTypes.ProductOptionValue, 'name'>
        & { swatch?: StorefrontTypes.Maybe<Pick<StorefrontTypes.ProductOptionValueSwatch, 'color'>> }
      )> }
    )>, media: { edges: Array<{ node: (
          Pick<StorefrontTypes.ExternalVideo, 'originUrl' | 'embedUrl' | 'id' | 'mediaContentType'>
          & { previewImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
            & { transformedSrc: StorefrontTypes.Image['url'], xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'], sm: StorefrontTypes.Image['url'], xs: StorefrontTypes.Image['url'] }
          )> }
        ) | (
          Pick<StorefrontTypes.MediaImage, 'id' | 'mediaContentType'>
          & { previewImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
            & { transformedSrc: StorefrontTypes.Image['url'], xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'], sm: StorefrontTypes.Image['url'], xs: StorefrontTypes.Image['url'] }
          )> }
        ) | (
          Pick<StorefrontTypes.Model3d, 'id' | 'mediaContentType'>
          & { previewImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
            & { transformedSrc: StorefrontTypes.Image['url'], xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'], sm: StorefrontTypes.Image['url'], xs: StorefrontTypes.Image['url'] }
          )> }
        ) | (
          Pick<StorefrontTypes.Video, 'id' | 'mediaContentType'>
          & { sources: Array<Pick<StorefrontTypes.VideoSource, 'url' | 'format' | 'mimeType'>>, previewImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
            & { transformedSrc: StorefrontTypes.Image['url'], xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'], sm: StorefrontTypes.Image['url'], xs: StorefrontTypes.Image['url'] }
          )> }
        ) }> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'sku' | 'availableForSale' | 'barcode'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        ) }> } }
  )> };

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type ProductRecommendationsQuery = { productRecommendations?: StorefrontTypes.Maybe<Array<(
    Pick<StorefrontTypes.Product, 'handle' | 'title' | 'description'>
    & { featuredImage?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>
      & { xl: StorefrontTypes.Image['url'], lg: StorefrontTypes.Image['url'] }
    )>, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
  )>> };

interface GeneratedQueryTypes {
  "\n#graphql\nquery getProductByHandle($handle: String!) {\n  product(handle: $handle) {\n    id\n    title\n    descriptionHtml\n    description\n    seo {\n      title\n      description\n    }\n    options {\n      id\n      name\n      optionValues {\n        name\n        swatch {\n          color\n        }\n      }\n    }\n    media(first: 50) {\n      edges {\n        node {\n          id\n          previewImage {\n            url\n            transformedSrc: url(transform: { maxHeight: 72, maxWidth: 72, crop: CENTER, preferredContentType: WEBP })\n            xl: url(transform: { maxHeight: 930, maxWidth: 930, crop: CENTER, preferredContentType: WEBP })\n            lg: url(transform: { maxHeight: 681, maxWidth: 681, crop: CENTER, preferredContentType: WEBP })\n            sm: url(transform: { maxHeight: 450, maxWidth: 450, crop: CENTER, preferredContentType: WEBP })\n            xs: url(transform: { maxHeight: 341, maxWidth: 341, crop: CENTER, preferredContentType: WEBP })\n            width\n            height\n          }\n          mediaContentType\n          ... on Video {\n            id\n            sources {\n              url\n              format\n              mimeType\n            }\n          }\n          ... on ExternalVideo {\n            originUrl\n            embedUrl\n            previewImage {\n              url\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n    variants(first: 50) {\n      edges {\n        node {\n          id\n          title\n          sku\n          availableForSale\n          barcode\n          price {\n            amount\n            currencyCode\n          }\n          image {\n            url\n            width\n            height\n          }\n          selectedOptions {\n            name\n            value\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n}": {return: GetProductByHandleQuery, variables: GetProductByHandleQueryVariables},
  "\n#graphql\nquery productRecommendations($productId: ID!) {\n  productRecommendations(productId: $productId) {\n    ...product\n  }\n}\n\n  #graphql\n  fragment product on Product {\n    handle\n    title\n    description\n    featuredImage {\n      url\n      xl: url(transform: { maxHeight: 955, maxWidth: 955, crop: CENTER, preferredContentType: WEBP })\n      lg: url(transform: { maxHeight: 318, maxWidth: 318, crop: CENTER, preferredContentType: WEBP })\n      width\n      height\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": {return: ProductRecommendationsQuery, variables: ProductRecommendationsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
