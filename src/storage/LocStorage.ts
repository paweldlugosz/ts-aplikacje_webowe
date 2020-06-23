import Storage from './Storage'
import Entity from './Entity';
import Field from '../fields/Field';
import Data from './Data';

export default class LocStorage implements Storage {

    static DOCS_KEY = 'DOCS_KEY'
    private readonly documents: string[] = []

    constructor() {
        const data: string = localStorage.getItem(LocStorage.DOCS_KEY);
        if (data == null) this.documents = []
        else this.documents = JSON.parse(data);
    }

    saveDocument(fields: Field[]): string {
        const dataArray: Entity[] = [];
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            dataArray.push(new Entity(field.name, field.label, field.type, field.getValue()));
        }
        const id: string = 'document-' + Date.now();
        const jsonData: string = JSON.stringify(new Data(id, dataArray));
        console.log(jsonData)
        localStorage.setItem(id, jsonData);
        this.documents.push(id);
        const jsonDocumentsIds = JSON.stringify(this.documents);
        localStorage.setItem(LocStorage.DOCS_KEY, jsonDocumentsIds);
        return id;
    }    
    
    loadDocument(id: string): Data {
        const jsonObject = JSON.parse(localStorage.getItem(id));
        return new Data(jsonObject.id, jsonObject.fields)
    }
    getDocuments(): string[] {
        return this.documents;
    }

    removeDocument(id: string) {
        const index = this.documents.indexOf(id);
        if (index > -1) {
            this.documents.splice(index, 1);
            const jsonDocumentsIds = JSON.stringify(this.documents);
            localStorage.setItem(LocStorage.DOCS_KEY, jsonDocumentsIds);
            localStorage.removeItem(id);
        }
    }

}