import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, X, CheckCircle, Trash2, Maximize2, Minimize2, Briefcase } from "lucide-react";

// --- Types ---

interface ChatMessage {
  sender: "User" | "Partner";
  text: string;
  time: string;
}

// Updated Interface to match BrowseJobs data
export interface ChatPartner {
  id: string; // This is the job_maker (email)
  name: string; // Display name
  jobId: number; // To separate chats by specific job
  jobName: string; // Title of the job
  jobDescription: string;
  avatarColor: string;
}

interface ChatHistory {
  partner: ChatPartner;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
}

interface ChatPopupProps {
  student: ChatPartner | null; // We keep prop name 'student' to match your parent component, or you can rename it in BrowseJobs too
  onClose: () => void;
  currentUser: { email: string | null; name: string };
}

// --- Helper to generate unique chat key ---
// Key is now specific to the User AND the specific Job ID
const generateChatKey = (partner: ChatPartner): string => {
  return `${partner.id}_job_${partner.jobId}`;
};

// --- Local Storage Helpers ---
const saveChatHistories = (histories: Map<string, ChatHistory>) => {
  localStorage.setItem(
    "skillswap_chat_histories_v2", // Changed key to v2 to avoid conflicts with old data
    JSON.stringify(Object.fromEntries(histories))
  );
};

const loadChatHistories = (): Map<string, ChatHistory> => {
  const saved = localStorage.getItem("skillswap_chat_histories_v2");
  if (!saved) return new Map();
  try {
    return new Map(Object.entries(JSON.parse(saved)));
  } catch {
    return new Map();
  }
};

