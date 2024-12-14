// import React, { useState } from "react";

// const ChatSummary = () => {
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchSummary = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/chat-summary?chatId=123"); // API endpoint
//       if (!response.ok) throw new Error("Failed to fetch summary");
//       const data = await response.json();
//       setSummary(data.summary);
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//       setSummary("An error occurred while fetching the summary.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchSummary} disabled={loading}>
//         {loading ? "Loading..." : "Get Weekly Summary"}
//       </button>
//       <div>{summary && <p>{summary}</p>}</div>
//     </div>
//   );
// };

// export default ChatSummary;
