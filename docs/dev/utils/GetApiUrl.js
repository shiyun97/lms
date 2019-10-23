export const API_URL = () => {
    let url = window.location.href.split(':');
    let api_url = url[0] + ":" + url[1] + ":8080";
    return api_url;
}