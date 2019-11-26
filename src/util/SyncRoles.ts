import chalk from 'chalk';
import { Client, Message, MessageReaction, Role, TextChannel, User } from 'discord.js';
import { polGuildId } from '../config';

const channelId = "628565019508080660"

export const customRoles = [
    {
        "title": "Systems of Government",
        "roles": [
            { name: "Unitary", id: "638549799393820712", emoji: "🔊", emojiName: "loud_sound" },
            { name: "Federal", id: "640115073964310533", emoji: "🔉", emojiName: "speaker" },
            { name: "Confederal ", id: "640115317741453313", emoji: "🔈", emojiName: "sound" },
        ]
    },
    {
        "title": "Military Forgien Policy",
        "roles": [
            { name: "Interventionism", id: "640115318684909568", emoji: "⚔", emojiName: "loud_sound" },
            { name: "Non-Interventionism", id: "640115319523770378", emoji: "🛡", emojiName: "loud_sound" },
            { name: "Pacifism", id: "640115320316624896", emoji: "🕊", emojiName: "loud_sound" },
        ]
    },

    {
        "title": "Forgien Affairs",
        "roles": [
            { name: "Globalism", id: "640115321189040128", emoji: "🌎" },
            { name: "Neutral Foreign Affairs", id: "640115321683968011", emoji: "⚖" },
            { name: "Nationalism", id: "640115322728349706", emoji: "🚩" },
        ]
    },
    {
        "title": "Democracy Axis",
        "roles": [
            { name: "Democracy", id: "640115323525136384", emoji: "🗳" },
            { name: "Oligarchy", id: "640115324385230848", emoji: "🍷" },
            { name: "Autocracy", id: "640115324980690948", emoji: "👮" },
        ]
    },
    {
        "title": "Socialism vs Capitalism Axis",
        "roles": [
            { name: "Free Market", id: "640115325706436619", emoji: "🗑" },
            { name: "Right Mixed Market", id: "640115326838767621", emoji: "📉" },
            { name: "Left Mixed Market", id: "640115327585353748", emoji: "📈" },
            { name: "Planned Economy", id: "640115328457637888", emoji: "😇" }
        ]
    },
    {
        "title": "Economy Axis",
        "roles": [
            { name: "Public MoP", id: "640115329367801876", emoji: "⏭" },
            { name: "Private MoP", id: "640115329829175348", emoji: "⏪" },
            { name: "Mostly Public MoP", id: "640115331712417802", emoji: "⏩" },
            { name: "Mostly Private MoP", id: "640115332312334337", emoji: "⏹" }
        ]
    },
    {
        "title": "Social Axis",
        "roles": [
            { name: "Pro-LGBT", id: "640268722170363916", emoji: "🏳️‍🌈" },
            { name: "Pro-LGB Only", id: "640268726326919229", emoji: "👹" },
            { name: "AntiRacism", id: "640268727434346520", emoji: "😇" },
            { name: "Antifascism", id: "640268727987863567", emoji: "😘" },
            { name: "Fascism", id: "640268728960942080", emoji: "🏺" },
            { name: "Racialism", id: "640268729577373772", emoji: "🛑" },
            { name: "Feminism", id: "640268730399719444", emoji: "🎓" },
            { name: "Antifeminism", id: "640268944959078404", emoji: "🦀" },
            { name: "Family Values", id: "640268945940807730", emoji: "👪" },
            { name: "Pro Trans Only 🇹", id: "641329711405989889", emoji: "🇹" },
            { name: "Vegan 🥕", id: "641329712735453205", emoji: "🥕" },
            { name: "Omnivore 💀", id: "641329714065309726", emoji: "💀" },
        ]
    },
    {
        "title": "Pronouns",
        "roles": [
            { name: "He/Him/His", id: "640268946418958347", emoji: "💙" },
            { name: "She/Her/Hers", id: "640268947001966592", emoji: "💜" },
            { name: "They/Them/Theirs", id: "640269092766351360", emoji: "💛" }
        ]
    },
    {
        "title": "Meta-Ethics",
        "roles": [
            { name: "Moral Nihilism", id: "640269093420662785", emoji: "💔" },
            { name: "Moral Error Theory", id: "640269094234488872", emoji: "❌" },
            { name: "Moral Relativism", id: "640269094641336330", emoji: "🌈" },
            { name: "Robust Moral Realism", id: "640269095190921248", emoji: "🔮" }
        ]
    },
    {
        "title": "Normative Ethics",
        "roles": [
            { name: "Utilitarianism", id: "640269095937507393", emoji: "🍞" },
            { name: "Consequentialism", id: "640269096935489596", emoji: "⏰" },
            { name: "Deontology", id: "640269097082421250", emoji: "📜" },
            { name: "Virtue Ethics", id: "640269387466670103", emoji: "📿" },
            { name: "Theological Ethics", id: "640269388041289751", emoji: "🛐" },
            { name: "Natural Rights", id: "640269389031276564", emoji: "🍃" },
        ]
    },
    {
        "title": "Political Identity",
        "roles": [
            { name: "left wing", id: "640269389437861909", emoji: "📕" },
            { name: "centrist", id: "640269389974994993", emoji: "😶" },
            { name: "right wing", id: "640269390817918979", emoji: "📙" },
            { name: "alt-right", id: "640269391677620255", emoji: "📓" },
        ]
    },
    {
        "title": "Religion",
        "roles": [
            { name: "Islam", id: "640296434821758977", emoji: "☪" },
            { name: "Christianity", id: "640296436289896488", emoji: "✝" },
            { name: "Judiasm", id: "640296437137276939", emoji: "✡" },
            { name: "Buddhism", id: "640296438894428191", emoji: "☸" },
            { name: "Hinduism", id: "640296440459165750", emoji: "🕉" },
            { name: "Paganism", id: "640296440790384655", emoji: "🕯" },
            { name: "Spiritualism", id: "640296442958970885", emoji: "✨" },
            { name: "Atheism", id: "640296443772403712", emoji: "⚛" },
            { name: "Agnostic", id: "640296445320233010", emoji: "❓" },
        ]
    }
]

