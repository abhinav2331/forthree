//const TOKEN_KEY = sessionStorage.getItem ;

var token = sessionStorage.accessToken;

export const isLogin = () => {
    if (sessionStorage.currentUserToken) {
        return true;
    }

    return false;
}

