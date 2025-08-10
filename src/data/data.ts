import { ConversationType, Sender } from "@/src/types/chat";

export const dataConversations: ConversationType[] = [
  {
    id: "a1b2c3d4-e5f6-4a5b-9c8d-1e2f3a4b5c6d",
    title: "Consulta sobre productos",
    createdAt: new Date("2023-05-15T10:00:00Z"),
    updatedAt: new Date("2023-05-15T10:02:30Z"),
    messages: [
      {
        id: "m1a2b3c4-d5e6-4f7a-8b9c-1d2e3f4a5b6c",
        content: "Hola, ¿qué productos tienen disponibles?",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-15T10:00:00Z"),
        attachments: [],
      },
      {
        id: "m2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7d",
        content:
          "Tenemos una variedad de productos electrónicos y para el hogar. ¿Algún área en particular le interesa?",
        sender: Sender.System,
        timestamp: Date.parse("2023-05-15T10:01:15Z"),
        attachments: [],
      },
      {
        id: "m3c4d5e6-f7a8-4b9c-1d2e-3f4a5b6c7d8e",
        content: "Me interesan los electrodomésticos inteligentes",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-15T10:02:30Z"),
        attachments: [],
      },
    ],
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e",
    title: "Problema con mi pedido",
    createdAt: new Date("2023-05-16T14:30:00Z"),
    updatedAt: new Date("2023-05-16T14:35:22Z"),
    messages: [
      {
        id: "m4d5e6f7-a8b9-4c1d-2e3f-4a5b6c7d8e9f",
        content: "Mi pedido #12345 no ha llegado aún",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-16T14:30:00Z"),
        attachments: ["recibo.pdf"],
      },
      {
        id: "m5e6f7a8-b9c1-4d2e-3f4a-5b6c7d8e9f1a",
        content:
          "Lamentamos el inconveniente. Déjeme verificar el estado de su pedido...",
        sender: Sender.System,
        timestamp: Date.parse("2023-05-16T14:31:45Z"),
        attachments: [],
      },
      {
        id: "m6f7a8b9-c1d2-4e3f-4a5b-6c7d8e9f1a2b",
        content:
          "Según nuestro sistema, hubo un retraso en el envío pero ya está en camino. Le enviaremos un correo con la actualización.",
        sender: Sender.System,
        timestamp: Date.parse("2023-05-16T14:33:20Z"),
        attachments: [],
      },
      {
        id: "m7a8b9c1-d2e3-4f4a-5b6c-7d8e9f1a2b3c",
        content: "Gracias por la información. Esperaré el correo entonces.",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-16T14:35:22Z"),
        attachments: [],
      },
    ],
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f",
    title: "Soporte técnico",
    createdAt: new Date("2023-05-17T09:15:00Z"),
    updatedAt: new Date("2023-05-17T09:20:10Z"),
    messages: [
      {
        id: "m8b9c1d2-e3f4-4a5b-6c7d-8e9f1a2b3c4d",
        content: "Mi dispositivo no enciende después de la actualización",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-17T09:15:00Z"),
        attachments: ["error.jpg"],
      },
      {
        id: "m9c1d2e3-f4a5-4b6c-7d8e-9f1a2b3c4d5e",
        content:
          "Por favor intente mantener presionado el botón de encendido por 15 segundos para forzar un reinicio.",
        sender: Sender.System,
        timestamp: Date.parse("2023-05-17T09:17:30Z"),
        attachments: [],
      },
      {
        id: "m1d2e3f4-a5b6-4c7d-8e9f-1a2b3c4d5e6f",
        content: "Funcionó! Gracias por la ayuda.",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-17T09:20:10Z"),
        attachments: [],
      },
    ],
  },
  {
    id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a",
    title: "Consulta general",
    createdAt: new Date("2023-05-18T16:45:00Z"),
    updatedAt: new Date("2023-05-18T16:45:00Z"),
    messages: [
      {
        id: "m2e3f4a5-b6c7-4d8e-9f1a-2b3c4d5e6f7a",
        content: "¿Cuál es su horario de atención?",
        sender: Sender.User,
        timestamp: Date.parse("2023-05-18T16:45:00Z"),
        attachments: [],
      },
    ],
  },
];
