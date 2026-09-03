#!/usr/bin/env tsx
/**
 * Jupiter quote helper — fetches live swap routes for ArenaPulse trade planning.
 * Uses Jupiter Lite API (no wallet required).
 *
 * Usage:
 *   npm run check:jupiter -- SOL USDC 10
 *   npm run check:jupiter -- USDC SOL 15
 */

const JUPITER_QUOTE_URL = "https://lite-api.jup.ag/swap/v1/quote";

const TOKEN_MINTS: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const inputSymbol = (args[0] ?? "SOL").toUpperCase();
  const outputSymbol = (args[1] ?? "USDC").toUpperCase();
  const amountUsd = Number(args[2] ?? "10");

  const inputMint = TOKEN_MINTS[inputSymbol];
  const outputMint = TOKEN_MINTS[outputSymbol];

  if (!inputMint || !outputMint) {
    throw new Error(`Unsupported token pair. Supported: ${Object.keys(TOKEN_MINTS).join(", ")}`);
  }

  // Approximate SOL price for sizing; Jupiter uses raw amounts
  const solPriceUsd = 150;
  let amountRaw: number;

  if (inputSymbol === "SOL") {
    amountRaw = Math.floor((amountUsd / solPriceUsd) * 1e9);
  } else if (inputSymbol === "USDC") {
    amountRaw = Math.floor(amountUsd * 1e6);
  } else {
    throw new Error("Amount conversion only implemented for SOL and USDC");
  }

  return { inputSymbol, outputSymbol, inputMint, outputMint, amountUsd, amountRaw };
}

async function fetchQuote(
  inputMint: string,
  outputMint: string,
  amount: number
) {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount: String(amount),
    slippageBps: "50",
  });

  const res = await fetch(`${JUPITER_QUOTE_URL}?${params}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jupiter quote failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function main() {
  const { inputSymbol, outputSymbol, inputMint, outputMint, amountUsd, amountRaw } =
    parseArgs();

  console.log(`\nArenaPulse — Jupiter Quote Check`);
  console.log(`Pair: ${inputSymbol} → ${outputSymbol}`);
  console.log(`Target notional: ~$${amountUsd} USDC`);
  console.log(`Raw input amount: ${amountRaw}\n`);

  const quote = await fetchQuote(inputMint, outputMint, amountRaw);

  const outAmount =
    outputSymbol === "USDC"
      ? Number(quote.outAmount) / 1e6
      : Number(quote.outAmount) / 1e9;

  const usdcNotional =
    outputSymbol === "USDC"
      ? outAmount
      : inputSymbol === "USDC"
        ? amountUsd
        : outAmount;

  console.log("Route found:", quote.routePlan?.length ?? 0, "hop(s)");
  console.log(`Estimated output: ${outAmount.toFixed(4)} ${outputSymbol}`);
  console.log(`Price impact: ${quote.priceImpactPct ?? "n/a"}%`);
  console.log(
    `Qualifying trade: ${usdcNotional >= 10 ? "YES (>= 10 USDC)" : "NO (< 10 USDC minimum)"}`
  );
  console.log("\nExecute this swap through your Steve Agent wallet at steve.oobeprotocol.ai");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
