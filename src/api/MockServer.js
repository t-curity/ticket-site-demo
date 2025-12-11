export class MockServer {
  async verify(session_id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Mock verify called with session_id: ${session_id}`);
        resolve(true);
      }, 100);
    });
  }
}
