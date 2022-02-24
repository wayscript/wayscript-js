var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const settings = require("./setup");


function getProcessExecutionUserToken() {
    return process.env.WAYSCRIPT_EXECUTION_USER_TOKEN || "";
}

function getProcessUUID() {
    return process.env.WS_PROCESS_ID;
}

class WayScriptClient {
    constructor() {
        this.user_auth_token = getProcessExecutionUserToken();
        this.process_uuid = getProcessUUID();
    }

    postWebhookHttpTrigger(_id, payload) {
        let url = this.buildURLEndpoint("webhooks","http_trigger_response",{id: _id});
        return this.executeRequest('POST', url, payload);
    }

    getProcessDetailExpanded(_id) {
        let url = this.buildURLEndpoint("processes","detail_expanded",{id: _id});
        return this.executeRequest('GET', url);
    }

    getLairDetail(_id) {
        let url = this.buildURLEndpoint("lairs","detail",{id: _id});
        return this.executeRequest('GET', url);
    }

    getWorkspaceDetail(_id) {
        let url = this.buildURLEndpoint("workspaces","detail",{id: _id});
        return this.executeRequest('GET', url);
    }

    getUserByApplicationKey(_id, _key) {
        let url = this.buildURLEndpoint("workspaces","user_application_key_detail",{id: _id});
        return this.executeRequest('GET', url, null, _key);
    }

    buildURLEndpoint(subpath, route, templateArgs) {
        let subpathEndpoint = settings.ROUTES[subpath][route];
        for (const arg in templateArgs) {
            subpathEndpoint = subpathEndpoint.replace("$"+arg, templateArgs[arg]);
        }

        let url = settings.WAYSCRIPT_ORIGIN + "/" + subpathEndpoint;
        return url;
    }
 
    executeRequest(method, url, payload, key=null) {

        let request = new XMLHttpRequest();

        request.open(method, url, false);

        request.responseType = 'json';

        let access_token = "Bearer " + getProcessExecutionUserToken();

        if(key){
            access_token = "Bearer " + key;
        }
        request.setRequestHeader('authorization', access_token);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        try {
            request.send(payload);
        } catch (e) {
            console.log(e);
        }

        let responseJson = '';

        try {
            responseJson =  JSON.parse(request.responseText);
        } catch (e) {
            console.log(e);
            console.log(url);
            console.log(request.status);
            console.log(request.responseText);
        }

        return [request.status, responseJson];
    }
}

module.exports = {getProcessExecutionUserToken, getProcessUUID, WayScriptClient};
