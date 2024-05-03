import { LocalStoreKey } from 'constants-es/local-store';

import { getLocalStore, removeLocalStore, setLocalStore } from './local-store';

const getAuth = (): any => {
    return getLocalStore(LocalStoreKey.AuthLocalStoreKey);
};

const setAuth = (auth: any) => {
    return setLocalStore(LocalStoreKey.AuthLocalStoreKey, auth);
};

const removeAuth = () => {
    return removeLocalStore(LocalStoreKey.AuthLocalStoreKey);
};

const getUser = () => {
    return getLocalStore(LocalStoreKey.UserLocalStoreKey);
};

const setUser = (user:any) => {
    return setLocalStore(LocalStoreKey.UserLocalStoreKey, user);
};

const removeUser = () => {
    return removeLocalStore(LocalStoreKey.UserLocalStoreKey);
};

const getCompany = (): any | undefined => {
    return getLocalStore(LocalStoreKey.CompanyLocalStoreKey);
};

const setCompany = (id: any) => {
    return setLocalStore(LocalStoreKey.CompanyLocalStoreKey, id);
};
const removeCompany = () => {
    removeLocalStore(LocalStoreKey.CompanyLocalStoreKey);
};
const setPreviousUrl = (url: string) => {
    if (url === '403' || url === '404' || url === '500') {
        return setLocalStore(LocalStoreKey.PreviousUrl, "/");
    }

    return setLocalStore(LocalStoreKey.PreviousUrl, url);
};
const getPreviousUrl = () => {
    return getLocalStore(LocalStoreKey.PreviousUrl);
};
const removePreviousUrl = () => {
    removeLocalStore(LocalStoreKey.PreviousUrl);
};

export {
    getAuth,
    getCompany,
    getPreviousUrl,
    getUser,
    removeAuth,
    removeCompany,
    removePreviousUrl,
    removeUser,
    setAuth,
    setCompany,
    setPreviousUrl,
    setUser
};
