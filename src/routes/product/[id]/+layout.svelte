<script lang="ts">
  import Carrousel from "../../../components/Carrousel/index.svelte";
  export let data;
</script>

<slot />
<Carrousel arrayContent={data.data} />
