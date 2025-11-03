import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, X, CheckCircle, Trash2, Maximize2, Minimize2 } from "lucide-react";

interface ChatMessage {
  sender: "User" | "Student";
  text: string;
  time: string;
  studentId?: string;
}

interface Student {
  name: string;
  badge: string;
  badgeColor: string;
  price: string;
  location: string;
}

interface ChatHistory {
  student: Student;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
}

// --- Local Storage Helpers ---
const saveChatHistories = (histories: Map<string, ChatHistory>) => {
  localStorage.setItem(
    "skillswap_chat_histories",
    JSON.stringify(Object.fromEntries(histories))
  );
};

const loadChatHistories = (): Map<string, ChatHistory> => {
  const saved = localStorage.getItem("skillswap_chat_histories");
  if (!saved) return new Map();
  try {
    return new Map(Object.entries(JSON.parse(saved)));
  } catch {
    return new Map();
  }
};

// --- Chat Popup ---
const ChatPopup = ({ student, onClose, currentUser }) => {
  const [maximized, setMaximized] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [chatHistories, setChatHistories] = useState<Map<string, ChatHistory>>(
    () => loadChatHistories()
  );
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const initializedRef = useRef(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Save chat histories when changed
  useEffect(() => {
    saveChatHistories(chatHistories);
  }, [chatHistories]);

  // Auto-scroll when new message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistories, activeStudent]);

  // Initialize once when popup opens
  useEffect(() => {
    if (!student || !currentUser) return;
    if (!initializedRef.current) {
      setActiveStudent(student);
      initializedRef.current = true;
    }

    const existingChat = chatHistories.get(student.name);
    if (existingChat) {
      const updatedChat = {
        ...existingChat,
        student: { ...existingChat.student, ...student },
      };
      if (
        JSON.stringify(existingChat.student) !==
        JSON.stringify(updatedChat.student)
      ) {
        setChatHistories((prev) => {
          const newMap = new Map(prev);
          newMap.set(student.name, updatedChat);
          return newMap;
        });
      }
    }
  }, [student, currentUser]);

  const nowTime = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSend = () => {
    const content = messageInput.trim();
    if (!content || !activeStudent) return;

    const newMsg: ChatMessage = {
      sender: "User",
      text: content,
      time: nowTime(),
      studentId: activeStudent.name,
    };

    setChatHistories((prev) => {
      const newMap = new Map(prev);
      const currentChat = newMap.get(activeStudent.name);
      if (currentChat) {
        currentChat.messages.push(newMsg);
        currentChat.lastMessage = newMsg;
      } else {
        newMap.set(activeStudent.name, {
          student: activeStudent,
          messages: [newMsg],
          lastMessage: newMsg,
        });
      }
      saveChatHistories(newMap);
      return newMap;
    });

    setMessageInput("");

    // Simulated student reply
    setTimeout(() => {
      const reply: ChatMessage = {
        sender: "Student",
        text: "Got it! I'll check and get back to you soon.",
        time: nowTime(),
        studentId: activeStudent.name,
      };
      setChatHistories((prev) => {
        const newMap = new Map(prev);
        const chat = newMap.get(activeStudent.name);
        if (chat) {
          chat.messages.push(reply);
          chat.lastMessage = reply;
          saveChatHistories(newMap);
        }
        return newMap;
      });
    }, 1000);
  };

  const confirmDeleteChat = (studentName: string) => {
    setDeleteTarget(studentName);
  };

  const handleDeleteChat = () => {
    if (!deleteTarget) return;

    const wasActive = activeStudent?.name === deleteTarget;
    setChatHistories((prev) => {
      const newMap = new Map(prev);
      newMap.delete(deleteTarget);
      saveChatHistories(newMap);
      return newMap;
    });

    if (wasActive) {
      setActiveStudent(null);
      setMessageInput("");
    }

    setDeleteTarget(null);
  };

  const switchToChat = (student: Student) => {
    if (activeStudent?.name !== student.name) {
      setMessageInput("");
      setActiveStudent(student);
    }
  };

  const handleClosePopup = () => {
    setActiveStudent(null);
    setMessageInput("");
    initializedRef.current = false;
    onClose();
  };

  const currentChat =
    activeStudent && chatHistories.get(activeStudent.name)
      ? chatHistories.get(activeStudent.name)
      : null;

  const currentMessages = currentChat?.messages || [];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex bg-white shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        maximized
          ? "w-[1000px] h-[80vh] rounded-2xl"
          : "w-[600px] h-[500px] rounded-xl"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`border-r border-gray-200 transition-all duration-300 ${
          maximized ? "w-[320px]" : "w-[240px]"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
          <button
            className="p-1 rounded hover:bg-blue-700 mr-2"
            onClick={() => setMaximized((m) => !m)}
          >
            {maximized ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <div className="text-sm font-semibold flex-1">Chat History</div>
        </div>

        <div className="h-[calc(100%-40px)] overflow-y-auto">
          {chatHistories.size === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm select-none">
              No Messages
            </div>
          ) : (
            Array.from(chatHistories.values()).map((chat) => (
              <div
                key={chat.student.name}
                className={`p-3 border-b hover:bg-gray-50 cursor-pointer flex items-center group ${
                  activeStudent?.name === chat.student.name
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() => switchToChat(chat.student)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`w-8 h-8 rounded-full ${chat.student.badgeColor} flex items-center justify-center text-xs font-semibold`}
                  >
                    {chat.student.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {chat.student.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {chat.lastMessage?.time}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {chat.lastMessage?.text || "Start a conversation..."}
                    </div>
                  </div>
                  <button
                    className="ml-2 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 invisible group-hover:visible"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDeleteChat(chat.student.name);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[320px]">
              <div className="mb-4 text-base font-semibold text-gray-800">
                Delete chat with "{deleteTarget}"?
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <Button
                  className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDeleteChat}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          maximized ? "w-[680px]" : "w-[360px]"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
          <div className="flex items-center gap-3 flex-1">
            {activeStudent && (
              <>
                <div
                  className={`w-9 h-9 rounded-full ${activeStudent.badgeColor} flex items-center justify-center text-xs font-semibold`}
                >
                  {activeStudent.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold leading-none">
                    {activeStudent.name}{" "}
                    <CheckCircle className="inline w-3 h-3 text-green-300" />
                  </div>
                  <div className="text-[11px] opacity-90">Online</div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleClosePopup}
            className="p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 💬 Main Chat Section */}
        {!activeStudent ? (
          <div className="flex items-center justify-center flex-1 p-4 text-gray-400 text-sm select-none">
            No Messages
          </div>
        ) : !chatHistories.get(activeStudent.name) ? (
          // 🆕 Added missing “Start new conversation” UI
          <div className="flex items-center justify-center flex-1 p-4 text-gray-600 text-center">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold mb-1">
                Start a New Conversation with {activeStudent.name}
              </p>
              <p className="text-sm text-gray-500">
                Send a message below to initiate the chat!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 px-3 py-3 border-b bg-gray-50">
              <div
                className={`w-12 h-12 rounded-md ${activeStudent.badgeColor}`}
              ></div>
              <div className="flex-1">
                <div className="text-sm font-semibold">
                  {activeStudent.badge}
                </div>
                <div className="text-xs text-gray-500">
                  Price: <span className="font-medium">{activeStudent.price}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {activeStudent.location}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white">
              {currentMessages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.sender === "User" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      m.sender === "User"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                    }`}
                  >
                    <div>{m.text}</div>
                    <div
                      className={`text-[10px] mt-1 ${
                        m.sender === "User"
                          ? "text-blue-200 text-right"
                          : "text-gray-400 text-right"
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </>
        )}

        {/* Input */}
        {activeStudent && (
          <div className="px-3 py-2 border-t bg-gray-50 flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="h-10 rounded-full"
            />
            <Button
              size="icon"
              className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700"
              onClick={handleSend}
              disabled={!messageInput.trim()}
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;
