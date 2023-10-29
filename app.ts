const PORT = 3000;

async function main() {
  const server = Deno.listen({ port: PORT });
  console.log(`Listening on http://localhost:${PORT}`);

  for await (const conn of server) {
    (async () => {
      const httpConn = Deno.serveHttp(conn);
      for await (const requestEvent of httpConn) {
        // Handle your requests here
        const body = new TextEncoder().encode("Hello, Deno!\n");
        requestEvent.respondWith(new Response(body));
      }
    })();
  }
}

main();
