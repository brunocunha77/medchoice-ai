import { mkdir, writeFile } from "node:fs/promises";

const lines = [];

if (process.env.OPENAI_API_KEY) {
  lines.push(`OPENAI_API_KEY=${JSON.stringify(process.env.OPENAI_API_KEY)}`);
}

await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/.dev.vars", `${lines.join("\n")}\n`, { mode: 0o600 });
