<script lang="ts">
  import DisplayList from "./components/DisplayList.svelte";
    import Header from "./components/Header.svelte";
import InputFields from "./components/InputFields.svelte";
  import ModalButton from "./components/ModalButton.svelte";

</script>
<div class="card w-960 bg-base-100 shadow-xl">
<Header />

<ModalButton />

<InputFields />

<DisplayList />
</div>
<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
