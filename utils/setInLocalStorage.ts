'use client'

export const setInLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window === 'undefined') {
        return null; // or return a default value
    }
    return localStorage.getItem(key);
};