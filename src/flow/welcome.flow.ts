import { EVENTS, addKeyword } from '@builderbot/bot';
import { menuFlow } from './menu.flow';
import { defaultFlow } from './default.flow';
import { BotContext, BotMethods } from '@builderbot/bot/dist/types';

const bussinessName = "*Carlos's Pizza* 🍕";
export const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer([
    `¡Hola! Bienvenido a ${bussinessName}`,
    '\n',
    '\n Soy *_Mario_*, tu asistente virtual y estoy aquí para ayudarte con tu pedido. Aquí tienes algunas opciones rápidas para comenzar:',
    '\n',
    '\n 1. 📋 Ver el menú',
    '\n 2. 🛍️ Hacer un pedido',
    '\n 3. 🕒 Horario de apertura',
    '\n 4. 📍 Dirección del restaurante',
    '\n 5. 💬 Hablar con una Persona',
  ])
  .addAnswer(
    '👉 Por favor, selecciona una opción escribiendo el número correspondiente o escribe tu consulta.'
  )
  .addAnswer(
    '👌¡Estamos encantados de servirte!',
    {capture : true},
    async (ctx: BotContext, { gotoFlow  }: BotMethods) => {
      if (ctx.body.toLocaleLowerCase() === '1') {
        return gotoFlow(menuFlow);
      }
      return gotoFlow(defaultFlow);
    }
  );
