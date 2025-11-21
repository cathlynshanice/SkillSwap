import { MessageSquare } from "lucide-react";

const FloatingMessageIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-colors flex items-center justify-center w-14 h-14"
    aria-label="Open chat history"
    title="Open chat history"
  >
    <MessageSquare className="w-6 h-6" />
  </button>
);

export default FloatingMessageIcon;
