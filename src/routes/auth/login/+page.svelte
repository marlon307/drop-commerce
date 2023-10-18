<script lang="ts">
  import Input from "../../../components/Inputs/index.svelte";
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="m-auto max-w-md my-12 py-8 bg-neutral-950 rounded-lg px-8 border-neutral-800 border"
>
  <h1 class="text-neutral-100 text-3xl text-center mb-8 font-medium">Login</h1>
  <form action="?/login" method="post" class="flex flex-col mb-8">
    <Input
      id="email"
      aria-label="E-mail"
      type="email"
      placeholder="Nome e Sobrenome"
      required
      name="email"
    />
    <Input
      id="psw"
      aria-label="Senha"
      type="password"
      name="password"
      placeholder="Senha"
      required
    />
    <button
      class="rounded-full bg-orange-700 py-2 px-6 mt-6 w-max ml-auto text-neutral-100"
      type="submit"
    >
      Entrar
    </button>
  </form>
  <div class="flex justify-between">
    <a
      href="/auth/register"
      class="text-neutral-100 hover:underline underline-offset-4">Registrar</a
    >
    <a
      href="/auth/reset"
      class="text-neutral-100 hover:underline underline-offset-4"
      >Esqueceu a senha</a
    >
  </div>
</section>
