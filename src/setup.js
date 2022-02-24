const WAYSCRIPT_ORIGIN = process.env.WAYSCRIPT_ORIGIN || "https://api.wayscript.com";

const PROCESSES_ROUTE = "processes";
const LAIRS_ROUTE = "lairs";
const WEBHOOKS_ROUTE = "webhooks";
const WORKSPACES_ROUTE = "workspaces";

const ROUTES = {
    lairs: {"detail": LAIRS_ROUTE + "/$id"},
    processes: {"detail_expanded": PROCESSES_ROUTE + "/$id/detail"},
    webhooks: {"http_trigger_response": WEBHOOKS_ROUTE + "/http-trigger/response/$id"},
    workspaces: {"detail": WORKSPACES_ROUTE + "/$id",
                 "user_application_key_detail": WORKSPACES_ROUTE + "/$id/users"},
}

module.exports = {WAYSCRIPT_ORIGIN, ROUTES};
