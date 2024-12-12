//let isLoggedIn = $state(false);
export enum CurrentPage {
    Pay,
    Balance,
    QR,
    Login
}

export let currentPage = $state({page: CurrentPage.Login});

export function setCurrentPage(page: CurrentPage) {
    currentPage.page = page;
}

export let User = $state({name: "urs", pin: "1234"});