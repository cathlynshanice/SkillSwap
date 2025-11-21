import React, { useState, forwardRef, useImperativeHandle } from "react";
import ChatPopup, { ChatPartner } from "./ChatPopup"; // Import the interface
import FloatingMessageIcon from "./FloatingMessageIcon";

interface ChatManagerProps {
  currentUserEmail?: string | null; // Allow passing the email from parent
}

export interface ChatManagerHandle {
  openChatWithStudent: (partner: ChatPartner) => void;
}

const ChatManager = forwardRef<ChatManagerHandle, ChatManagerProps>((props, ref) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Renamed to activePartner to match the new ChatPopup logic
  const [activePartner, setActivePartner] = useState<ChatPartner | null>(null);

  // Construct currentUser object required by ChatPopup
  const currentUser = { 
    email: props.currentUserEmail || null, 
    name: "You" 
  };

  // Expose function to parent
  useImperativeHandle(ref, () => ({
    // We keep the method name 'openChatWithStudent' for your existing code compatibility,
    // but it now expects the full 'ChatPartner' object with Job IDs.
    openChatWithStudent(partner: ChatPartner) {
      setActivePartner(partner);
      setIsChatOpen(true);
    },
  }));

  const openFloatingChat = () => {
    // When clicking floating icon, we open history (no specific partner active)
    setActivePartner(null);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setActivePartner(null);
  };

  return (
    <>
      {!isChatOpen && <FloatingMessageIcon onClick={openFloatingChat} />}

      {isChatOpen && (
        <ChatPopup
          student={activePartner} // Passes the specific job/partner data
          currentUser={currentUser}
          onClose={closeChat}
        />
      )}
    </>
  );
});

ChatManager.displayName = "ChatManager";
export default ChatManager;