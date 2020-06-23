import Field from "./fields/Field";
import InputField from "./fields/InputField";
import SelectField from "./fields/SelectField";
import FieldType from "./fields/FieldType";
import FormFieldPersist from "./storage/FormFieldPersist";
import FormStorage from "./storage/FormStorage";
import FormStorageImpl from "./storage/FormStorageImpl";
import FormEntity from "./storage/FormEntity";

export default class FormCreator {

    private fieldPattern: Field[];
    private name: Field;
    private allFields: Field[][];
    private storage: FormStorage;

    constructor() {
        this.storage = new FormStorageImpl();
        this.fieldPattern = [
            new InputField('name', 'Podaj nazwę pola', ''),
            new InputField('label', 'Podaj etykietę', ''),
            new SelectField('fieldType', 'Wybierz rodzaj pola', [FieldType.Text, FieldType.MultilineText, FieldType.Email, FieldType.Date, FieldType.Checkbox]),
            new InputField('default', 'Podaj wartość domyślną', ''),
        ]
    }

    render() {
        const container = document.createElement('div');
        this.name = new InputField("formName", "Nazwa formularza", "Formularz 1");
        container.appendChild(this.name.render());
        const fieldsArea = document.createElement('div');
        container.appendChild(fieldsArea);
        fieldsArea.appendChild(this.newRow());
        const addButton = document.createElement('button');
        container.appendChild(addButton);
        addButton.innerText = 'Dodaj pole'
        addButton.addEventListener('click', () => {
            fieldsArea.appendChild(this.newRow());
        });
        const saveButton = document.createElement('button');
        saveButton.innerText = "Zapisz";
        saveButton.addEventListener('click', () => {
            this.saveForm();
        });
    }

    private newRow(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldsCopy = Object.assign([], this.fieldPattern);
        fieldsCopy.forEach(field => {
            wrapper.appendChild(field.render());
        });
        this.allFields.push(fieldsCopy);
        return wrapper;
    }

    private saveForm() {
        const fields: FormFieldPersist[] = [];
        this.allFields.forEach(row => {
            const field = new FormFieldPersist(
                row[0].getValue(),
                row[1].getValue(),
                row[2].getValue(),
                row[3].getValue()
            );
            fields.push(field);
        });
        const id = FormStorageImpl.FORM_PREFIX + Date.now();
        const form = new FormEntity(id, this.name.getValue(), fields);
        this.storage.saveForm(form);
    }
}