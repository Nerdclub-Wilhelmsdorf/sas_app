
//let isLoggedIn = $state(false);
export enum CurrentPage {
    Pay,
    Balance,
    QR,
    Login
}
export interface HistoryType {
    time: string,
    from: string
    to: string
    amount: string
}
export let currentPage = $state({page: CurrentPage.Pay});

export function setCurrentPage(page: CurrentPage) {
    currentPage.page = page;
}

export let User = $state({name: "urs", pin: "1234"});


export let Balance = $state({balance: "", history : [] as HistoryType[]});

export let CurrentError = $state({hasError: false, error: ""});
export let bottomBarElement: {element: HTMLElement};

export let isLoading = $state({loading: false});

export let PinInputModal = $state({open: false, pin: ""});

export let QrCodeModal = $state({open: false});

export let inputAmount = $state({amount : ""});
export let Partner = $state({partner: ""});

export let biometricsAvailable = $state({available: false});

export let biometricUnlockedAccount = $state({unlocked: false});

export const BiometricOptions = {
    // Set true if you want the user to be able to authenticate using phone password
    allowDeviceCredential: true,
    cancelTitle: "Die Funktion kann ohne Authentifizierung nicht genutzt werden.",
  
    // iOS only feature
    fallbackTitle: 'Authentifizierung fehlgeschlagen.',
  
    // Android only features
    title: 'Authentifizierung erforderlich',
    subtitle: 'Bitte authentifiziere dich um fortzufahren.',
    confirmationRequired: true,
  };