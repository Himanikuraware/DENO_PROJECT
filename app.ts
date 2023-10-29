const text = "This is the test.";

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile("message.txt", data).then(() => {
  console.log("Saved file!");
});
