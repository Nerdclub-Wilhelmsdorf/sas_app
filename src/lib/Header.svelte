<script>
    import { Navbar, NavBrand, NavLi, NavUl, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { Menu} from "lucide-svelte";
    import { logout } from '../src/login.svelte';
</script>

    <Navbar color="form">
      <NavBrand href="/">
        <span class="text-xl font-semibold dark:text-white">SaS Pay</span>
      </NavBrand>
      <Menu class="no-outline outline-none" />
      <Dropdown>
        <DropdownItem
           on:click={() => {
            logout();
          }}
        >Konto zurücksetzen</DropdownItem>
        <DropdownItem>Version 0.1</DropdownItem>
      </Dropdown>
  </Navbar>

