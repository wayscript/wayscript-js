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


let key = "YOUR APPLICATION KEY"
// application key can be obtained from workspace settings, or through environmental variable
// os.environ.get('WAYSCRIPT_EXECUTION_USER_APPLICATION_KEY')
let user = wayscript.context.getUserByApplicationKey(key);
console.log(user)
