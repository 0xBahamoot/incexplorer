export const STORAGE_KEYS = {
    DECIMAL_SEPARATOR: '$decimal_separator',
};

export const DECIMAL_SEPARATOR = '.';
export const GROUP_SEPARATOR = ',';

export const Storage = {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    },
    getItem(key: string) {
        const result = localStorage.getItem(key);
        return result || null;
    },
    removeItem(key: string) {
        localStorage.removeItem(key);
    },
};

export const saveLocalDecimalSeparator = (separator: string) => {
    return Storage.setItem(STORAGE_KEYS.DECIMAL_SEPARATOR, separator);
};

export const getLocalDecimalSeparator = () => {
    return Storage.getItem(STORAGE_KEYS.DECIMAL_SEPARATOR) || DECIMAL_SEPARATOR;
};
