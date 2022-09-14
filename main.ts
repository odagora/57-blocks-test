type User = {
    email: string;
    password: string;
    login: boolean;
}

const loginForm: HTMLFormElement = document.querySelector('form')!;
const loginButton: HTMLButtonElement = document.querySelector('button')!;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUser();
})

function getUsers(){
    const user: string = localStorage.getItem('users') || "";
    let users: User[] | string = [];

    user ? users = user : users = [];

    return users;
}

function saveUser(){
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const email: string = loginForm.email.value;
    const validEmail: boolean = expression.test(email);
    const password: string = loginForm.password.value;
    const loggedUsers: User[] | string = getUsers();
    let login = false;

    if ((loggedUsers as any[]).some(user => user.email== email)) {
        alert("duplicate data");
    } else {
        (loggedUsers as any[]).push({
            "email": validEmail,
            "password": password,
            "login": !login,
        });

        localStorage.setItem('users', JSON.stringify(loggedUsers));
        login = true;
        window.location.href = "home.html";
    }
}
(function loadPage(){
    const users = getUsers();
    console.log("Hello")
    if (users.length === 0) {
        return;
    } else {
        if (JSON.parse(users as string)[0].login === true) {
            window.location.href = "home.html";
        } else {
            return;
        }
    }
})();