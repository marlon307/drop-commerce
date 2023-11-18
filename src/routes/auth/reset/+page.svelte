<script lang="ts">
  import Input from "$components/Inputs/index.svelte";
</script>

<svelte:head>
  <title>Solicitar alteração de senha</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-8"
>
  <h1 class="mb-8 text-center text-3xl font-medium text-neutral-100">
    Mudar Senha
  </h1>
  <form action="" method="post" class="mb-4 flex flex-col">
    <Input id="email" aria-label="E-mail" type="email" />
    <button
      class="ml-auto mt-6 w-max rounded-full bg-blue-600 px-6 py-2 text-blue-50 hover:opacity-95"
      type="submit"
    >
      Soliciatar alteração da senha
    </button>
  </form>
  <a href="/auth/login" class="text-blue-500 underline-offset-4 hover:underline"
    >Login</a
  >
</section>
