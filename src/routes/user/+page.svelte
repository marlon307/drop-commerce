<script lang="ts">
  import Input from "../../components/Inputs/index.svelte";
</script>

<form action="" method="post" class="w-full">
  <Input id="name" name="name" placeholder="Nome" aria-label="Nome" />
  <fieldset class="flex gap-6 mb-4">
    <Input
      id="email"
      name="email"
      placeholder="email-@email.com"
      aria-label="E-mail"
    />
    <Input id="doc" name="doc" placeholder="000.000.000-00" aria-label="CPF" />
  </fieldset>
  <button
    type="submit"
    class="bg-orange-500 px-6 py-2 rounded-full float-right text-orange-50"
  >
    Salvar
  </button>
  <a
    href="/auth/reset"
    class="text-neutral-100 hover:underline underline-offset-4">Alterar senha</a
  >
</form>
