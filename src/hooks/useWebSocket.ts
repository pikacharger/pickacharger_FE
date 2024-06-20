import { useCallback, useEffect, useRef, useState } from "react";

type MessageHandler = (message: string) => void;

function useWebSocket(chatRoomId: string, onMessage?: MessageHandler) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // 메시지 핸들러 저장
  const messageHandler = useRef<MessageHandler | undefined>(onMessage);

  // 메시지 핸들러가 변경될 때 참조를 업데이트
  useEffect(() => {
    messageHandler.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_APP_WEB_SOCKET_URL}/${chatRoomId}`
    );

    ws.onopen = () => {
      console.log("웹소켓 서버에 연결됨");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("받은 메시지:", event.data);
      messageHandler.current?.(event.data);
    };

    ws.onerror = (event) => {
      console.error("웹소켓 에러:", event);
    };

    ws.onclose = () => {
      console.log("웹소켓 연결이 닫혔습니다.");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      console.log("웹소켓 연결을 종료합니다.");
      ws.close();
    };
  }, [chatRoomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    },
    [socket]
  );

  return { sendMessage, isConnected };
}

export default useWebSocket;
