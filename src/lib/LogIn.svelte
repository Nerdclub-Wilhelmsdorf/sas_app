<script>
    import { Button, Heading, Input, P, Toast } from "flowbite-svelte";
    import { CurrentError, CurrentPage, currentPage, isLoading, isLoggedIn, loginData, QrCodeModal, User } from "../src/stores.svelte";
    import { QrCodeIcon } from "lucide-svelte";
    import { handleVerify, storeCredentials } from "../src/login.svelte";
    import toast, { Toaster } from "svelte-5-french-toast";
    //import { verifyRequest } from "../src/login.svelte";
    let canContinue = $state(false);
    $effect(() => {
        if (loginData.name == "" || loginData.pin == "") {
            canContinue = false;
        } else {
            if (isNaN(Number(loginData.pin))) {
                canContinue = false;
            } else {
                if (loginData.pin.length == 4) {
                    canContinue = true;
                } else {
                    canContinue = false;
                }
            }
        }
    });
    async function handleContinue() {
        isLoading.loading = true;
        let [success, error] = await handleVerify(loginData.name, loginData.pin);
        if (!success) {
            isLoading.loading = false;
            CurrentError.error = error;
            CurrentError.hasError = true;
            isLoading.loading = false;
            return;
        }
        if (success) {
            User.name = loginData.name;
            User.pin = loginData.pin;
            await storeCredentials(loginData.name, loginData.pin);
            loginData.name = "";
            loginData.pin = "";
            isLoading.loading = false;
            isLoggedIn.loggedIn = true;
            currentPage.page = CurrentPage.Pay;
            toast.success("Erfolgreich angemeldet.");
        }
    }
</script>
<Toaster />
<Heading tag="h2" class="mt-4 mb-1 text-center" customSize="text-3xl font-bold">Wilkommen.</Heading>
<P class="text-center">Bitte Melde dich an, um fort zu fahren.</P>

<P class="mb-2 mt-10 ml-10" size="lg">Kontonummer</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            placeholder="Deine Kontonummer"
            required
            on:keypress={async (event) => {
                if (event.key === 'Enter') {
                    await handleContinue();
                }
            }}
            bind:value={loginData.name}
            class="mr-2 ml-10"
            size = "lg"
            autocomplete="one-time-code"
        />
  <button
    class="h-6 mr-10 text-primary-500"
    style="outline: none; box-shadow: none; border: none; cursor: pointer;"
    onclick={async () => {
        QrCodeModal.disableScan = false;
        QrCodeModal.open = true;
    }}
      >
    <QrCodeIcon size={26} />
</button>
    </div>
</div>

<P class="mb-2 mt-5 ml-10" size="lg">PIN</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value="{loginData.pin}"
            placeholder="Deine 4-stellige PIN"
            required
            size="lg"
            class="ml-10"
            type="password"
            on:keypress={async (event) => {
                if (event.key === 'Enter') {
                    await handleContinue();
                }
            }}
            style="margin-right: 4.66rem"
            autocomplete="one-time-code"
        />
    </div>
</div>


<div class="grid justify-center items-center" style="position: fixed; bottom: 20%; width: 100%;">
    <Button class="mb-10 py-6 px-24 text-2xl rounded-full" on:click={async () => {
        await handleContinue();
    }} size="lg" disabled={!canContinue}>Weiter</Button>
</div>
