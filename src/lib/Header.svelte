<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { Menu} from "lucide-svelte";
    import { logout } from '../src/login.svelte';

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
  <Menu class="no-outline outline-none" on:click={handleDropdownClick} />
      <Dropdown open={dropdownOpen}>
          <DropdownItem
              on:click={() => handleItemClick(logout)}
          >Konto zurücksetzen</DropdownItem>
          <DropdownItem>Version 0.1</DropdownItem>
      </Dropdown>
</Navbar>
