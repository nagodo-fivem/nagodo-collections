interface ITranslations {
    [key: string]: string;
}

var translations: ITranslations = {};

export function SetTranslations(newTranslations: ITranslations) {
    translations = newTranslations;
}

export function _T(key: string) {
    if (translations[key]) {
        return translations[key]
    }
    return "missing translation: " + key;
}