<script lang="ts">
  import Input from "../../../components/Inputs/index.svelte";
</script>

<section
  class="m-auto max-w-md my-12 py-8 bg-neutral-950 rounded-lg px-8 border-neutral-800 border"
>
  <h1 class="text-neutral-100 text-3xl text-center mb-8 font-medium">
    Registrar
  </h1>
  <form action="" method="post" class="flex flex-col mb-4">
    <Input id="email" aria-label="E-mail" type="email" />
    <button
      class="rounded-full bg-orange-700 py-2 px-6 mt-6 w-max ml-auto text-neutral-100"
      type="submit"
    >
      Recuperar Senha
    </button>
  </form>
  <a
    href="/auth/login"
    class="text-neutral-100 hover:underline underline-offset-4">Login</a
  >
</section>
