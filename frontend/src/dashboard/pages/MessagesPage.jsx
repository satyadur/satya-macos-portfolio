import { useEffect, useState } from "react";
import api from "../../lib/axios";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/contact").then(res => setMessages(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages hello</h2>

      {messages.map(msg => (
        <div key={msg._id} className="bg-white p-4 mb-3 rounded shadow">
          <h3 className="font-semibold">{msg.name}</h3>
          <p className="text-sm text-gray-600">{msg.email}</p>
          <p className="mt-2">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesPage;
