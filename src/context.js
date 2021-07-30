const utils = require("./utils");

function processResponseFromClient(response) {
    let responseStatus = response[0];
    let jsonResponseData = response[1];
    if (responseStatus != 200) {
        return JSON.parse(`{ "Success" : "False", "Status" : "${responseStatus}"}`);
    }
    return jsonResponseData;
}

function getProcessDetailExpandedData() {
    let processUUID = utils.getProcessUUID();
    let client = new utils.WayScriptClient();
    
    let response = client.getProcessDetailExpanded(processUUID);
    return processResponseFromClient(response);
}

function getProcess() {
    return getProcessDetailExpandedData()["process"];
}

function getEvent() {
    return getProcessDetailExpandedData()["event"];
}

function getLairTrigger() {
    return getProcessDetailExpandedData()["lair_trigger"];
}

function getLair() {
    let process = getProcess();
    let lairId = process["lair_id"];

    let client = new utils.WayScriptClient();
    let response = client.getLairDetail(lairId);
    return processResponseFromClient(response);
}


module.exports = {getProcessDetailExpandedData, getProcess, getEvent, getLairTrigger, getLair};
