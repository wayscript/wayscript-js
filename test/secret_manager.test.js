const secret_manager = require("../src/secret_manager");
const utils = require("../src/utils");
const context = require("../src/context");

// Set up standard mocks
jest.mock("utils");
jest.mock("context");
context.getProcess.mockImplementation(() => `{"lair_id": "fake_lair_id"}`)

test.skip('Set Secret returns no info on success', () => {
    let payload = {};

    let client = new utils.WayScriptClient()
    client.setLairSecret.mockImplementationOnce(() => [200, payload])
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(payload));
});
/*
test.skip('Set Secret returns passed error message on 404', () => {
    let error = {error: "wayscript backend error message"};
    
    let spy404 = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation(() => {
        return [404, error]
    });
    expect(() => { secret_manager.setSecret("test_key", "test_value") }).toThrow("wayscript backend error message");
    spy404.mockRestore();
});

test.skip('Set Secret returns unique error message on 403', () => {
    let error = {error: "user is not authorized to modify lair"};

    let spy403 = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation(() => {
        return [403, {}]
    });
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(`{ "Success" : "False", "Status" : "403"}`));
    //expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(`{"status" : "403", "json" : ${error}"}`));
    spy403.mockRestore();
});
*/