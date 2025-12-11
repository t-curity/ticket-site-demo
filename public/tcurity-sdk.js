class TCuritySDK {
  static async captcha(client_id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Captcha requested with client_id: ${client_id}`);
        resolve("mock-session-id-12345");
      }, 100);
    });
  }
}

window.TCuritySDK = TCuritySDK;
