import App from "../App";
import DocumentList from "../storage/DocumentList";
import FormCreator from "../FormCreator";

export default class Router {

    static getParam(key: string): string {
        return new URLSearchParams(window.location.search.substr(1)).get(key);
    }

    static renderPageForCurrentUrl() {
        const location = window.location.pathname.substr(1);
        console.log(location)
        switch(location) {
            case 'new-document.html': new App().renderForm(this.getParam('id')); break;
            case 'document-list.html': new DocumentList().render(); break;
            case 'edit-document.html': new App().renderEditForm(this.getParam('id')); break;
            case 'new-form.html': new FormCreator().render(); break;
            case 'form-list.html': new FormCreator().renderList(); break;
        }
    }
    
}

Router.renderPageForCurrentUrl();