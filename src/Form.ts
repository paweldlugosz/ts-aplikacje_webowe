import Field from './fields/Field';
import LocStorage from './storage/LocStorage';

export default class Form {

    fields: Field[]
    storage: LocStorage

    constructor(fields: Field[]) {
        this.fields = fields;
        this.storage = new LocStorage();
    }

    getValue(): Field[] {
        return this.fields;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
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
        this.storage.saveDocument(this.fields);
        this.openMainPage()
    }

    private openMainPage() {
        window.location.href = '../index.html';
    }
}