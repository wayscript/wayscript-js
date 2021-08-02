var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const settings = require("./setup");


function getProcessExecutionUserToken() {
    return process.env.PROCESS_EXECUTION_USER_TOKEN || "";
}

function getProcessUUID() {
    return process.env.PROCESS_UUID || 0;
}

class WayScriptClient {
    constructor() {
        this.user_auth_token = getProcessExecutionUserToken();
        this.process_uuid = getProcessUUID();
    }

    getProcessDetailExpanded(_id) {
        let endpoint = this.buildURLEndpoint("processes","detail_expanded",{"id":_id});
        return this.getResponseFromRequest(endpoint);
    }

    getLairDetail(_id) {
        let endpoint = this.buildURLEndpoint("lairs","detail",{"id":_id});
        return this.getResponseFromRequest(endpoint);
    }

    getWorkspaceDetail(_id) {
        let endpoint = this.buildURLEndpoint("workspaces","detail",{"id":_id});
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
        request.open("GET", url, false);
        request.setRequestHeader('authorization',getProcessExecutionUserToken());
        
        let jsonResponse = '';
        request.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                jsonResponse = this.response;
            }
            
        };
        request.send();

        return [request.status, jsonResponse];
    }
}

module.exports = {getProcessExecutionUserToken, getProcessUUID, WayScriptClient};