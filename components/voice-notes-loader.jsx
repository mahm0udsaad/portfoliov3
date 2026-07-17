import ClientChat from "@/components/voice-notes";
import { getPublishedChatMessages } from "@/lib/chat-messages";

/**
 * Server wrapper: fetches the admin-managed chat content and hands it to the
 * client chat. When the table is missing/empty (pre-migration), `messages` is
 * null and ClientChat falls back to the static thread — so the site never
 * breaks regardless of DB state.
 */
export default async function VoiceNotesLoader({ locale = "en", labels = {} }) {
  const messages = await getPublishedChatMessages(locale);
  return <ClientChat locale={locale} labels={labels} messages={messages} />;
}
