import axios from "axios";
import { toast } from "sonner";

import messages from "../data/messages";

export class TicketServer {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  }

  async verify(session_id) {
    try {
      if (this.baseUrl === "") {
        throw new Error(messages.ERROR.NO_API_BASE_URL);
      }

      const response = await axios.post(`${this.baseUrl}/captcha/verify`, {
        session_id: session_id,
      });

      return response.data.status === "COMPLETED";
    } catch {
      toast.error(messages.CAPTCHA.FAIL);
      return false;
    }
  }
}
