import Storage from './Storage'
import Entity from './Entity';
import Field from '../fields/Field';
import Data from './Data';
import Form from '../Form';
import FormStorage from './FormStorage';
import FormStorageImpl from './FormStorageImpl';
import FieldType from '../fields/FieldType';
import SelectField from '../fields/SelectField';

export default class LocStorage implements Storage {

    static DOCS_KEY = 'DOCS_KEY'
    private readonly documents: string[] = []
    private formStorage: FormStorage;

    constructor() {
        this.formStorage = new FormStorageImpl();
        const data: string = localStorage.getItem(LocStorage.DOCS_KEY);
        if (data == null) this.documents = []
        else this.documents = JSON.parse(data);
    }

    saveDocument(form: Form): string {
        const dataArray: Entity[] = [];
        for (let i = 0; i < form.fields.length; i++) {
            const field = form.fields[i];
            dataArray.push(new Entity(field.name, field.label, field.type, field.getValue()));
        }
        const id: string = form.id == undefined ? 'document-' + Date.now() : form.id;
        const jsonData: string = JSON.stringify(new Data(id, form.formId, dataArray));
        console.log(id)
        localStorage.setItem(id, jsonData);
        if (!this.documents.includes(id)) this.documents.push(id);
        const jsonDocumentsIds = JSON.stringify(this.documents);
        localStorage.setItem(LocStorage.DOCS_KEY, jsonDocumentsIds);
        return id;
    }    
    
    loadDocument(id: string, selection: Boolean = false): Form {
        const data: Data = JSON.parse(localStorage.getItem(id));
        const form = this.formStorage.getForm(data.formId);
        form.id = data.id;
        console.log(form);
        data.fields.forEach(element => {
            let field = form.fields.find(field => field.name == element.name);
            if (element.type == FieldType.Select && selection) {
                (field as SelectField).setSelection(element.value);
            } else {
                field.value = element.value;
            }
        });
        return form;
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