import Cookies from 'js-cookie';

// verificando se usuário está logado (se possui um cookie salvo com seus dados)
export const isLogged = () => {
    let user = Cookies.get('user');
    return (user) ? true : false;
}

// fazendo login do usuário (salvando novo cookie)
export const doLogin = (token, id, name, email) => {
    Cookies.set('user', {
        token,
        id,
        name,
        email
    }, { expires: 1 });
}

// retornando informações salvas no cookie.
export const getCookieUser = () => {
    return Cookies.getJSON('user');
}

// fazendo logout
export const doLogout = () => {
    Cookies.remove('user');
}