#!/usr/bin/env tsx
/**
 * Tracks Steve Agent Arena minimum requirement progress.
 * Update values in .env or pass as environment variables.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

interface Requirements {
  steveAgentHandle: string;
  xPostUrl: string;
  arenaXp: number;
  qualifyingTrades: number;
  sapRegistered: boolean;
  magicblockSwap: boolean;
  magicblockTransfer: boolean;
  productFeedback: boolean;
}

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

function get(env: Record<string, string>, key: string, fallback = ""): string {
  return process.env[key] ?? env[key] ?? fallback;
}

function getBool(env: Record<string, string>, key: string): boolean {
  const val = get(env, key, "false").toLowerCase();
  return val === "true" || val === "1" || val === "yes";
}

function getNum(env: Record<string, string>, key: string): number {
  return Number(get(env, key, "0")) || 0;
}

function status(passed: boolean): string {
  return passed ? "✅ PASS" : "❌ TODO";
}

function main() {
  const env = loadEnvFile();

  const req: Requirements = {
    steveAgentHandle: get(env, "STEVE_AGENT_HANDLE"),
    xPostUrl: get(env, "X_POST_URL"),
    arenaXp: getNum(env, "ARENA_XP"),
    qualifyingTrades: getNum(env, "QUALIFYING_TRADES"),
    sapRegistered: getBool(env, "SAP_REGISTERED"),
    magicblockSwap: getBool(env, "MAGICBLOCK_SWAP"),
    magicblockTransfer: getBool(env, "MAGICBLOCK_TRANSFER"),
    productFeedback: getBool(env, "PRODUCT_FEEDBACK"),
  };

  const minReqs = [
    {
      id: 1,
      label: "Create Steve Agent (handle set)",
      passed: req.steveAgentHandle.length > 0 && req.steveAgentHandle !== "your-agent-handle",
    },
    {
      id: 2,
      label: "Connect X + public post URL",
      passed: req.xPostUrl.startsWith("https://x.com/") || req.xPostUrl.startsWith("https://twitter.com/"),
    },
    {
      id: 3,
      label: "Reach 1,000 Arena XP",
      passed: req.arenaXp >= 1000,
      detail: `${req.arenaXp} / 1000 XP`,
    },
    {
      id: 4,
      label: "Complete 5+ qualifying trades",
      passed: req.qualifyingTrades >= 5,
      detail: `${req.qualifyingTrades} / 5 trades`,
    },
  ];

  const bonusReqs = [
    { label: "SAP Agent Registry (+250 XP)", passed: req.sapRegistered },
    { label: "MagicBlock private swap (+75 XP)", passed: req.magicblockSwap },
    { label: "MagicBlock private transfer (+75 XP)", passed: req.magicblockTransfer },
    { label: "Product Feedback (+125 XP)", passed: req.productFeedback },
  ];

  const minPassed = minReqs.filter((r) => r.passed).length;
  const bonusPassed = bonusReqs.filter((r) => r.passed).length;
  const readyToSubmit = minReqs.every((r) => r.passed);

  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║   Steve Agent Arena — Requirements Verification  ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  console.log("Minimum Requirements (must complete all 4):\n");
  for (const r of minReqs) {
    const detail = r.detail ? ` (${r.detail})` : "";
    console.log(`  ${status(r.passed)}  ${r.id}. ${r.label}${detail}`);
  }

  console.log(`\n  Progress: ${minPassed}/4 minimum requirements met\n`);

  console.log("Bonus Missions (optional, increase ranking):\n");
  for (const r of bonusReqs) {
    console.log(`  ${status(r.passed)}  ${r.label}`);
  }
  console.log(`\n  Progress: ${bonusPassed}/4 bonus missions completed\n`);

  if (req.steveAgentHandle && req.steveAgentHandle !== "your-agent-handle") {
    console.log(`Steve profile: https://steve.oobeprotocol.ai/agents/${req.steveAgentHandle}`);
  }
  console.log(`Arena missions: https://steve.oobeprotocol.ai/arena#agent/arena/missions`);
  console.log(`Leaderboard:    https://steve.oobeprotocol.ai/arena/leaderboard\n`);

  if (readyToSubmit) {
    console.log("🎯 All minimum requirements met — ready to submit via Superteam Earn!");
    console.log("   Run: npm run submit:earn\n");
  } else {
    console.log("⏳ Complete remaining requirements before submitting.\n");
    console.log("   Update progress in .env, then re-run: npm run verify\n");
  }

  process.exit(readyToSubmit ? 0 : 1);
}

main();
