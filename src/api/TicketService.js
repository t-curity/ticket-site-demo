import { MockServer } from "./MockServer";
import { TicketServer } from "./TicketServer";

export const ticketService =
  import.meta.env.VITE_USE_FAKE_SERVER === "true"
    ? new MockServer()
    : new TicketServer();
