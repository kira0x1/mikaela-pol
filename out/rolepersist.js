"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initRolePersist(client) {
    var codersClub = client.guilds.get("585850878532124672");
    console.log("Roles\n");
    codersClub.roles.map(function (role) {
        console.log(role.name);
    });
}
exports.default = initRolePersist;
