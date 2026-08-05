import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

async function main() {
  const zapiBaseUrl = process.env.ZAPI_BASE_URL ?? "https://api.z-api.io";
  const zapiInstanceId = process.env.ZAPI_INSTANCE_ID ?? "";
  const zapiToken = process.env.ZAPI_TOKEN ?? "";
  const zapiClientToken = process.env.ZAPI_CLIENT_TOKEN ?? "";
  const zapiWhatsappNumber = process.env.ZAPI_WHATSAPP_NUMBER ?? "";
  const openAiApiKey = process.env.OPENAI_API_KEY ?? "";
  const openAiModel = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  await prisma.agent.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Marcia",
      gender: "FEMALE",
      personality:
        "Consultora Comercial da Claro. A Marcia conversa como uma consultora humana de WhatsApp. E extremamente simpatica, vendedora, persuasiva, consultiva, educada, paciente, rapida, objetiva, cordial e bem-humorada. Usa poucos emojis, adapta cada resposta ao contexto e utiliza o nome da cliente quando ja o conhece. Seu objetivo e converter o maior numero possivel de leads vindos do Meta Ads em contratos da Claro, sem nunca parecer um robo, uma inteligencia artificial ou uma secretaria eletronica.",
      rules: {
        rule_1: "Sempre manter memória persistente da conversa.",
        rule_2: "Quando responder uma pergunta fora do fluxo de vendas, utilizar a OpenAI e depois retornar ao estado atual do fluxo.",
        rule_3: "Nunca inventar preços; utilizar somente os planos cadastrados no banco de dados.",
        rule_4: "Nunca inventar cobertura; consultar sempre a base de CEPs do CRM.",
        rule_5: "Nunca pular etapas; respeitar sempre o funil do fluxo de mensagens.",
        rule_6: "Nunca pedir dois documentos ao mesmo tempo.",
        rule_7: "Nunca responder sobre política ou religião.",
        rule_8: "Nunca conversar fora do contexto comercial e sempre conduzir para a venda.",
        rule_9: "Utilizar no máximo um emoji por mensagem.",
        rule_10: "Quando o cliente recusar o plano, tentar quebrar a objeção apresentando vantagens da Claro por até três tentativas.",
        rule_11: "Após três recusas, responder: Entendo! Se mudar de ideia ou precisar de alguma informação é só me avisar. 😁",
      },
      flow: {
        steps: ["START", "ASK_NAME", "ASK_CEP", "SHOW_PLANS", "FINISHED"],
      },
      minTypingSeconds: 2,
      maxTypingSeconds: 4,
      enableReadReceipt: true,
      enableTyping: true,
      enableReplyDelay: true,
      openAiModel,
      zapiBaseUrl,
      zapiInstanceId,
      zapiToken,
      zapiClientToken,
      zapiWhatsappNumber,
    },
    update: {
      name: "Marcia",
      gender: "FEMALE",
      personality:
        "Consultora Comercial da Claro. A Marcia conversa como uma consultora humana de WhatsApp. E extremamente simpatica, vendedora, persuasiva, consultiva, educada, paciente, rapida, objetiva, cordial e bem-humorada. Usa poucos emojis, adapta cada resposta ao contexto e utiliza o nome da cliente quando ja o conhece. Seu objetivo e converter o maior numero possivel de leads vindos do Meta Ads em contratos da Claro, sem nunca parecer um robo, uma inteligencia artificial ou uma secretaria eletronica.",
      rules: {
        rule_1: "Sempre manter memória persistente da conversa.",
        rule_2: "Quando responder uma pergunta fora do fluxo de vendas, utilizar a OpenAI e depois retornar ao estado atual do fluxo.",
        rule_3: "Nunca inventar preços; utilizar somente os planos cadastrados no banco de dados.",
        rule_4: "Nunca inventar cobertura; consultar sempre a base de CEPs do CRM.",
        rule_5: "Nunca pular etapas; respeitar sempre o funil do fluxo de mensagens.",
        rule_6: "Nunca pedir dois documentos ao mesmo tempo.",
        rule_7: "Nunca responder sobre política ou religião.",
        rule_8: "Nunca conversar fora do contexto comercial e sempre conduzir para a venda.",
        rule_9: "Utilizar no máximo um emoji por mensagem.",
        rule_10: "Quando o cliente recusar o plano, tentar quebrar a objeção apresentando vantagens da Claro por até três tentativas.",
        rule_11: "Após três recusas, responder: Entendo! Se mudar de ideia ou precisar de alguma informação é só me avisar. 😁",
      },
      active: true,
      minTypingSeconds: 2,
      maxTypingSeconds: 4,
      openAiModel,
      zapiBaseUrl,
      zapiInstanceId,
      zapiToken,
      zapiClientToken,
      zapiWhatsappNumber,
    },
  });

  const plans = [
    { name: "Central Start", speed: "300 Mega", price: 99.9, order: 1 },
    { name: "Central Plus", speed: "500 Mega", price: 119.9, order: 2 },
    { name: "Central Ultra", speed: "700 Mega", price: 149.9, order: 3 },
  ];

  for (const plan of plans) {
    const existing = await prisma.plan.findFirst({
      where: { name: plan.name, deletedAt: null },
    });

    if (!existing) {
      await prisma.plan.create({
        data: {
          ...plan,
          description: "Plano inicial cadastrado para operacao comercial.",
          active: true,
        },
      });
    }
  }

  await prisma.appSetting.upsert({
    where: { key: "expenses" },
    create: { key: "expenses", value: 0 },
    update: {},
  });

  const integrationSettings = [
    { key: "openAiApiKey", value: openAiApiKey },
    { key: "openAiModel", value: openAiModel },
    { key: "zapiBaseUrl", value: zapiBaseUrl },
    { key: "zapiInstanceId", value: zapiInstanceId },
    { key: "zapiToken", value: zapiToken },
    { key: "zapiClientToken", value: zapiClientToken },
    { key: "zapiWhatsappNumber", value: zapiWhatsappNumber },
  ];

  for (const setting of integrationSettings) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: { value: setting.value },
    });
  }

  const adminEmail = process.env.ADMIN_INITIAL_EMAIL ?? "admin@centraldosplanos.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD ?? "acesso@2026";
  const adminPasswordHash = await hashPassword(adminPassword);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      name: "Administrador Central dos Planos",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
      title: "Administrador",
      permissions: {},
    },
    update: {
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed concluido.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
