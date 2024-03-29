const secret_manager = require("../src/secret_manager");
const utils = require("../src/utils");
const context = require("../src/context");

// Set up standard mocks
jest.mock("../src/context");
context.getProcess.mockImplementation(() => `{"lair_id": "fake_lair_id"}`);

test('Set Secret returns no info on success', () => {
    const payload = {};

    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [200, payload]);
    expect(secret_manager.setSecret("test_key", "test_value")).toEqual(payload);
});

test('Set Secret returns passed error message on 404', () => {
    const error = {error: "wayscript backend error message"};
    const result = {status: "404", json: error};
    
    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [404, error]);
    try {
        secret_manager.setSecret("test_key", "test_value");
    } catch (err) {
        expect(err).toEqual(JSON.stringify(result));
        return;  // short circuit
    }
    expect(true).toEqual(false);  // fail if no error thrown
});

test('Set Secret returns unique error message on 403', () => {
    const result = {status: "403", json: {error: "user is not authorized to modify lair"}};

    jest.spyOn(utils.WayScriptClient.prototype, "setLairSecret").mockImplementationOnce(() => [403, {}]);
    try {
        secret_manager.setSecret("test_key", "test_value");
    } catch(err) {
        expect(err).toEqual(JSON.stringify(result));
        return;  // short circuit
    }
    expect(true).toEqual(false);  // fail if no error thrown
});
