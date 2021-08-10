const context = require("../src/context");

test('Get Process Detail Expanded Data With invalid Env vars', () => {
    let originalUserToken = process.env.PROCESS_EXECUTION_USER_TOKEN;
    let originalProcessUUID = process.env.PROCESS_UUID; 

    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "lsdkfj";
    expect(context.getProcessDetailExpandedData()).toStrictEqual(JSON.parse(`{ "Success" : "False", "Status" : "404"}`));
    
    process.env.PROCESS_EXECUTION_USER_TOKEN = originalUserToken;
    process.env.PROCESS_UUID = originalProcessUUID;

});
