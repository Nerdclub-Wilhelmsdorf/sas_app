
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