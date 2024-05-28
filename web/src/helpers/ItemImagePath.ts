import { isEnvBrowser } from "../utils/misc";

export function getImagePath(name: string) {

    if (name === "") return "";

    if (isEnvBrowser()) {
        return '/images/' + name + '.png';
    }

    return 'nui://xx-inventory/web/public/images/' + name + '.png';
}