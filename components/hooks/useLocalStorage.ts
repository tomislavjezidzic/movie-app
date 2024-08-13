interface Data {
    key: string;
    set?: boolean;
    value?: any;
}

const useLocalStorage = (key, set = false, value) => {
    if (set) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        const data = localStorage.getItem(key);

        return {
            value: JSON.parse(data),
        };
    }
};

export default useLocalStorage;
