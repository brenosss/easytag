import { getCookie } from "cookies-next";

function getProjectFromCookie() {
    const project = getCookie('project');
    if (typeof project === 'string') {
        return JSON.parse(project);
    }
    return {};
}

export { getProjectFromCookie };