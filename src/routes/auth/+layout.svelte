<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <meta name="description" content="Pagina de autenticação" />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
  <link rel="canonical" href={$page.url.href} />
  <meta
    property="og:image"
    content="https://commerce-drop.vercel.app/_app/immutable/assets/svelte-logo.87df40b8.svg"
  />
  <meta property="og:image:width" content="107" />
  <meta property="og:image:height" content="128" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt-br" />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <meta name="twitter:title" content="Pagina de autenticação" />
  <meta name="twitter:description" content="Lista de produtos loja" />
  <meta
    name="twitter:image"
    content="https://commerce-drop.vercel.app/_app/immutable/assets/svelte-logo.87df40b8.svg"
  />
</svelte:head>

<slot />
