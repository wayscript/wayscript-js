const utils = require("../src/utils");

const wayscriptClient = new utils.WayScriptClient();

test('Build Process Endpoint URL', () => {
    let stringNum = 12;
    stringNum.toString();
    expect(wayscriptClient.buildURLEndpoint("processes","detail_expanded",{"id":stringNum})).toBe("https://api.wayscript.com/processes/12/detail");
});

test('Build Lair Endpoint URL', () => {
    let stringNum = 12;
    stringNum.toString();
    expect(wayscriptClient.buildURLEndpoint("lairs","detail",{"id":stringNum})).toBe("https://api.wayscript.com/lairs/12");
});

test('Build Workspace Endpoint URL', () => {
    let stringNum = 12;
    stringNum.toString();
    expect(wayscriptClient.buildURLEndpoint("workspaces","detail",{"id":stringNum})).toBe("https://api.wayscript.com/workspaces/12");
});


