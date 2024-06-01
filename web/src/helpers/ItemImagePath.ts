import { isEnvBrowser } from "../utils/misc";

export function getImagePath(name: string) {

    if (name === "") return "";

    if (isEnvBrowser()) {
        return '/images/' + name;
    }

    return 'nui://nagodo-collections/web/public/images/' + name;
}