const secret_manager = require("../src/secret_manager");

test.skip('Set Secret returns no info on success', () => {
    let payload = {};

    let spy200 = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation((url) => {
        return [200, payload];
    });
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(payload));
    spy200.mockRestore();
});

test.skip('Set Secret returns passed error message on 404', () => {
    let error = {error: "wayscript backend error message"};
    
    let spy404 = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation((url) => {
        return [404, error]
    });
    expect(() => { secret_manager.setSecret("test_key", "test_value") }).toThrow("wayscript backend error message");
    spy404.mockRestore();
});

test.skip('Set Secret returns unique error message on 403', () => {
    let error = {error: "user is not authorized to modify lair"};

    let spy403 = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation((url) => {
        return [403, {}]
    });
    expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(`{ "Success" : "False", "Status" : "403"}`));
    //expect(secret_manager.setSecret("test_key", "test_value")).toStrictEqual(JSON.parse(`{"status" : "403", "json" : ${error}"}`));
    spy403.mockRestore();
});