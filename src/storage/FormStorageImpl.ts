import FormStorage from "./FormStorage";
import FormEntity from "./FormEntity";
import NameIdPair from "./NameIdPair";

export default class FormStorageImpl implements FormStorage {

    public static readonly  FORM_PREFIX: string = 'form';
    private forms: NameIdPair[];

    constructor() {
        const rawData = localStorage.getItem(FormStorageImpl.FORM_PREFIX + 'list');
        if (rawData == null) this.forms = [];
        else this.forms = JSON.parse(rawData);
    }

    saveForm(form: FormEntity): void {
        localStorage.setItem(form.id, JSON.stringify(form));
        this.forms.push(new NameIdPair(form.id, form.name));
        localStorage.setItem(FormStorageImpl.FORM_PREFIX + 'list', JSON.stringify(this.forms));
    }    
    
    getFormList(): NameIdPair[] {
        return this.forms;
    }

    getForm(id: string): FormEntity {
        return JSON.parse(localStorage.getItem(id));
    }

}