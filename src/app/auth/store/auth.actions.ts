import { Action } from "@ngrx/store";

export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATE_SUCCESS = 'LOGIN';
export const AUTHENTICATE_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN';


export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            email: string,
            userId: string,
            token: string,
            expirationDate: Date,
            redirect: boolean
        }
    )
    {}
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class AuthenticateFailed implements Action {
    readonly type = AUTHENTICATE_FAILED;

    constructor(public payload: string) {}
}

export class SignupStartAction implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class ClearErrorAction implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLoginAction implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | LogoutAction | LoginStart | AuthenticateFailed | SignupStartAction | ClearErrorAction | AutoLoginAction;