<script lang="ts">
  import { List, P } from "flowbite-svelte";
  import { handleBalance } from "../src/req/get_balance";
  import { onMount } from "svelte";
  import { Balance, User } from "../src/stores.svelte";
    import VirtualList from "svelte-tiny-virtual-list";
    const data = ['A', 'B', 'C', 'D', 'E', 'F' /* ... */];
</script>

<P class="mt-3 text-center" size="2xl">Kontostand: {Balance.balance}D</P>






<VirtualList width="100%" height={600} itemCount={Balance.history.length} itemSize={50}>
	<div slot="item" let:index let:style {style}>
		Letter: {Balance.history[index].amount}, Row: #{index}
	</div>
</VirtualList>