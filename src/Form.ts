import Field from './fields/Field';
import LocStorage from './storage/LocStorage';
import Storage from './storage/Storage'

export default class Form {

    id: string;
    formId: string;
    name: string;
    fields: Field[]
    storage: Storage

    constructor(formId: string, name: string, fields: Field[]) {
        this.formId = formId;
        this.fields = fields;
        this.name = name;
        this.storage = new LocStorage();
    }

    getValue(): Field[] {
        return this.fields;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        console.log(this.fields);
        for (let i = 0; i < this.fields.length; i++) {
            wrapper.appendChild(this.fields[i].render())
        }
        const backButton: HTMLButtonElement = document.createElement('button');
        backButton.innerText = 'Wstecz';
        backButton.addEventListener('click', () => this.openMainPage() );
        wrapper.appendChild(backButton);
        const saveButton: HTMLButtonElement = document.createElement('button');
        saveButton.innerText = 'Zapisz';
        saveButton.addEventListener('click', () => this.save() );
        wrapper.appendChild(saveButton);
        return wrapper;
    }

    save() {
        this.storage.saveDocument(this);
        this.openMainPage()
    }

    private openMainPage() {
        window.location.href = '../index.html';
    }
}