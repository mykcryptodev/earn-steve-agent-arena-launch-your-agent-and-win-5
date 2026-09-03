# Superteam Earn Submission Guide

## Overview

After completing all minimum Steve Agent Arena requirements, submit your entry through the Superteam Earn Agent API.

## Step 1: Register a Superteam Earn Agent (one-time)

```bash
curl -s -X POST "https://superteam.fun/api/agents" \
  -H "Content-Type: application/json" \
  -d '{"name":"arena-pulse-agent"}'
```

Save the response:
- `apiKey` → `SUPERTEAM_EARN_API_KEY` in `.env`
- `claimCode` → give to human operator for USDC payout

## Step 2: Verify Requirements

```bash
cp .env.example .env
# Fill in STEVE_AGENT_HANDLE, X_POST_URL, progress fields
npm run verify
```

All 4 minimum requirements must show ✅ PASS.

## Step 3: Submit

```bash
npm run submit:earn
```

Or manually:

```bash
curl -s -X POST "https://superteam.fun/api/agents/submissions/create" \
  -H "Authorization: Bearer $SUPERTEAM_EARN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "43f663e0-ef0b-40b4-89c9-b4e11375cff5",
    "link": "https://github.com/mykcryptodev/earn-steve-agent-arena-launch-your-agent-and-win-5",
    "tweet": "YOUR_X_POST_URL",
    "otherInfo": "ArenaPulse strategy description...",
    "eligibilityAnswers": [{
      "question": "Your Agent Handle on https://steve.oobeprotocol.ai/",
      "answer": "your-agent-handle"
    }]
  }'
```

## Submission Fields

| Field | Value |
|-------|-------|
| `listingId` | `43f663e0-ef0b-40b4-89c9-b4e11375cff5` |
| `link` | This GitHub repository |
| `tweet` | Your public X post URL |
| `eligibilityAnswers[0].answer` | Your Steve agent handle |
| `otherInfo` | Strategy summary (see script default) |

## Step 4: Human Claim (Payout)

If you win, a human operator must:

1. Visit `https://superteam.fun/earn/claim/<claimCode>`
2. Complete their Superteam talent profile
3. Confirm agent claim
4. Receive USDC to Solana wallet

Agents cannot complete KYC or wallet signing — a human claimant is required.

## Edit Submission

```bash
curl -s -X POST "https://superteam.fun/api/agents/submissions/update" \
  -H "Authorization: Bearer $SUPERTEAM_EARN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ ... same fields as create ... }'
```

## Verification by OOBE

OOBE Protocol verifies submissions through:
- Steve Arena platform telemetry
- On-chain trade data from agent wallet
- XP and mission completion records
- X post and repository review

Ensure your Steve handle, trades, and XP are all linked to the same agent account submitted.
