import Entity from "./Entity";

export default class Data {

    id: string
    formId: string
    fields: Entity[]

    constructor(id: string, formId: string, fields: Entity[]) {
        this.id = id;
        this.formId = formId;
        if (fields) this.fields = fields;
        else this.fields = []
    }

    size() {
        return this.fields.length;
    }
}