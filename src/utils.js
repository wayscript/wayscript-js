let PROCESS_EXECUTION_USER_TOKEN = process.env.PROCESS_EXECUTION_USER_TOKEN;
let PROCESS_UUID = process.env.PROCESS_UUID;

module.exports = class WayScriptClient {
    constructor() {
        this.user_auth_token = PROCESS_EXECUTION_USER_TOKEN;
        this.process_uuid = PROCESS_UUID;
    }
    getResponseFromRequest(url) {
        //Use xml or fetch?
        
        //xml
        let request = new XMLHttpRequest();
        //request.responseType = 'JSON';
        //request.setRequestHeader('authorization',process.env.PROCESS_EXECUTION_USER_TOKEN);

        request.open("GET", url, true);

        request.onload = function() {
            if (request.status != 200) {
                return "Error";
            } else {
                return "Success!";
            }
        };
    }
}
