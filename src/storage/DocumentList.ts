import LocStorage from './LocStorage';
import Field from '../fields/Field';
import Entity from './Entity';

export default class DocumentList {

    private readonly storage: LocStorage;

    constructor() {
        this.storage = new LocStorage();
    }

    getDocumentList(): string[] {
        return this.storage.getDocuments();
    }

    render(): HTMLElement {
        const docIds = this.getDocumentList();
        if (docIds.length == 0) {
            const p =  document.createElement('p');
            p.innerText = "Empty list";
            return p;
        }
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        for (const key in this.storage.loadDocument(docIds[0])) {
            console.log(key)
        }
        const tbody = document.createElement('tbody');
        for (const i in docIds) {
            const doc: Entity[] = this.storage.loadDocument(docIds[i]);
            const row = document.createElement('tr');
            for (const j in doc) {
                const value = document.createElement('td')
                value.innerText = doc[j].value;
                row.appendChild(value);
            }
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        return table;
    }
}

document.body.appendChild(new DocumentList().render());