import FormFieldPersist from "./FormFieldPersist"

export default class FormEntity {

    id: string;
    name: string;
    fields: FormFieldPersist[];

    constructor(id: string, name: string, fields: FormFieldPersist[]) {
        this.id = id;
        this.name = name;
        this.fields = fields;
    }
}