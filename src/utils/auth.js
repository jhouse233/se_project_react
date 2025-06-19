const BASE_URL = 'http://localhost:3001';

export const signup = async({ name, avatar, email, password }) => {
    // register new user
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, avatar, email, password })
        });

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Error: ${response.status}`)
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};

export const signin = async({ email, password }) => {
    // signin
    try {
        const response = await fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Error: ${response.status}`)
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};

export const checkToken = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Error ${response.status}`);
    } catch(error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}

export const editProfile = async({ name, avatar, token }) => {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, avatar })
        });

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Error: ${response.status}`)
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
};