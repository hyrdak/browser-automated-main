import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export const getFileURL = (path: string, scope: 'client' | 'admin'): string => {
    return `${process.env.REACT_APP_API_DOMAIN}/api/${scope}/files/download?file=${path}`;
};

export const downloadFileFromURL = (url: string, filename = '') => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
};

export const downloadBlob = ({
    blob,
    filename,
    hasUnicodeCharacter = false
}: {
    blob: Blob;
    filename?: string;
    hasUnicodeCharacter?: boolean;
}) => {
    let url: string;

    if (hasUnicodeCharacter) {
        url = window.URL.createObjectURL(new Blob(['\uFEFF' + (blob as any)]));
    } else {
        url = window.URL.createObjectURL(new Blob([blob]));
    }

    downloadFileFromURL(url, filename);
};

export const viewBlob = (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
};

export async function convertFileFromLinkToBase64(url: string) {
    const response = await fetch(url, {
        credentials: 'include'
    });
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    });
}

export const getFilenameFromHeader = (headers: AxiosResponseHeaders | RawAxiosResponseHeaders) => {
    const contentDisposition = headers?.['content-disposition'];
    const fileNameContent = contentDisposition?.split(';').find((n: string[]) => n.includes('filename='));
    const fileName = fileNameContent?.replace('filename=', '').replaceAll('"', '').trim();

    return fileName;
};

export const validatePhoneNumber = (phone: string): boolean => {
    let isValid = false;
    if (phone.length === 10) {
        isValid = new RegExp(/(^0[2-9]\d{8}$)/).test(phone);
    } else if (phone.length === 11) {
        isValid = new RegExp(/(^01\d{9}$)/).test(phone);
    }

    return isValid;
};

export const createObjectParams = (params: any, initValues = {}) => {
    const convertedParams: any = { ...initValues };
    for (const [key, value] of params.entries()) {
        const convertedKey = isNaN(Number(key)) ? key : Number(key);
        convertedParams[convertedKey] = value;
    }

    return convertedParams;
};
