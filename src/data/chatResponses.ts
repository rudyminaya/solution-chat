import { MessageType, Sender } from "../types/chat";

export const chatMockData: {
  initialOptions: MessageType;
  aboutCompany: MessageType;
  aboutCompanyAnswers: {
    history: MessageType;
    services: MessageType;
    team: MessageType;
    contact: MessageType;
  };
  freeQueryExample: MessageType;
} = {
  initialOptions: {
    id: "welcome",
    content:
      "¡Hola! Soy tu asistente virtual de ViajaFácil. ¿Qué te gustaría hacer?",
    options: [
      { id: "about_company", label: "Conocer la empresa" },
      { id: "free_query", label: "Hacer otra consulta" },
    ],
    attachments: [],
    sender: Sender.System,
    timestamp: Date.now(),
  },

  aboutCompany: {
    id: "about_company_options",
    content: "Claro, ¿qué aspecto de la empresa te interesa conocer?",
    options: [
      { id: "history", label: "Nuestra historia" },
      { id: "services", label: "Servicios de consultoría de viajes" },
      { id: "team", label: "Conoce al equipo" },
      { id: "contact", label: "Información de contacto" },
    ],
    attachments: [],
    sender: Sender.System,
    timestamp: Date.now(),
  },

  aboutCompanyAnswers: {
    history: {
      id: "history",
      attachments: [],
      sender: Sender.System,
      timestamp: Date.now(),
      content:
        "ViajaFácil nació en 2012 con la misión de simplificar la planificación de viajes. Hemos ayudado a más de 50,000 personas a encontrar experiencias únicas y personalizadas.",
    },
    services: {
      id: "services",
      attachments: [],
      sender: Sender.System,
      timestamp: Date.now(),
      content:
        "Ofrecemos consultoría en viajes de placer, negocios y estudios en el extranjero. Analizamos tus necesidades y diseñamos itinerarios optimizados. También te asistimos con reservas, seguros y documentación.",
    },
    team: {
      id: "team",
      attachments: [],
      sender: Sender.System,
      timestamp: Date.now(),
      content:
        "Nuestro equipo está formado por consultores expertos con experiencia en más de 40 países. Amamos viajar y nuestra misión es que disfrutes cada etapa de tu experiencia.",
    },
    contact: {
      id: "contact",
      attachments: [],
      sender: Sender.System,
      timestamp: Date.now(),
      content:
        "Puedes escribirnos a contacto@viajafacil.com o llamarnos al +51 999 888 777. También estamos en redes sociales como @ViajaFacil.",
    },
  },

  freeQueryExample: {
    id: "free_query",
    attachments: [],
    sender: Sender.System,
    timestamp: Date.now(),
    content:
      "Claro, cuéntame tu consulta y te derivaré con un experto en el menor tiempo posible.",
  },
};
