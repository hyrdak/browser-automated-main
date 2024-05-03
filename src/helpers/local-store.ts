export const getLocalStore = (key: string): any | undefined => {
    if (!localStorage) {
        return;
    }

    const lsValue: any | null = localStorage.getItem(key);
    if (!lsValue) {
        return;
    }

    try {
        const value: any = JSON.parse(lsValue) as any;
        if (value) {
            return value;
        }
    } catch (error) {
        console.error(key + ' PARSE ERROR', error);
    }
};

export const setLocalStore = (key: string, value: any) => {
    if (!localStorage) {
        return;
    }

    try {
        const lsValue = JSON.stringify(value);
        localStorage.setItem(key, lsValue);
    } catch (error) {
        console.error(key + ' SAVE ERROR', error);
    }
};

export const removeLocalStore = (key: string) => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(key + ' REMOVE ERROR', error);
    }
};
