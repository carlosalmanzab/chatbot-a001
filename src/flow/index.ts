import { createFlow } from "@builderbot/bot";
import { welcomeFlow } from "./welcome.flow";

export const flow = createFlow([
    welcomeFlow,
])