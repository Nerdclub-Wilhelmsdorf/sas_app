<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { Menu} from "lucide-svelte";
</script>

    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
<Navbar>
    <NavBrand href="/">
      <span class="text-xl font-semibold dark:text-white">SaS Pay</span>
    </NavBrand>

    <NavHamburger />
    <NavUl>
      <NavLi class="cursor-pointer">
        <Menu  class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem href="/">Konto zurücksetzen</DropdownItem>
        <DropdownItem href="/">Version 0.0.1</DropdownItem>
      </Dropdown>
    </NavUl>
  </Navbar>
  


