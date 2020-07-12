import FormStorage from "./FormStorage";
import FormEntity from "./FormEntity";
import NameIdPair from "./NameIdPair";
import Form from "../Form";
import Field from "../fields/Field";
import InputField from "../fields/InputField";
import FieldType from "../fields/FieldType";
import CheckboxField from "../fields/CheckboxField";
import DateField from "../fields/DateField";
import EmailField from "../fields/EmailField";
import TextAreaField from "../fields/TextAreaField";
import SelectField from "../fields/SelectField";

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

    getForm(id: string): Form {
        const data: FormEntity = JSON.parse(localStorage.getItem(id));
        const fields: Field[] = data.fields.map(element => {
            switch (element.type) {
                case FieldType.Checkbox:
                    return new CheckboxField(element.name, element.label, element.value);
                case FieldType.Date: 
                    return new DateField(element.name, element.label, element.value);
                case FieldType.Email: 
                    return new EmailField(element.name, element.label, element.value);
                case FieldType.MultilineText: 
                    return new TextAreaField(element.name, element.label, element.value);
                case FieldType.Select: 
                    return new SelectField(element.name, element.label, element.value);
                case FieldType.Text: 
                    return new InputField(element.name, element.label, element.value);
            }
        });
        return new Form(data.id, data.name, fields)
    }

}