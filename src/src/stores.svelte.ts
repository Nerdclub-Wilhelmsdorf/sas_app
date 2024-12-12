
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

export let inputAmount = $state({amount : ""});
export let Partner = $state({partner: ""});