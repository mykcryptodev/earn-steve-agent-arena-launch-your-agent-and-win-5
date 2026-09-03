# ArenaPulse Trading Strategy

ArenaPulse is a **conservative-momentum** Steve Agent designed to satisfy all minimum bounty requirements while maximizing judging scores across strategy quality, creative Steve usage, and ecosystem exploration.

## Design Principles

1. **Risk first** — Small position sizes, hard stop-losses, no revenge trading
2. **Mission-driven** — Every action maps to Arena XP or qualifying trade progress
3. **Multi-protocol** — Demonstrate Jupiter, Adrena, and bonus ecosystem tools
4. **Document everything** — Trade recaps and proof links strengthen the content score (15%)

## Qualifying Trade Plan (5+ trades)

Execute these through your Steve Agent wallet on mainnet:

| # | Protocol | Action | Size | Purpose |
|---|----------|--------|------|---------|
| 1 | Jupiter | SOL → USDC swap | ≥ 10 USDC | Baseline qualifying swap |
| 2 | Jupiter | USDC → SOL swap | ≥ 10 USDC | Reverse direction, test routing |
| 3 | Adrena | Long SOL perp | Small (≤ $25) | Directional with tight stop |
| 4 | Adrena | Close/adjust perp | — | Demonstrate risk management |
| 5 | Jupiter | SOL → USDC swap | ≥ 10 USDC | Momentum confirmation trade |
| 6+ | Phoenix or Adrena | Optional extra | Small | Depth + strategy consistency |

### Jupiter Swap Sizing

Use the included quote helper before each swap:

```bash
npm run check:jupiter -- SOL USDC 12
npm run check:jupiter -- USDC SOL 15
```

Ensure output notional is **≥ 10 USDC**. Run `npm run market:scan` for live route analysis.

### Adrena Perp Rules

- Max position: **$25 USDC equivalent**
- Stop-loss: **2–3%** from entry
- Only trade when market scanner shows clear momentum (SOL 4h trend)
- Close positions within 24h — no overnight bags during competition

## XP Roadmap (1,000+ minimum)

| Source | XP | How |
|--------|-----|-----|
| Base trading activity | ~400–600 | 5+ qualifying trades + Arena trade missions |
| Social missions | ~100–200 | X post, trade recap, agent showcase |
| SAP Registry | +250 | Complete SAP mission in Steve Arena |
| Product Feedback | +125 | Submit structured feedback mission |
| MagicBlock swap | +75 | Private swap mission |
| MagicBlock transfer | +75 | Private SPL transfer mission |
| Creator missions | variable | Tutorial, demo video, strategy thread |

**Target:** 1,500+ XP for competitive leaderboard position.

## Daily Workflow

```
Morning   → npm run market:scan (check routes & trending)
          → Review Steve Agent wallet balance
          → Plan 1–2 trades for the day

Midday    → Execute qualifying trade via Steve (Jupiter or Adrena)
          → Log transaction signature

Evening   → Check Arena XP progress
          → Complete 1 mission if available
          → Update .env progress (ARENA_XP, QUALIFYING_TRADES)

Weekly    → Submit product feedback mission
          → Post trade recap on X
          → Run npm run verify
```

## Risk Management

- **Never** exceed 20% of agent wallet in a single position
- **Never** loop swaps to artificially inflate trade count (wash trading = disqualification)
- **Always** use Steve's built-in tools — trades must come from agent wallet
- Keep SOL reserve for transaction fees (~0.05 SOL minimum)

## Judging Alignment

| Criterion (weight) | ArenaPulse approach |
|--------------------|---------------------|
| Strategy & Trading (35%) | Documented momentum + risk caps, consistent sizing |
| Creative Steve Use (30%) | Automations, multi-protocol, MagicBlock, SAP MCP |
| Arena Activity (20%) | All bonus missions, high XP, product feedback |
| Content (15%) | X post with proof, trade recaps, this repo |

## Getting Started on Steve

1. Go to [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai)
2. Sign in (Google or wallet)
3. Set handle, display name **ArenaPulse**, avatar
4. Use **Sponsored Free Lane** or fund Inference Vault
5. Connect X account
6. Navigate to Arena → Missions
7. Execute trades through Steve chat or Automations
