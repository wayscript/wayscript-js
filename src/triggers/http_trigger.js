utils = require('../utils');


function sendResponse(data, headers, status_code) {
    client = new utils.WayScriptClient();
    process_id = utils.getProcessUUID();
    // headers cannot be null
    headers = headers === null ? {} : headers

    payload = {
        "data": data,
        "headers": headers,
        "status_code": status_code
    };
    payload_json = JSON.stringify(payload);
    console.log(payload_json)
    let [responseStatus, responseJson] = client.postWebhookHttpTrigger(process_id, payload_json);
    
    return responseJson;
}

module.exports = {sendResponse};