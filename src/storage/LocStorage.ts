import Storage from './Storage'
import Entity from './Entity';
import Field from '../fields/Field';

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
            dataArray.push(new Entity(field.name, field.getValue()));
        }
        const id: string = 'document-' + Date.now();
        const jsonData: string = JSON.stringify(dataArray);
        console.log(jsonData)
        localStorage.setItem(id, jsonData);
        this.documents.push(id);
        const jsonDocumentsIds = JSON.stringify(this.documents);
        localStorage.setItem(LocStorage.DOCS_KEY, jsonDocumentsIds);
        return id;
    }    
    
    loadDocument(id: string): Entity[] {
        return JSON.parse(localStorage.getItem(id));
    }
    getDocuments(): string[] {
        return this.documents;
    }

}