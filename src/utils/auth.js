import { _checkResponse } from "./api";

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://api.mjh-demo.jumpingcrab.com"
  : "http://localhost:3001";

export const signup = async({ name, avatar, email, password }) => {
    // register new user
    try {
        return await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, avatar, email, password })
        }).then(_checkResponse);

    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};

export const signin = async({ email, password }) => {
    // signin
    try {
        return await fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }).then(_checkResponse);

        // return Promise.reject(`Error: ${response.status}`)
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};

export const checkToken = async (token) => {
    try {
        return await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(_checkResponse);

    } catch(error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}

export const editProfile = async({ name, avatar, token }) => {
    try {
        return await fetch(`${BASE_URL}/users/me`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, avatar })
        }).then(_checkResponse);

    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};