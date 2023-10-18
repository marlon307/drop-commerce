<script lang="ts">
  import Input from "../../../components/Inputs/index.svelte";
</script>

<svelte:head>
  <title>Registrar-se</title>
</svelte:head>

<section
  class="m-auto max-w-md my-12 py-8 bg-neutral-950 rounded-lg px-8 border-neutral-800 border"
>
  <h1 class="text-neutral-100 text-3xl text-center mb-8 font-medium">
    Registrar
  </h1>
  <form method="POST" action="?/register" class="flex flex-col mb-4">
    <Input
      id="name"
      aria-label="Nome e Sobrenome"
      placeholder="Nome e Sobrenome"
      required
      type="text"
      name="name"
    />
    <Input
      id="tel"
      aria-label="Telefone"
      type="tel"
      name="tel"
      placeholder="Telefone"
      required
    />
    <Input
      id="email"
      aria-label="E-mail"
      placeholder="email@email.com"
      type="email"
      name="email"
      required
    />
    <Input
      id="psw"
      aria-label="Senha"
      placeholder="Senha"
      type="password"
      name="password"
      required
    />
    <Input
      id="cpsw"
      aria-label="Confirme a Senha"
      type="password"
      name="confirmpsw"
      placeholder="Confirme sua senha"
      required
    />
    <label for="accept" class="flex items-baseline gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="prom_accept"
        id="accept"
        class="rounded focus:ring-indigo-600"
      />
      <span class="text-neutral-100">
        Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
      </span>
    </label>
    <button
      class="rounded-full bg-orange-700 py-2 px-6 mt-6 w-max text-neutral-100 ml-auto"
      type="submit"
    >
      Registre-se
    </button>
  </form>
  <a
    href="/auth/login"
    class="text-neutral-100 hover:underline underline-offset-4">Login</a
  >
</section>
