const context = require("../src/context");

test.skip('Get Process Detail Expanded Data With invalid Env vars', () => {
    let originalUserToken = process.env.WAYSCRIPT_EXECUTION_USER_TOKEN;
    let originalProcessUUID = process.env.WS_PROCESS_ID; 

    process.env.PROCESS_EXECUTION_USER_TOKEN = "sdfklj";
    process.env.PROCESS_UUID = "lsdkfj";
    expect(context.getProcessDetailExpandedData()).toStrictEqual(JSON.parse(`{ "Success" : "False", "Status" : "404"}`));
    
    process.env.WAYSCRIPT_EXECUTION_USER_TOKEN = originalUserToken;
    process.env.WS_PROCESS_ID = originalProcessUUID;

});
