const utils = require('../utils');


function sendResponse(data, headers, status_code) {
    let client = new utils.WayScriptClient();
    let process_id = utils.getProcessUUID();
    // headers cannot be null
    headers = headers === null ? {} : headers;

    let payload = {
        "data": data,
        "headers": headers,
        "status_code": status_code
    };
    let payload_json = JSON.stringify(payload);
    let [, responseJson] = client.postWebhookHttpTrigger(process_id, payload_json);
    
    return responseJson;
}

module.exports = {sendResponse};