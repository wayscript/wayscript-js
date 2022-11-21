const secret_manager = require("../src/secret_manager");
const utils = require("../src/utils");
const context = require("../src/context");

// Set up standard mocks
jest.mock("../src/utils");
jest.mock("../src/context");
context.getProcess.mockImplementation(() => `{"lair_id": "fake_lair_id"}`)

test('Set Secret returns no info on success', () => {
    let payload = {};

    let client = new utils.WayScriptClient()
    client.setLairSecret.mockImplementationOnce(() => [200, payload])
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(payload));
});

test('Set Secret returns passed error message on 404', () => {
    let error = {error: "wayscript backend error message"};
    
    let client = new utils.WayScriptClient()
    client.setLairSecret.mockImplementationOnce(() => [404, error])
    expect(() => { secret_manager.setSecret("test_key", "test_value") }).toThrow("wayscript backend error message");
});

test('Set Secret returns unique error message on 403', () => {
    //let error = {error: "user is not authorized to modify lair"};

    let client = new utils.WayScriptClient()
    client.setLairSecret.mockImplementationOnce(() => [403, {}])
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(`{ "Success" : "False", "Status" : "403"}`));
});
