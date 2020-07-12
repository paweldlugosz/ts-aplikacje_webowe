import LocStorage from './LocStorage';
import Data from './Data';
import Form from '../Form';

export default class DocumentList {

    private readonly storage: LocStorage;
    private documents: Form[];

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

    render() {
        if (this.documents.length == 0) {
            const p = document.createElement('p');
            p.innerText = 'Lista jest pusta';
            document.body.appendChild(p);
        }
        const wrapper = document.createElement('div');
        for (const i in this.documents) {
            const doc = this.documents[i];
            const row = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.innerText = "Document id: " + doc.id;
            row.appendChild(h2);
            for (let j = 0; j < doc.fields.length; j++) {
                const value = document.createElement('div')
                const field = doc.fields[j];
                value.innerText = field.name + ": " + field.value;
                row.appendChild(value);
            }
            const editButton = document.createElement('button')
            editButton.innerText = 'Edytuj'
            editButton.addEventListener('click', () => {
                window.location.href = '../edit-document.html?id=' + doc.id;
            });
            row.appendChild(editButton)
            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Usuń'
            deleteButton.addEventListener('click', () => {
                this.removeDocument(doc.id)
                wrapper.removeChild(row);
            });
            row.appendChild(deleteButton)
            wrapper.appendChild(row);
        }
        document.body.appendChild(wrapper);
    }
}