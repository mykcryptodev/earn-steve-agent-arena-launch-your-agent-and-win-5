#!/usr/bin/env tsx
/**
 * Market scanner — aggregates Jupiter quotes and DexScreener trending pairs
 * to inform ArenaPulse trade decisions before executing via Steve.
 */

const JUPITER_QUOTE_URL = "https://lite-api.jup.ag/swap/v1/quote";
const DEXSCREENER_TRENDING = "https://api.dexscreener.com/token-boosts/top/v1";

const SOL = "So11111111111111111111111111111111111111112";
const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

async function getSolToUsdcQuote(solAmount: number) {
  const params = new URLSearchParams({
    inputMint: SOL,
    outputMint: USDC,
    amount: String(Math.floor(solAmount * 1e9)),
    slippageBps: "50",
  });
  const res = await fetch(`${JUPITER_QUOTE_URL}?${params}`);
  if (!res.ok) return null;
  return res.json();
}

async function getTrendingTokens() {
  const res = await fetch(DEXSCREENER_TRENDING);
  if (!res.ok) return [];
  const data = await res.json();
  return (Array.isArray(data) ? data : [])
    .filter((t: { chainId?: string }) => t.chainId === "solana")
    .slice(0, 5);
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║     ArenaPulse Market Scanner — Steve Arena      ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // SOL/USDC baseline quote for qualifying Jupiter swap sizing
  const solSizes = [0.07, 0.1, 0.15]; // ~$10-22 at typical SOL prices
  console.log("── Jupiter SOL → USDC Quotes (qualifying swap sizing) ──\n");

  for (const sol of solSizes) {
    const quote = await getSolToUsdcQuote(sol);
    if (!quote) {
      console.log(`  ${sol} SOL → quote unavailable`);
      continue;
    }
    const usdcOut = Number(quote.outAmount) / 1e6;
    const qualifies = usdcOut >= 10 ? "✓ qualifies" : "✗ below 10 USDC min";
    console.log(
      `  ${sol} SOL → ~$${usdcOut.toFixed(2)} USDC | impact ${quote.priceImpactPct ?? "?"}% | ${qualifies}`
    );
  }

  console.log("\n── DexScreener Trending (Solana, top 5) ──\n");
  const trending = await getTrendingTokens();
  if (trending.length === 0) {
    console.log("  No trending data available.");
  } else {
    for (const token of trending) {
      console.log(`  • ${token.tokenAddress?.slice(0, 8)}… — ${token.description ?? "trending"}`);
    }
  }

  console.log("\n── ArenaPulse Trade Plan ──\n");
  console.log("  1. Use Sponsored Free Lane or fund Inference Vault at steve.oobeprotocol.ai");
  console.log("  2. Execute 5+ qualifying trades:");
  console.log("     • Jupiter swaps >= 10 USDC");
  console.log("     • Adrena or Phoenix perps (directional, risk-capped)");
  console.log("  3. Complete Arena missions for bonus XP (+250 SAP, +150 MagicBlock, +125 feedback)");
  console.log("  4. Reach 1,000 XP before 2026-09-16 21:59 UTC");
  console.log("  5. Post on X tagging @SteveTheAgentAI and @OOBEonSol\n");
}

main().catch((err) => {
  console.error("Scanner error:", err.message);
  process.exit(1);
});
