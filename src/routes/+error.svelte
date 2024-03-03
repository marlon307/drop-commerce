<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.error?.message} - {$page.status}</title>
</svelte:head>

<h1
  class="mx-auto mt-[20vh] w-fit max-w-xl text-center text-4xl font-bold text-neutral-50 md:text-7xl"
>
  Ops!
</h1>
<div class="mb-4 mt-8 flex w-full items-center justify-center">
  <div
    class="animate-glitch text-6xl font-medium text-blue-600"
    title={String($page.status)}
  >
    {$page.status}
  </div>
</div>
<span class="mx-auto block text-center text-xl font-medium text-neutral-50">
  {#if $page.status < 500}
    Página Não Encontrada
  {:else}
    Falha nossa
  {/if}
</span>
<a
  href="/"
  class="mx-auto mt-14 block text-center text-neutral-50 hover:underline"
>
  Voltar ao início
</a>

<!-- https://codepen.io/pgalor/pen/OeRWJQ -->

<style lang="postcss">
  .animate-glitch {
    animation: glitch 1s linear infinite;
  }
  @keyframes glitch {
    2%,
    64% {
      transform: translate(2px, 0) skew(0deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }
  .animate-glitch:before,
  .animate-glitch:after {
    content: attr(title);
    position: absolute;
    left: 0;
  }
  .animate-glitch:before {
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }
  @keyframes glitchTop {
    2%,
    64% {
      transform: translate(2px, -2px);
    }
    4%,
    60% {
      transform: translate(-2px, 2px);
    }
    62% {
      transform: translate(13px, -1px) skew(-13deg);
    }
  }
  .animate-glitch:after {
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }
  @keyframes glitchBotom {
    2%,
    64% {
      transform: translate(-2px, 0);
    }
    4%,
    60% {
      transform: translate(-2px, 0);
    }
    62% {
      transform: translate(-22px, 5px) skew(21deg);
    }
  }
</style>
