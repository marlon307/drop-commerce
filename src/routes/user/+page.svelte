<script lang="ts">
  import Input from "../../components/Inputs/index.svelte";
  export let data;

  let infoUser = {
    name: `${data.customer.firstName} ${data.customer.lastName}`,
    email: data.customer.email,
    phone: data.customer.phone,
    acceptsMarketing: data.customer.acceptsMarketing,
  };
</script>

<form action="?/user" method="POST" class="w-full">
  <Input
    id="name"
    name="name"
    placeholder="Nome"
    aria-label="Nome"
    bind:value={infoUser.name}
    required
  />
  <fieldset class="flex flex-col md:flex-row md:gap-6 mb-4">
    <Input
      id="email"
      name="email"
      placeholder="email-@email.com"
      aria-label="E-mail"
      type="email"
      bind:value={infoUser.email}
      required
    />
    <Input
      id="tel"
      type="tel"
      name="tel"
      placeholder="Telefone"
      aria-label="Telefone"
      bind:value={infoUser.phone}
      required
    />
  </fieldset>
  <label for="accept" class="flex items-baseline gap-2 cursor-pointer">
    <input
      type="checkbox"
      name="prom_accept"
      id="accept"
      class="rounded focus:ring-indigo-600"
      bind:checked={infoUser.acceptsMarketing}
    />
    <span class="text-neutral-100">
      Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
    </span>
  </label>
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
