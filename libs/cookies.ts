import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const SECONDS_TO_30_DAYS = 60 * 60 * 24 * 30; // seconds * minutes * hours * days

export const list = {
    consent: 'consent',
    locale: 'NEXT_LOCALE',
    a11yOptions: 'a11yOptions',
};

export const setCookie = (key: string, value: string, maxAge: number = SECONDS_TO_30_DAYS) =>
    list[key]
        ? cookies.set(list[key], value, { path: '/', maxAge })
        : console.error(`Cookie ${key} not present in the list.`);

export const getCookie = (key: string) =>
    list[key] ? cookies.get(list[key]) : console.error(`Cookie ${key} not present in the list.`);

export const removeCookie = (key: string) => cookies.remove(key);

export const removeCookies = (keys: string[]) =>
    keys.forEach(item => cookies.remove(item, { path: '/' }));

export default cookies;
