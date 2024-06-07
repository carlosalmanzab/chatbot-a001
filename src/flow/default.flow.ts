import { EVENTS, addKeyword } from "@builderbot/bot";

export const defaultFlow = addKeyword(EVENTS.TEMPLATE).addAnswer("¡Hola! Lo siento, ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde o contáctanos para obtener ayuda. ¡Gracias por tu comprensión!")