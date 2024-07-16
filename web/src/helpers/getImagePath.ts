import { isEnvBrowser } from "../utils/misc";

export default function getImagePath(name: string) {

    if (name === "") return "";

    function validateImage(image: string) {

        if (image === undefined) return false;

        if (image.match('http')) {
            return true;
        } else {
            return false;
        }
    }

    if (validateImage(name) === true) {
        return name;
    }

    if (isEnvBrowser()) {
        return '/images/' + name;
    }

    return 'nui://nagodo-collections/web/public/images/' + name;
}