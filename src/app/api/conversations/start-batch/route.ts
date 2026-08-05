import { NextResponse } from "next/server";
import { authErrorResponse } from "@/lib/api-errors";
import { errorResponse, successResponse } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth-context";
import { ConversationService } from "@/modules/chatbot/services/conversation.service";

const conversationService = new ConversationService();

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const formData = await request.formData();
    const file = formData.get("file");
    const phones = String(formData.get("phones") ?? "")
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);

    const media = file instanceof File
      ? {
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          dataUrl: `data:${file.type || "application/octet-stream"};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`,
        }
      : undefined;

    const result = await conversationService.startConversationBatch({
      phones,
      leadName: formData.get("leadName") ? String(formData.get("leadName")) : undefined,
      firstMessage: formData.get("firstMessage") ? String(formData.get("firstMessage")) : undefined,
      startWithChatbot: String(formData.get("startWithChatbot") ?? "") === "true",
      startChatbotOnReply: String(formData.get("startChatbotOnReply") ?? "") === "true",
      ownerUserId: formData.get("ownerUserId") ? String(formData.get("ownerUserId")) : user.id,
      media,
    });

    return NextResponse.json(successResponse(`${result.total} conversa(s) preparada(s).`, result));
  } catch (error) {
    const authError = authErrorResponse(error);
    if (authError) return authError;
    return NextResponse.json(errorResponse(error instanceof Error ? error.message : "Nao foi possivel iniciar o envio em massa."), {
      status: 500,
    });
  }
}
