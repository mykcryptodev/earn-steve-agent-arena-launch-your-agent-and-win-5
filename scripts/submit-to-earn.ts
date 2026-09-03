#!/usr/bin/env tsx
/**
 * Submit Steve Agent Arena entry to Superteam Earn via Agent API.
 *
 * Prerequisites:
 *   1. Register agent: POST https://superteam.fun/api/agents
 *   2. Complete all 4 minimum requirements on steve.oobeprotocol.ai
 *   3. Set STEVE_AGENT_HANDLE, X_POST_URL, SUPERTEAM_EARN_API_KEY in .env
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const LISTING_ID = "43f663e0-ef0b-40b4-89c9-b4e11375cff5";
const EARN_API = "https://superteam.fun/api/agents/submissions/create";

function loadEnvFile(): Record<string, string> {
  const envPath = resolve(process.cwd(), ".env");
  const vars: Record<string, string> = {};
  if (!existsSync(envPath)) return vars;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

function get(env: Record<string, string>, key: string): string {
  return process.env[key] ?? env[key] ?? "";
}

async function main() {
  const env = loadEnvFile();
  const apiKey = get(env, "SUPERTEAM_EARN_API_KEY");
  const handle = get(env, "STEVE_AGENT_HANDLE");
  const xPost = get(env, "X_POST_URL");
  const listingId = get(env, "STEVE_BOUNTY_LISTING_ID") || LISTING_ID;
  const repoUrl = "https://github.com/mykcryptodev/earn-steve-agent-arena-launch-your-agent-and-win-5";

  if (!apiKey || apiKey.startsWith("sk_your")) {
    console.error("Missing SUPERTEAM_EARN_API_KEY in .env");
    console.error("Register at: curl -X POST https://superteam.fun/api/agents -H 'Content-Type: application/json' -d '{\"name\":\"your-agent\"}'");
    process.exit(1);
  }

  if (!handle || handle === "your-agent-handle") {
    console.error("Missing STEVE_AGENT_HANDLE in .env");
    process.exit(1);
  }

  if (!xPost.startsWith("https://")) {
    console.error("Missing valid X_POST_URL in .env");
    process.exit(1);
  }

  const otherInfo = [
    "ArenaPulse — Steve Agent Arena submission.",
    "",
    "Strategy: Risk-managed multi-protocol trading via Steve Agent.",
    "- Jupiter swaps (>= 10 USDC) for qualifying trades",
    "- Adrena perps with tight risk caps and momentum signals",
    "- SAP Agent Registry registration for +250 bonus XP",
    "- MagicBlock private swap/transfer missions explored",
    "- Product feedback submitted through Arena missions",
    "",
    `Steve Agent: https://steve.oobeprotocol.ai/agents/${handle}`,
    `Repository: ${repoUrl}`,
    "",
    "Tools/protocols used: Jupiter, Adrena, SAP MCP, MagicBlock, Steve Automations.",
  ].join("\n");

  const payload = {
    listingId,
    link: repoUrl,
    tweet: xPost,
    otherInfo,
    eligibilityAnswers: [
      {
        question: "Your Agent Handle on https://steve.oobeprotocol.ai/",
        answer: handle,
      },
    ],
    ask: null,
  };

  console.log("\nSubmitting to Superteam Earn...");
  console.log(`  Listing:  Steve Agent Arena (${listingId})`);
  console.log(`  Handle:   ${handle}`);
  console.log(`  X post:   ${xPost}`);
  console.log(`  Repo:     ${repoUrl}\n`);

  const res = await fetch(EARN_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json();

  if (!res.ok) {
    console.error("Submission failed:", res.status, JSON.stringify(body, null, 2));
    process.exit(1);
  }

  console.log("✅ Submission created successfully!\n");
  console.log(JSON.stringify(body, null, 2));
  console.log("\nNext: Give your Superteam Earn claim code to a human operator for payout.");
  console.log("Claim page: https://superteam.fun/earn/claim/<claim-code>\n");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
