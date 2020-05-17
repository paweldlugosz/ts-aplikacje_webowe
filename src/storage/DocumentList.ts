import LocStorage from './LocStorage';
import Data from './Data';

export default class DocumentList {

    private readonly storage: LocStorage;
    private documents: Data[];

    constructor() {
        this.storage = new LocStorage();
        this.documents = []
        const documentsId = this.getDocumentList();
        for (const index in documentsId) {
            this.documents.push(this.storage.loadDocument(documentsId[index]))
        }
    }

    getDocumentList(): string[] {
        return this.storage.getDocuments();
    }

    removeDocument(id: string) {
        this.storage.removeDocument(id);
    }

    render(): HTMLElement {
        if (this.documents.length == 0) {
            const p =  document.createElement('p');
            p.innerText = "Empty list";
            return p;
        }
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        for (const i in this.documents) {
            const doc = this.documents[i];
            const row = document.createElement('tr');
            for (let j = 0; j < doc.size(); j++) {
                const value = document.createElement('td')
                value.innerText = doc.fields[j].value;
                row.appendChild(value);
            }
            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete'
            deleteButton.addEventListener('click', () => {
                this.removeDocument(doc.id)
                tbody.removeChild(row);
            });
            row.appendChild(deleteButton)
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        return table;
    }
}

document.body.appendChild(new DocumentList().render());