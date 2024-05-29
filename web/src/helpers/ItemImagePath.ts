import { isEnvBrowser } from "../utils/misc";

export function getImagePath(name: string) {

    if (name === "") return "";

    if (isEnvBrowser()) {
        return '/images/' + name;
    }

    return 'nui://xx-inventory/web/public/images/' + name;
}