// -- ChatPopup (fixed): user is sender who asks about the service --
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, X, CheckCircle } from "lucide-react";

const ChatPopup = ({ student, onClose, currentUser }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const nowTime = () => {
    const d = new Date();
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
  };

  useEffect(() => {
    if (!student || !currentUser) return;

    // Summary text the user sends to start conversation
    const initialText = `Hi ${student.name}, I'm interested in your "${student.badge}" service (Price: ${student.price}). Are you available and what is your estimated turnaround?`;

    setMessages([
      {
        sender: "User",
        text: initialText,
        time: nowTime(),
      },
      // Optionally include a sample student reply (can be removed or fetched later)
      {
        sender: "Student",
        text: `Hello! Thanks for reaching out — I usually can start within 3 days. Could you share more details about your project?`,
        time: nowTime(),
      },
    ]);

    setMessageInput("");
  }, [student, currentUser]);

  const handleSend = () => {
    const content = messageInput.trim();
    if (!content) return;

    const newMsg = { sender: "User", text: content, time: nowTime() };
    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");

    // TODO: call API/send to server here. For demo we don't send to backend.
    // Optionally simulate an auto-reply from student after some delay:
    // setTimeout(() => setMessages(prev => [...prev, { sender: 'Student', text: 'Got it! I will check and reply soon.', time: nowTime() }]), 1200);
  };

  if (!student) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] md:w-[420px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${student.badgeColor} flex items-center justify-center text-xs font-semibold`}>
            {student.name.split(" ")[1] || student.name[0]}
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">
              {student.name} <span className="ml-1"><CheckCircle className="inline w-3 h-3 text-green-300" /></span>
            </div>
            <div className="text-[11px] opacity-90">Online</div>
          </div>
        </div>

        <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10">
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-3 px-3 py-3 border-b bg-gray-50">
        <div className={`w-12 h-12 rounded-md ${student.badgeColor} flex items-center justify-center text-xs font-bold`}>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">{student.badge}</div>
          <div className="text-xs text-gray-500">Price: <span className="font-medium">{student.price}</span></div>
          <div className="text-xs text-gray-400 mt-1">{student.location}</div>
        </div>
      </div>

      {/* Messages list */}
      <div className="h-64 overflow-y-auto p-3 space-y-3 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                m.sender === "User" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
              }`}
            >
              <div>{m.text}</div>
              <div className={`text-[10px] mt-1 ${m.sender === "User" ? "text-blue-200 text-right" : "text-gray-400 text-right"}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t bg-gray-50 flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
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
    </div>
  );
};

export default ChatPopup;
