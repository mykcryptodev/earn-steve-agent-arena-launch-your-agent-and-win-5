# Steve Agent Arena: Launch Your Agent & Win 500 USDC

**ArenaPulse** — A submission-ready Steve Agent Arena package for the [OOBE Protocol bounty on Superteam Earn](https://superteam.fun/earn/listing/steve-agent-arena-launch-your-agent-and-win-500-usdc).

Create your agent on [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai), compete in the Arena for XP, execute qualifying Solana trades, and submit through Superteam Earn for a chance at **500 USDC**.

| | |
|---|---|
| **Bounty** | Steve Agent Arena: Launch Your Agent & Win 500 USDC |
| **Sponsor** | [OOBE Protocol](https://oobeprotocol.ai) |
| **Deadline** | 2026-09-16T21:59:59.000Z |
| **Prize Pool** | 500 USDC (🥇 250 · 🥈 150 · 🥉 100) |
| **Listing ID** | `43f663e0-ef0b-40b4-89c9-b4e11375cff5` |

---

## What Is ArenaPulse?

ArenaPulse is a **risk-managed multi-protocol trading agent** built for the Steve Agent Arena competition. It combines:

- **Jupiter swaps** (≥ 10 USDC) for qualifying trades
- **Adrena perps** with tight risk caps and momentum signals
- **SAP Agent Registry** integration for +250 bonus XP
- **MagicBlock** private swap/transfer missions
- **Structured product feedback** for +125 bonus XP

This repository contains the strategy, mission checklists, market tooling, and Superteam Earn submission scripts — everything needed for a polished bounty submission.

---

## Minimum Requirements (All 4 Required)

| # | Requirement | How |
|---|-------------|-----|
| 1 | **Create Steve Agent** | Sign in at [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai), set handle/name/avatar |
| 2 | **Connect X + post** | Public post tagging [@SteveTheAgentAI](https://x.com/SteveTheAgentAI) and [@OOBEonSol](https://x.com/OOBEonSol) |
| 3 | **1,000 Arena XP** | Trades, missions, social activity — tracked automatically |
| 4 | **5+ qualifying trades** | Adrena/Phoenix perps or Jupiter swaps ≥ 10 USDC via agent wallet |

See [docs/MISSIONS-CHECKLIST.md](docs/MISSIONS-CHECKLIST.md) for the full step-by-step checklist.

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/mykcryptodev/earn-steve-agent-arena-launch-your-agent-and-win-5.git
cd earn-steve-agent-arena-launch-your-agent-and-win-5
npm install
```

### 2. Create your Steve Agent

1. Go to [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai)
2. Sign in and complete onboarding
3. Set your agent handle, display name, and avatar
4. Fund via **Sponsored Free Lane** or Inference Vault

### 3. Configure environment

```bash
cp .env.example .env
```

Fill in your Steve handle, X post URL, and progress as you complete requirements.

### 4. Run market tools

```bash
# Scan Jupiter routes and trending tokens
npm run market:scan

# Check a specific swap meets the 10 USDC minimum
npm run check:jupiter -- SOL USDC 12
```

### 5. Execute trades and missions on Steve

Follow the trading plan in [docs/STRATEGY.md](docs/STRATEGY.md):

- 5+ qualifying trades (Jupiter ≥ 10 USDC, Adrena/Phoenix perps)
- Arena missions for bonus XP (SAP +250, MagicBlock +150, Feedback +125)
- Reach 1,000+ XP

### 6. Verify and submit

```bash
npm run verify        # Check all 4 minimum requirements
npm run submit:earn   # Submit to Superteam Earn
```

Full submission instructions: [docs/SUBMISSION-GUIDE.md](docs/SUBMISSION-GUIDE.md)

---

## Repository Structure

```
├── agent/
│   └── manifest.json          # ArenaPulse agent profile and strategy config
├── content/
│   └── x-post-template.md     # X post templates for requirement #2
├── docs/
│   ├── STRATEGY.md            # Trading strategy and daily workflow
│   ├── MISSIONS-CHECKLIST.md  # Step-by-step requirement tracker
│   └── SUBMISSION-GUIDE.md    # Superteam Earn API submission
├── scripts/
│   ├── market-scanner.ts      # Jupiter quotes + DexScreener trending
│   ├── jupiter-quote.ts       # Pre-trade swap sizing validator
│   ├── verify-requirements.ts # Progress checker against .env
│   └── submit-to-earn.ts      # Superteam Earn submission automation
├── bounty-original.md         # Full bounty text from Superteam Earn
├── .env.example               # Environment template
└── package.json
```

---

## Trading Strategy Summary

ArenaPulse uses a **conservative-momentum** approach optimized for bounty judging criteria:

| Judging Criteria | Weight | ArenaPulse Focus |
|------------------|--------|------------------|
| Agent Strategy & Trading Quality | 35% | Risk caps, consistent sizing, documented decisions |
| Creative Use of Steve | 30% | Automations, multi-protocol, MagicBlock, SAP MCP |
| Arena Activity & Ecosystem | 20% | All bonus missions, high XP, product feedback |
| Content & Community | 15% | X post with proof, trade recaps, this repository |

**Positive PnL is not required to win.** Strategy, risk management, and meaningful activity matter more than raw profits.

Full strategy: [docs/STRATEGY.md](docs/STRATEGY.md)

---

## Bonus XP Opportunities

| Mission | XP | Where |
|---------|-----|-------|
| SAP Agent Registry | +250 | [Arena Missions](https://steve.oobeprotocol.ai/arena#agent/arena/missions) |
| MagicBlock private swap | +75 | Steve Arena missions |
| MagicBlock private transfer | +75 | Steve Arena missions |
| Product Feedback | +125 | Steve Arena missions |
| Social & creator missions | variable | Trade recaps, tutorials, demos |

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run market:scan` | Live Jupiter quotes + DexScreener trending analysis |
| `npm run check:jupiter -- SOL USDC 12` | Validate swap sizing meets 10 USDC minimum |
| `npm run verify` | Check minimum requirement progress from `.env` |
| `npm run submit:earn` | Submit entry to Superteam Earn Agent API |

---

## Superteam Earn Submission

**Eligibility question:** Your Agent Handle on https://steve.oobeprotocol.ai/

**Required fields:**
- Steve agent handle
- Link to public X post
- Repository link (this repo)
- Strategy description

Register a Superteam Earn agent to get an API key:

```bash
curl -s -X POST "https://superteam.fun/api/agents" \
  -H "Content-Type: application/json" \
  -d '{"name":"arena-pulse-agent"}'
```

Save `apiKey` and `claimCode`. A human operator uses the claim code at [superteam.fun/earn/claim](https://superteam.fun/earn/claim/) to receive USDC payouts.

Details: [docs/SUBMISSION-GUIDE.md](docs/SUBMISSION-GUIDE.md) · [superteam.fun/skill.md](https://superteam.fun/skill.md)

---

## Timeline

| Phase | Dates |
|-------|-------|
| Competition | Days 1–14 (through 2026-09-16 21:59 UTC) |
| Verification | Days 15–21 |
| Winners announced | End of week 3 (~2026-09-23) |

All qualifying and bonus activity must complete **before** the competition closes.

---

## Rules (Summary)

- One participating agent per person
- No wash trading or self-dealing
- Trades must come from your Steve Agent wallet
- Each ecosystem bonus earned once per agent
- OOBE may disqualify abusive or manipulated activity

Full rules: [bounty-original.md](bounty-original.md)

---

## Support & Links

| Resource | URL |
|----------|-----|
| Steve Agent Platform | [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai) |
| Arena Missions | [steve.oobeprotocol.ai/arena/missions](https://steve.oobeprotocol.ai/arena#agent/arena/missions) |
| Arena Leaderboard | [steve.oobeprotocol.ai/arena/leaderboard](https://steve.oobeprotocol.ai/arena/leaderboard) |
| SAP Explorer | [explorer.oobeprotocol.ai](https://explorer.oobeprotocol.ai) |
| Superteam Earn Listing | [Listing page](https://superteam.fun/earn/listing/steve-agent-arena-launch-your-agent-and-win-500-usdc) |
| OOBE Linktree | [linktr.ee/OOBE_Protocol](https://linktr.ee/OOBE_Protocol) |

---

## Acknowledgements

Built for **Steve Agent Arena: Launch Your Agent & Win 500 USDC** by [OOBE Protocol](https://oobeprotocol.ai) on [Superteam Earn](https://superteam.fun/earn/agents/).

Steve is powered by OOBE's runtime and SAP MCP — turning on-chain agent infrastructure into an experience anyone can use.

**Build your Steve. Put it to work. Climb the Arena.**
