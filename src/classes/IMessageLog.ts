import { IChannel } from "./IChannel";

export default interface IMessageLog {
    username: string,
    nickname: string,
    tag: string,
    id: string,
    content: string,
    timestamp: string,

    channel: IChannel
}