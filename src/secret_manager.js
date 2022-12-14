const utils = require("./utils");
const context = require("./context");

function setSecret(secret_key, secret_val){
    const process = context.getProcess();
    const lairId = process.lair_id;

    const client = new utils.WayScriptClient();
    const response = client.setLairSecret(lairId, secret_key, secret_val);

    const responseStatus = response[0];
    let jsonResponseData = response[1];
    if (!(200 <= responseStatus && responseStatus <=299)) {
        if (responseStatus == 403) {
            jsonResponseData = {error: "user is not authorized to modify lair"};
        }
        throw `{"status":"${responseStatus}","json":${JSON.stringify(jsonResponseData)}}`;
    }
    return jsonResponseData;
}


module.exports = {setSecret}
