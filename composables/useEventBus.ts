import mitt from "mitt";
import type { ApplicationEvents } from "~/types/applicationEvents";

const emitter = mitt<ApplicationEvents>();

export const useGlobalEvent = emitter.emit;
export const useGlobalListen = emitter.on;
