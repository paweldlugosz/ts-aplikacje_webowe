import LocStorage from "./LocStorage";
import Field from "../fields/Field";
import InputField from "../fields/InputField";
import Form from "../Form";

describe('LocStorage', () => {

    let storage: LocStorage;
    let fields: Field[];

    beforeAll(() => {
        storage = new LocStorage();
        fields = [
            new InputField('name', 'Enter your name', 'Roy'),
            new InputField('surname', 'Enter your surname', 'Riley'),
        ];
        fields.forEach(field => field.render());
    });

    it('Insert test', () => {
        const docId = storage.saveDocument(new Form('', '', fields));
        const dataFromDb = storage.loadDocument(docId);
        expect(dataFromDb.fields.length).toEqual(2);
    });

    it('Remove test', () => {
        const docId = storage.saveDocument(new Form('', '', fields));
        storage.removeDocument(docId);
        const documents: string[] = storage.getDocuments();
        expect(documents.find( id => id === docId)).toEqual(undefined);
    });
});