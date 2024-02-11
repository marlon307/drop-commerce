<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <meta name="description" content="Pagina de autenticação - Big Uti" />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
  <link rel="canonical" href={$page.url.href} />
  <meta property="og:image" content="/favicon.ico" />
  <meta property="og:image:width" content="107" />
  <meta property="og:image:height" content="128" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt-br" />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <meta name="twitter:title" content="Pagina de autenticação - Big Uti" />
  <meta name="twitter:description" content="Pagina de autenticação - Big Uti" />
  <meta name="twitter:image" content="/favicon.ico" />
</svelte:head>

<slot />
