const context = require("../src/context");


let originalUserToken = process.env.PROCESS_EXECUTION_USER_TOKEN;
let originalProcessUUID = process.env.PROCESS_UUID; 

test('Get Process Detail Expanded Data With invalid Env vars', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "lsdkfj";
    expect(context.getProcessDetailExpandedData()).toStrictEqual(JSON.parse('{ "Success" : "False", "Status" : "404"}'));
    
});

test('Get Process Detail Expanded Data with Valid vars', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "lsdkfj";
    expect(context.getProcessDetailExpandedData()).toStrictEqual(JSON.parse('Insert expected Return Value here'));
});


// To Do: Make Tests more robust once there are valid endpoints

test('Get Process', () => {
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

    let spy = jest.spyOn(context,'getProcess').mockImplementation(() => mockDataFromProcessDetailRequest.process);

    expect(context.getProcess()).toStrictEqual(mockDataFromProcessDetailRequest.process);
    spy.mockRestore();

});

test('Get Event', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "dd57b3d9-52aa-4407-84ca-3ef998757aa1";
    expect(context.getEvent()).toStrictEqual(JSON.parse('Insert expected Return Value here'));
});

test('Get LairTrigger', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "dd57b3d9-52aa-4407-84ca-3ef998757aa1";
    expect(context.getLairTrigger()).toStrictEqual(JSON.parse('Insert expected Return Value here'));
});

test('Get Lair', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "dd57b3d9-52aa-4407-84ca-3ef998757aa1";
    expect(context.getLair()).toStrictEqual(JSON.parse('Insert expected Return Value here'));
});

test('Get Workspace', () => {
    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "dd57b3d9-52aa-4407-84ca-3ef998757aa1";
    expect(context.getWorkspace()).toStrictEqual(JSON.parse('Insert expected Return Value here'));
});

process.env.PROCESS_EXECUTION_USER_TOKEN = originalUserToken;
process.env.PROCESS_UUID = originalProcessUUID;
