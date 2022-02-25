const wayscript = require("wayscript");


// Set up http trigger with js
let data = {"hello": "world"};
let headers = {"x-my-custom-header": "hello"};
let status_code = 200;
let response = wayscript.http_trigger.sendResponse(data, headers, status_code);
console.log(response)

// Get wayscript context with js
let event =  wayscript.context.getEvent();
console.log(event);


let process = wayscript.context.getProcess();
console.log(process);

let processDetail = wayscript.context.getProcessDetailExpandedData();
console.log(processDetail);

let lairTrigger = wayscript.context.getLairTrigger();
console.log(lairTrigger);


let lair = wayscript.context.getLair();
console.log(lair);

let workspace = wayscript.context.getWorkspace();
console.log(workspace);


let applicationKey = wayscript.util.getApplicationKey()
let user = wayscript.context.getUserByApplicationKey(applicationKey);
console.log(user)
