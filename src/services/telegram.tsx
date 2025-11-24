export async function sendTelegram(message: string) {
  const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TG_CHAT_ID;

  console.log("Sending Telegram message...");
  console.log("Bot Token:", botToken ? "OK" : "MISSING");
  console.log("Chat ID:", chatId);

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown"
    })
  });

  const data = await response.json();
  console.log("Telegram response:", data);

  if (!response.ok || !data.ok) {
    console.error("Telegram API Error Response:", data);
    throw new Error(`Telegram Error: ${JSON.stringify(data)}`);
  }
}
