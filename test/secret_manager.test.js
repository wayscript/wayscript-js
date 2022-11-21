const secret_manager = require("../src/secret_manager");
const utils = require("../src/utils");
const context = require("../src/context");

// Set up standard mocks
jest.mock("../src/context");
context.getProcess.mockImplementation(() => `{"lair_id": "fake_lair_id"}`);

test('Set Secret returns no info on success', () => {
    let payload = {};

    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [200, payload]);
    expect(secret_manager.setSecret("test_key", "test_value")).toEqual(payload);
});

test('Set Secret returns passed error message on 404', () => {
    let error = {error: "wayscript backend error message"};
    let result = {status: "404", json: error}
    
    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [404, error]);
    expect(() => { secret_manager.setSecret("test_key", "test_value") }).toThrow(result);
});

test('Set Secret returns unique error message on 403', () => {
    let result = {status: "403", json: {error: "user is not authorized to modify lair"}};

    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [403, {}])
    expect(secret_manager.setSecret("test_key", "test_value")).toThrow(result);
});
