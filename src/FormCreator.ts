import Field from "./fields/Field";
import InputField from "./fields/InputField";
import SelectField from "./fields/SelectField";
import FieldType from "./fields/FieldType";
import FormFieldPersist from "./storage/FormFieldPersist";
import FormStorage from "./storage/FormStorage";
import FormStorageImpl from "./storage/FormStorageImpl";
import FormEntity from "./storage/FormEntity";

export default class FormCreator {

    private name: Field;
    private allFields: Field[][];
    private storage: FormStorage;

    constructor() {
        this.allFields = [];
        this.storage = new FormStorageImpl();
        this.name = new InputField("formName", "Nazwa formularza", "Formularz: " + Date.now());
    }

    renderList() {
        const forms = this.storage.getFormList();
        if (forms.length == 0) {
            const p = document.createElement('p');
            p.innerText = 'Lista jest pusta';
            document.body.appendChild(p);
        }
        const wrapper = document.createElement('div');
        for (const i in forms) {
            const form = forms[i];
            const row = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.innerText = form.name;
            row.appendChild(h2);
            const editButton = document.createElement('button')
            editButton.innerText = 'Wypełnij'
            editButton.addEventListener('click', () => {
                window.location.href = '../new-document.html?id=' + form.id;
            });
            row.appendChild(editButton)
            wrapper.appendChild(row);
        }
        document.body.appendChild(wrapper);
    }

    render() {
        const container = document.createElement('div');
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
        container.appendChild(saveButton);
        saveButton.innerText = "Zapisz";
        saveButton.addEventListener('click', () => {
            this.saveForm();
            window.location.href = '../index.html'
        });
        document.body.appendChild(container);
    }

    private newRow(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldPattern = this.fieldPattern();   
        fieldPattern.forEach(field => {
            wrapper.appendChild(field.render());
        });
        this.allFields.push(fieldPattern);
        return wrapper;
    }

    private fieldPattern(): Field[] {
        return [
            new InputField('name', 'Podaj nazwę pola', ''),
            new InputField('label', 'Podaj etykietę', ''),
            new SelectField('fieldType', 'Wybierz rodzaj pola', [FieldType.Text, FieldType.MultilineText, FieldType.Email, FieldType.Date, FieldType.Checkbox, FieldType.Select]),
            new InputField('default', 'Podaj wartość domyślną', ''),
        ]
    }

    private saveForm() {
        const fields: FormFieldPersist[] = [];
        this.allFields.forEach(row => {
            let value = row[3].getValue();
            if (row[2].type == FieldType.Select) {
                value = value.split(",");
            }
            const field = new FormFieldPersist(
                row[0].getValue(),
                row[1].getValue(),
                row[2].getValue(),
                value
            );
            fields.push(field);
        });
        const id = FormStorageImpl.FORM_PREFIX + Date.now();
        const form = new FormEntity(id, this.name.getValue(), fields);
        this.storage.saveForm(form);
    }
}