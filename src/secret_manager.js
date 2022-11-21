const utils = require("./utils");
const context = require("./context");

function setSecret(secret_key, secret_val){
    let process = context.getProcess();
    let lairId = process.lair_id;

    let client = new utils.WayScriptClient();
    let response = client.setLairSecret(lairId, secret_key, secret_val);

    let responseStatus = response[0];
    let jsonResponseData = response[1];
    if (!(200 <= responseStatus && responseStatus <=299)) {
        if (responseStatus == 403) {
            jsonResponseData = {error: "user is not authorized to modify lair"};
        }
        throw `{"status": "${responseStatus}", "json": "${JSON.stringify(jsonResponseData)}"}`;
    }
    return jsonResponseData;
}


module.exports = {setSecret}
