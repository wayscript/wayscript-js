const utils = require("./utils");

function processResponseFromClient(response) {
    let responseStatus = response[0];
    let jsonResponseData = response[1];
    if (!(200 <= responseStatus && responseStatus <= 299)) {
        throw `{ "status" : "${responseStatus}", "json": "${jsonResponseData}"}`;
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
    return getProcessDetailExpandedData().process;
}

function getEvent() {
    return getProcessDetailExpandedData().event;
}

function getLairTrigger() {
    return getProcessDetailExpandedData().lair_trigger;
}

function getLair() {
    let process = getProcess();
    let lairId = process.lair_id;

    let client = new utils.WayScriptClient();
    let response = client.getLairDetail(lairId);
    return processResponseFromClient(response);
}

function getLairURL() {
    return utils.getLairURL();
}

function getWorkspace() {
    let lair = getLair();
    let workspaceId = lair.workspace_id;

    let client = new utils.WayScriptClient();
    let response = client.getWorkspaceDetail(workspaceId);
    return processResponseFromClient(response);

}

function getUserByApplicationKey(applicationKey){
    let lair = getLair();
    let workspaceId = lair.workspace_id;

    let client = new utils.WayScriptClient();
    let response = client.getUserByApplicationKeyDetail(workspaceId, applicationKey);
    return processResponseFromClient(response);
}


module.exports = {getProcessDetailExpandedData, getProcess, getEvent, getLairTrigger, getLair, getWorkspace, getUserByApplicationKey};
