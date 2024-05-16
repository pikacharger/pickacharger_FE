import { IMessageProps } from "@/pages/chatRoom/ChatRoom";
import { api } from "./@config";

const myChatApi = {
  async postChatRoom(data: FormData) {
    return api.post("/chatroom", data).then((response) => response.data);
  },
  async getChatRoomList() {
    return api.get("/chatroom/rooms").then((response) => response.data);
  },
  async getChatRoomMessages(chatRoomId: string) {
    return api
      .get(`/chatroom/${chatRoomId}/logs`)
      .then((response) => response.data);
  },
  async postChatRoomMessage(chatRoomId: string, message: IMessageProps) {
    console.log(JSON.stringify(message));
    return api
      .post(`/chatlog/${chatRoomId}/chatlogs`, JSON.stringify(message))
      .then((response) => response.data);
  },
};

export default myChatApi;
