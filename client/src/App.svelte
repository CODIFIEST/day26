<script lang="ts">
  import DisplayList from "./components/DisplayList.svelte";
import InputFields from "./components/InputFields.svelte";
  import ModalButton from "./components/ModalButton.svelte";
</script>

<ModalButton />

<InputFields />

<DisplayList />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
