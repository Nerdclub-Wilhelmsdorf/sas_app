<script lang="ts">
  import { Alert, Card, List, P } from "flowbite-svelte";
  import { handleBalance } from "../src/req/get_balance";
  import { onMount } from "svelte";
  import { Balance, User } from "../src/stores.svelte";
  import { VList } from "virtua/svelte";
    import { ChevronDown, ChevronUp } from "lucide-svelte";

  const sizes = [20, 40, 180, 77];
  const data = Balance.history
  const urs = 3;
  function formatDateTime(dateTime: string): string {
    const [datePart, timePart] = dateTime.split(' ');
    const [month, day, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return `${hours}:${minutes}, ${day}.${month}.${year}`;
  }
</script>

<style>
  .flex-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full viewport height */
  }

  .virtual-list-container {
    flex: 1; /* Take up remaining space */
    display: flex;
    flex-direction: column;
    overflow: auto; /* Ensure scrolling if content overflows */
    padding-bottom: 125px; /* Adjust this value based on the height of the BottomNav */
  }
  .vlist-wrapper {
    flex: 1; /* Take up remaining space */
  }
</style>

<div class="flex-container">
  <P class="mt-3 text-center" size="2xl">Kontostand: {Balance.balance}D</P>

  <div class="virtual-list-container">
    <div class="vlist-wrapper">
      <VList {data} style="height: 100%;" getKey={(_, i) => i}>
        {#snippet children(item, index)}
          <div>
            <Alert color="dark" class="mr-3 ml-3 mt-3 flex items-center justify-between alert-content">
              <div class="flex items-center">
                {#if (item.from == User.name)}
                <ChevronDown class="mr-3 w-8 h-8 text-red-500" />
                {:else}
                <ChevronUp class="mr-3 w-8 h-8 text-green-500" />
                {/if}
                <div class="grid mt-0 mb-0">
                  <P size="lg" class="font-bold">{item.from == User.name ? item.to : item.from}</P>
                  <P size="sm" class="font-normal">{formatDateTime(item.time)}</P>
                </div>
              </div>
              <P size="2xl" class="font-bold text-right">{item.from == User.name ? "-" : "+"}{item.amount}D</P>
            </Alert>
          </div>
        {/snippet}
      </VList>
    </div>
  </div>
</div>