let PROCESS_EXECUTION_USER_TOKEN = process.env.PROCESS_EXECUTION_USER_TOKEN;
let PROCESS_UUID = process.env.PROCESS_UUID;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const settings = require("./setup");


function getProcessExecutionUserToken() {
    return PROCESS_EXECUTION_USER_TOKEN = process.env.PROCESS_EXECUTION_USER_TOKEN;
}

function getProcessUUID() {
    return PROCESS_UUID = process.env.PROCESS_UUID;
}

class WayScriptClient {
    constructor() {
        this.user_auth_token = PROCESS_EXECUTION_USER_TOKEN;
        this.process_uuid = PROCESS_UUID;
    }

    getProcessDetailExpanded(_id) {
        let endpoint = this.buildURLEndpoint("processes","detail_expanded",{"id":_id.toString()});
        return this.getResponseFromRequest(endpoint);
    }

    getLairDetail(_id) {
        let endpoint = this.buildURLEndpoint("lairs","detail",{"id":_id.toString()});
        return this.getResponseFromRequest(endpoint);
    }

    getWorkspaceDetail(_id) {
        let endpoint = this.buildURLEndpoint("workspaces","detail",{"id":_id.toString()});
        return this.getResponseFromRequest(endpoint);
    }

    buildURLEndpoint(subpath, route, templateArgs) {

        let subpathEndpoint = settings.ROUTES[subpath][route];
        for (const arg in templateArgs) {
            subpathEndpoint = subpathEndpoint.replace("$"+arg, templateArgs[arg]);
        }
        let url = settings.WAYSCRIPT_ORIGIN + "/" + subpathEndpoint;
        return url;
    }

    getResponseFromRequest(url) {
        let request = new XMLHttpRequest();
        request.responseType = 'json';
        request.setRequestHeader('authorization',getProcessExecutionUserToken());
        request.open("GET", url, false);
        
        
        let jsonResponse = 'No State Change occured';
        request.onreadystatechange = function() {
            
            jsonResponse = this.response;
            
            if (this.readyState == 4 && this.status == 200) {
                jsonResponse = this.response
            }
            
        };
        request.send();

        return [request.status, jsonResponse];
    }
}

module.exports = {getProcessExecutionUserToken, getProcessUUID, WayScriptClient};