import emailjs from "emailjs-com";
import { sendTelegram } from "./telegram";

/**
 * Sends a flood alert email via EmailJS
 * @param location - The city/location to include in the alert
 * @param risk - Risk level ("HIGH" or "LOW")
 * @param latitude - Latitude of the location
 * @param longitude - Longitude of the location
 * @returns Promise<void>
 */
export async function sendFloodAlert(location: string, risk: string, longitude: number, latitude: number): Promise<void> {
  try {
    const message = `
      ⚠️ Flood Alert: ${risk} risk detected in ${location}. Stay safe!

      Latitude: ${latitude}
      Longitude: ${longitude}
      Google Maps: https://www.google.com/maps?q=${latitude},${longitude}
    `;
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        {
          to_email: "arbetpanlaqui874@gmail.com",
          message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC
      );
      console.log("Email sent successfully!", result.status, result.text);
      alert(`Email sent successfully to your Gmail! Risk: ${risk}`);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send email. Check console for details.");
    }

    try {
      await sendTelegram(message);
      alert(`Telegram alert sent! Risk: ${risk}`);
    } catch (error) {
      console.error("Telegram error:", error);
      alert("Failed to send Telegram alert. Check console for details.");
    }

  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
