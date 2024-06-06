import { api } from "./@config";

const myChatApi = {
  // 채팅방 생성
  async postChatRoom(data: FormData) {
    return api.post("/chatroom", data).then((response) => response.data);
  },

  // 단일 채팅방 조회
  async getChatRoomInfo(chatRoomId: string) {
    return api.get(`/chatroom/${chatRoomId}`).then((response) => response.data);
  },

  // 채팅방 메시지 조회
  async getChatRoomMessages(chatRoomId: string) {
    return api
      .get(`/chatroom/${chatRoomId}/logs`)
      .then((response) => response.data);
  },

  // 채팅방 목록 조회
  async getChatRoomList() {
    return api.get("/chatroom/rooms").then((response) => response.data);
  },
};

export default myChatApi;
