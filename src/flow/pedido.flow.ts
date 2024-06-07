import { addKeyword } from "@builderbot/bot";

export const pedidoFlow = addKeyword(["2","pedir"], { sensitive: true })
.addAnswer(["¡Hola! Soy Rossini, tu mesera virtual. 🥳",
"Estoy aquí para ayudarte con tu pedido. Dime qué te gustaría ordenar y me encargaré de todo. 🍕🍝🍷"])
.addAction();
