import { MessageInterface } from "../interfaces/message.interface"
import { UserInterface, UserMessage } from "../interfaces/user.interface"

class MessageService {
    public getUserMessage(user: UserInterface, messages: MessageInterface[]): UserMessage {
        return {
            _id: user._id,
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            lastMessage: messages[0]?.text || null,
            lastMessageDate: messages[0]?.createdAt || null,
            isReceiver: messages[0]?.receiver == user._id
        }
    }

    public orderUserMessage(userMessage: UserMessage[]): UserMessage[] {
        return userMessage.sort((a, b) => {
            return (a.lastMessageDate ? 0 : 1) - (b.lastMessageDate ? 0 : 1)
                || !(a.lastMessageDate > b.lastMessageDate)
                || (a.lastMessageDate < b.lastMessageDate)
        })
    }
}

export default new MessageService()