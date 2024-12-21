<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { Menu } from "lucide-svelte";
    import { logout } from '../src/login.svelte';
    import { CurrentPage, currentPage } from '../src/stores.svelte';

    let dropdownOpen = false;

    function handleDropdownClick(event: Event) {
        dropdownOpen = !dropdownOpen;
        (event.currentTarget as HTMLElement).blur(); // Remove focus from the button
    }

    function handleItemClick(action: Function) {

        action();
        dropdownOpen = false;
    }
    function handleVersionClick(event: Event) {
        (event.currentTarget as HTMLElement).blur();
    }
</script>

<Navbar color="form">
  <NavBrand>
      <span class="text-xl font-semibold dark:text-white">SaS Pay</span>
  </NavBrand>
  <Menu class="no-outline outline-none" onclick={handleDropdownClick} />
      <Dropdown open={dropdownOpen}>
        {#if currentPage.page != CurrentPage.Login}
          <DropdownItem
              on:click={() => handleItemClick(logout)}
          >Konto zurücksetzen</DropdownItem>
        {/if}
        <DropdownItem onclick={handleDropdownClick}>Version 0.1</DropdownItem>
      </Dropdown>
</Navbar>