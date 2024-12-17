<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { Menu} from "lucide-svelte";
    import { logout } from '../src/login.svelte';
    import { CurrentPage, currentPage } from '../src/stores.svelte';

    let dropdownOpen = $state(false);

    function handleDropdownClick() {
        dropdownOpen = !dropdownOpen;
    }

    function handleItemClick(action: Function) {
        action();
        dropdownOpen = false;
    }
</script>

<Navbar color="form">
  <NavBrand href="/">
      <span class="text-xl font-semibold dark:text-white">SaS Pay</span>
  </NavBrand>
  <Menu class="no-outline outline-none" onclick={handleDropdownClick} />
      <Dropdown open={dropdownOpen}>
        {#if currentPage.page != CurrentPage.Login}
          <DropdownItem
              on:click={() => handleItemClick(logout)}
          >Konto zurücksetzen</DropdownItem>
          {/if}
          <DropdownItem>Version 0.1</DropdownItem>

      </Dropdown>
</Navbar>
