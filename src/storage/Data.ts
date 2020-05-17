import Entity from "./Entity";

export default class Data {

    id: string
    fields: Entity[]

    constructor(id: string, fields: Entity[]) {
        this.id = id;
        if (fields) this.fields = fields;
        else this.fields = []
    }

    size() {
        return this.fields.length;
    }
}