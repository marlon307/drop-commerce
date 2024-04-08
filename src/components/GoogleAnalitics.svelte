<script>
  // @ts-ignore
  import { onMount } from "svelte";
  onMount(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // @ts-ignore
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-T13EQM11L4");
  });
</script>

<!-- Google tag (gtag.js) -->
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T13EQM11L4">
  </script>
</svelte:head>
