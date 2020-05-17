export default class Router {

    static getParam(key: string): string {
        return new URLSearchParams(window.location.search.substr(1)).get(key);
    }
    
}