// --- Chat Popup Component ---
const ChatPopup: React.FC<ChatPopupProps> = ({ student, onClose, currentUser }) => {
  const [maximized, setMaximized] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  
  // Load history
  const [chatHistories, setChatHistories] = useState<Map<string, ChatHistory>>(() =>
    loadChatHistories()
  );

  // "activePartner" replaces "activeStudent"
  const [activePartner, setActivePartner] = useState<ChatPartner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  
  const previousPartnerRef = useRef<ChatPartner | null>(null);
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
  }, [chatHistories, activePartner]);

  // Initialize and switch partner when prop changes
  useEffect(() => {
    if (!student || !currentUser) return;

    // If props changed, update active partner
    if (
      previousPartnerRef.current?.id !== student.id ||
      previousPartnerRef.current?.jobId !== student.jobId
    ) {
      setActivePartner(student);
      setMessageInput(""); // Clear input
      previousPartnerRef.current = student;
    }

    const chatKey = generateChatKey(student);
    const existingChat = chatHistories.get(chatKey);

    // Update partner details in history if they changed (e.g. job name updated)
    if (existingChat) {
      const updatedChat = {
        ...existingChat,
        partner: { ...existingChat.partner, ...student },
      };
      // Deep compare simplified
      if (JSON.stringify(existingChat.partner) !== JSON.stringify(updatedChat.partner)) {
        setChatHistories((prev) => {
          const newMap = new Map(prev);
          newMap.set(chatKey, updatedChat);
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
    if (!content || !activePartner) return;

    const chatKey = generateChatKey(activePartner);
    const newMsg: ChatMessage = {
      sender: "User",
      text: content,
      time: nowTime(),
    };

    setChatHistories((prev) => {
      const newMap = new Map(prev);
      const currentChat = newMap.get(chatKey);
      
      if (currentChat) {
        currentChat.messages.push(newMsg);
        currentChat.lastMessage = newMsg;
      } else {
        newMap.set(chatKey, {
          partner: activePartner,
          messages: [newMsg],
          lastMessage: newMsg,
        });
      }
      return newMap;
    });

    setMessageInput("");

    // Simulated reply
    setTimeout(() => {
      const reply: ChatMessage = {
        sender: "Partner",
        text: `Hello! I received your message regarding "${activePartner.jobName}". How can I help?`,
        time: nowTime(),
      };
      setChatHistories((prev) => {
        const newMap = new Map(prev);
        const chat = newMap.get(chatKey);
        if (chat) {
          chat.messages.push(reply);
          chat.lastMessage = reply;
        }
        return newMap;
      });
    }, 1000);
  };

  const confirmDeleteChat = (chatKey: string) => {
    setDeleteTarget(chatKey);
  };

  const handleDeleteChat = () => {
    if (!deleteTarget) return;

    const chatToDelete = chatHistories.get(deleteTarget);
    const wasActive = 
        activePartner && 
        generateChatKey(activePartner) === deleteTarget;
    
    setChatHistories((prev) => {
      const newMap = new Map(prev);
      newMap.delete(deleteTarget);
      return newMap;
    });

    if (wasActive) {
      setActivePartner(null);
      setMessageInput("");
    }

    setDeleteTarget(null);
  };

  const switchToChat = (partner: ChatPartner) => {
    if (activePartner?.id !== partner.id || activePartner?.jobId !== partner.jobId) {
      setMessageInput("");
      setActivePartner(partner);
    }
  };

  const handleClosePopup = () => {
    setActivePartner(null);
    setMessageInput("");
    previousPartnerRef.current = null;
    onClose();
  };

  const chatKey = activePartner ? generateChatKey(activePartner) : null;
  const currentChat = chatKey ? chatHistories.get(chatKey) : null;
  const currentMessages = currentChat?.messages || [];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex bg-white shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        maximized
          ? "w-[1000px] h-[80vh] rounded-2xl"
          : "w-[700px] h-[500px] rounded-xl"
      }`}
    >
      {/* --- Sidebar (Chat List) --- */}
      <div
        className={`border-r border-gray-200 transition-all duration-300 flex flex-col ${
          maximized ? "w-[320px]" : "w-[240px]"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3 bg-white text-gray-800">
          <button
            className="p-1 rounded hover:bg-indigo-700 mr-2"
            onClick={() => setMaximized((m) => !m)}
          >
            {maximized ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <div className="text-sm font-semibold flex-1">Conversations</div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50">
          {chatHistories.size === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm select-none p-4 text-center">
              <p>No conversations yet.</p>
            </div>
          ) : (
            Array.from(chatHistories.values()).map((chat) => {
                const key = generateChatKey(chat.partner);
                const isActive = activePartner && generateChatKey(activePartner) === key;

                return (
                  <div
                    key={key}
                    className={`p-3 border-b cursor-pointer flex items-center group transition-colors ${
                      isActive ? "bg-white border-l-4 border-l-indigo-600 shadow-sm" : "hover:bg-gray-100 border-l-4 border-l-transparent"
                    }`}
                    onClick={() => switchToChat(chat.partner)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 shrink-0 rounded-full ${chat.partner.avatarColor} text-white flex items-center justify-center text-sm font-bold`}
                      >
                        {chat.partner.name[0].toUpperCase()}
                      </div>

                      {/* Text Info */}
                      <div className="flex-1 min-w-0">
                         {/* Name and Time */}
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-sm truncate text-gray-800">
                                {chat.partner.name}
                            </span>
                            <span className="text-[10px] text-gray-400 ml-1">
                                {chat.lastMessage?.time}
                            </span>
                        </div>
                        
                        {/* Job Title context */}
                        <div className="flex items-center text-[11px] text-indigo-600 mb-0.5 font-medium">
                            <Briefcase className="w-3 h-3 mr-1" />
                            <span className="truncate">{chat.partner.jobName}</span>
                        </div>

                        {/* Last Message */}
                        <div className="text-xs text-gray-500 truncate">
                          {chat.lastMessage?.text || "Start a conversation..."}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        className="ml-1 p-1.5 rounded hover:bg-red-100 text-gray-300 hover:text-red-600 invisible group-hover:visible transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteChat(key);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
            })
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="bg-white rounded-lg shadow-xl p-5 w-[280px] text-center animate-in fade-in zoom-in duration-200">
              <div className="mb-4 text-sm font-semibold text-gray-800">
                Delete this conversation?
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="px-3 py-1.5 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <Button
                  className="px-3 py-1.5 text-xs h-auto rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDeleteChat}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Chat Window (Right Side) --- */}
      <div className="flex flex-col flex-1 bg-white relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {activePartner && (
              <>
                <div
                  className={`w-10 h-10 rounded-full ${activePartner.avatarColor} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {activePartner.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  {/* Job Title as Main Header */}
                  <div className="text-sm font-bold text-gray-900 leading-tight truncate">
                    {activePartner.jobName}
                  </div>
                  {/* User Info as Subheader */}
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    Chat with {activePartner.name} 
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-gray-300">|</span>
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                        Job ID: {activePartner.jobId}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleClosePopup}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        {!activePartner ? (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-gray-400 text-center select-none bg-gray-50/50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-gray-300" />
            </div>
            <p>Select a conversation or start a new one from the Job Board.</p>
          </div>
        ) : (
          <>
             {/* Context Banner (Optional: Shows job description snippet) */}
            <div className="bg-blue-50 px-4 py-2 text-xs text-blue-800 flex items-start gap-2 border-b border-blue-100">
                <Briefcase className="w-3 h-3 mt-0.5 shrink-0" />
                <p className="line-clamp-1 opacity-90">{activePartner.jobDescription}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
               {/* Start of chat divider */}
               {!currentChat && (
                   <div className="text-center py-4">
                       <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                           Start of conversation regarding {activePartner.jobName}
                       </span>
                   </div>
               )}

              {currentMessages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.sender === "User" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                      m.sender === "User"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <div className="leading-relaxed">{m.text}</div>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        m.sender === "User"
                          ? "text-indigo-200"
                          : "text-gray-400"
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-100 transition-all">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="h-9 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3"
                />
                <Button
                  size="icon"
                  className={`rounded-full h-9 w-9 shrink-0 transition-all ${
                      messageInput.trim() 
                      ? "bg-indigo-600 hover:bg-indigo-700 shadow-md" 
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;