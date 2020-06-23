import App from "../App";
import DocumentList from "../storage/DocumentList";

export default class Router {

    static getParam(key: string): string {
        return new URLSearchParams(window.location.search.substr(1)).get(key);
    }

    static renderPageForCurrentUrl() {
        const location = window.location.pathname.substr(1);
        console.log(location)
        switch(location) {
            case 'new-document.html': new App().renderForm(); break;
            case 'form-creator.html': new App().renderForm(); break;
            case 'document-list.html': new DocumentList().render(); break;
            case 'edit-document.html': new App().renderEditForm(this.getParam('id')); break;
        }
    }
    
}

Router.renderPageForCurrentUrl();