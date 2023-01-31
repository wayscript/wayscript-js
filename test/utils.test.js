const utils = require("../src/utils");

let wayscriptClient = new utils.WayScriptClient();


test('Build Process Endpoint URL', () => {
    let id = "d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe";
    expect(wayscriptClient.buildURLEndpoint("processes","detail_expanded",{"id":id})).toBe("https://api.wayscript.com/processes/d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe/detail");
});

test('Build Lair Endpoint URL', () => {
    let id = "d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe";
    expect(wayscriptClient.buildURLEndpoint("lairs","detail",{"id":id})).toBe("https://api.wayscript.com/lairs/d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe");
});

test('Build Workspace Endpoint URL', () => {
    let id = "d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe";
    expect(wayscriptClient.buildURLEndpoint("workspaces","detail",{"id":id})).toBe("https://api.wayscript.com/workspaces/d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe");
});

describe('Environment Variables', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('Get Environment Variables', () => {
        process.env.WAYSCRIPT_EXECUTION_USER_TOKEN = "user_token";
        process.env.WAYSCRIPT_EXECUTION_USER_REFRESH_TOKEN = "user_refresh_token";
        process.env.WAYSCRIPT_EXECUTION_USER_APPLICATION_KEY = "user_application_key";
        process.env.WAYSCRIPT_LAIR_URL = "https://some-lair-url.wayscript.com/";
        process.env.WS_PROCESS_ID = "process_id";
    
        expect(utils.getProcessExecutionUserToken()).toBe("user_token");
        expect(utils.getProcessExecutionUserRefreshToken()).toBe("user_refresh_token");
        expect(utils.getApplicationKey()).toBe("user_application_key");
        expect(utils.getLairUrl()).toBe("https://some-lair-url.wayscript.com/");
        expect(utils.getProcessUUID()).toBe("process_id");
    })
})

test.skip('Get Process Data From Response From Request', () => {

    const mockDataFromProcessDetailRequest = {
        "event": {
            "created_date": "2021-07-22T14:57:06.461182",
            "data": {"hello": "world"},
            "id": "d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe",
            "trigger_type": "cron"
        },
        "lair_trigger": {
            "created_date": "2021-07-22T14:57:06.456127",
            "data": null,
            "entrypoint": null,
            "lair_id": "dd57b3d9-52aa-4407-84ca-3ef998757aa2",
            "settings": null,
            "test_event": "sample-test-event",
            "trigger_id": "081f3cfe-b9ba-4e6c-9f9a-d20206d3a3ee",
            "type": "cron"
        },
        "process": {
            "command": null,
            "created_date": "2021-07-22T14:57:06.466253",
            "event_id": "d1e498e4-2f32-4e5c-803e-d5fe1e2b89fe",
            "id": "dd57b3d9-52aa-4407-84ca-3ef998757aa1",
            "lair_id": "dd57b3d9-52aa-4407-84ca-3ef998757aa2",
            "port": null,
            "service_id": "42621a34-cbab-48f3-a3d2-400d83868caf",
            "status": null,
            "trigger_id": "081f3cfe-b9ba-4e6c-9f9a-d20206d3a3ee"
        }
    };

    let spy = jest.spyOn(wayscriptClient,'executeRequest').mockImplementation((url) => {
        let urlArray = url.split("/");
        if (urlArray[urlArray.length - 2] != mockDataFromProcessDetailRequest.process.id) {
            return [404, {"message": "bad process id"}];
        }
        return [200, mockDataFromProcessDetailRequest];
    });
    expect(wayscriptClient.getResponseFromRequest("https://api.wayscript.com/processes/dd57b3d9-52aa-4407-84ca-3ef998757aa1/detail")).toStrictEqual([200,mockDataFromProcessDetailRequest]);
    spy.mockRestore();
});

