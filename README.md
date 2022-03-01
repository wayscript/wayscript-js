# wayscript-js

## Triggers

### HTTP Trigger

Send an http trigger response:
```
const wayscript = require("wayscript")
let data = {"hello": "world"}
let headers = {"x-my-custom-header": "hello"}
let status_code = 200
response = wayscript.http_trigger.sendResponse(data, headers, status_code)
console.log(response)
```


## Context

Access the event which triggered an execution:
```
const wayscript = require("wayscript")
event = wayscript.context.getEvent();
console.log(event);
```

More use cases in can be found [here](example.js) 
[Contribution guidelines for this project](CONTRIBUTING.md)