export async function SyncRoles(client: Client) {

    const guild = client.guilds.get(polGuildId);
    const channel = guild.channels.get(channelId);


    if (!((channel): channel is TextChannel => channel.type === "text")(channel)) return console.log("Couldnt find channel")

    channel.fetchMessages({ limit: 50 }).then(messages => {
        messages.map(msg => {
            if (msg.reactions.size > 0) {
                msg.reactions.map(rc => {
                    syncEmoji(msg, rc.emoji.name)
                })
            }
        })
    })


    client.on("messageReactionRemove", (reaction, user) => {
        let isEmoji = false
        for (let i = 0; i < customRoles.length; i++) {
            if (customRoles[i].roles.find(rl => rl.emoji === reaction.emoji.name)) {
                isEmoji = true
                break;
            }
        }
        if (!isEmoji) return
        if (user.bot) return

        const member = guild.members.get(user.id)
        let crole: string
        for (let i = 0; i < customRoles.length; i++) {
            customRoles[i].roles.find(cr => {
                if (cr.emoji === reaction.emoji.name) {
                    crole = cr.id
                }
            })
        }


        const role = guild.roles.find(rl => rl.id === crole)

        if (!member || !role) return console.log("er")

        const rolesFound: Role[] = []

        member.roles.map(role => {
            customRoles.map(section => {
                if (section.roles.find(r => r.id === role.id)) {
                    rolesFound.push(role)

                }
            })
        })

        if (member.roles.has(role.id)) {
            member.removeRole(role)
        }
    })
}

async function syncEmoji(msg: Message, emoji) {
    const filter = (reaction: MessageReaction, user: User) => {
        let isEmoji = false
        for (let i = 0; i < customRoles.length; i++) {
            if (customRoles[i].roles.find(rl => rl.emoji === reaction.emoji.name)) {
                isEmoji = true
                break;
            }
        }
        return reaction.emoji.name === emoji && !user.bot && isEmoji
    };

    const collector = msg.createReactionCollector(filter)

    collector.on("collect", async (reaction) => {
        const user = reaction.users.last();
        let roleId = undefined;
        for (let i = 0; i < customRoles.length; i++) {
            for (let j = 0; j < customRoles[i].roles.length; j++) {
                let role = customRoles[i].roles[j];
                if (role.emoji === reaction.emoji.name) {
                    roleId = role.id;
                    break;
                }
            }
        }

        const member = msg.guild.members.get(user.id);
        if (!roleId)
            return console.log(chalk.bgRed.bold("Couldnt find emoji"));
        // console.log(chalk.bgGreen.bold(`Added role from user ${user.username}`))
        msg.guild.members.get(user.id).addRole(roleId);
    })
}
