const useLocalStorage = (key: string, value?: any): { value: any } => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        const data = localStorage.getItem(key);

        return {
            value: JSON.parse(data),
        };
    }
};

export default useLocalStorage;
