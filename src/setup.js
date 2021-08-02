const WAYSCRIPT_ORIGIN = process.env.WAYSCRIPT_ORIGIN || "https://api.wayscript.com";

const PROCESSES_ROUTE = "processes";
const LAIRS_ROUTE = "lairs";
const WORKSPACES_ROUTE = "workspaces";

const ROUTES = {
    "lairs": {"detail": LAIRS_ROUTE + "/$id"},
    "workspaces": {"detail": WORKSPACES_ROUTE + "/$id"},
    "processes": {"detail_expanded": PROCESSES_ROUTE + "/$id/detail"}
}

module.exports = {WAYSCRIPT_ORIGIN, ROUTES};