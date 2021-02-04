export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface AuthResponse {
    expiresIn?: Number;
    idToken?: string;
}

export interface Post {
    id?: string;
    title: string;
    author: string;
    text: string;
}

export interface fbCreateResponse {
    name?: string;
}