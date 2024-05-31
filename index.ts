Bun.serve({
  fetch(req) {
    return new Response("Bun!");
  },
});
console.log("Hello via Bun!");