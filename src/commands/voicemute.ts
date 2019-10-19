import Command from "../classes/command";

export const command: Command = {
    name: "voicemute",
    description: "",
    aliases: ['vmute', 'vm', 'mutevoice'],
    perms: ['admin'],

    async execute(message, args) {
        const tagged = message.mentions.members.first();
        if (tagged) {
            // if(tagged.setMute(true))
        } else {

        }
    }
}