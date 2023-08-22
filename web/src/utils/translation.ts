interface Translation {
    [key: string]: string;
}

let translations: Translation = {};

export function setTranslations(newTranslations: Translation) {
    translations = newTranslations;
}
    

export function _T(str: string) {
    return translations[str] || str;
}