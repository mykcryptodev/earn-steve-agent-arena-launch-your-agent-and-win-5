# Steve Agent Arena — Mission Checklist

Track progress for all minimum and bonus requirements. Update `.env` after each completion, then run `npm run verify`.

## Minimum Requirements

### ☐ 1. Create Your Steve Agent

- [ ] Sign in at [steve.oobeprotocol.ai](https://steve.oobeprotocol.ai)
- [ ] Complete onboarding wizard
- [ ] Set agent handle (save to `STEVE_AGENT_HANDLE` in `.env`)
- [ ] Set display name and avatar
- [ ] Fund wallet via Sponsored Free Lane or Inference Vault

**Profile URL:** `https://steve.oobeprotocol.ai/agents/<your-handle>`

---

### ☐ 2. Connect X + Share Your Agent

- [ ] Connect X account in Steve settings
- [ ] Write and publish public X post (use `content/x-post-template.md`)
- [ ] Tag [@SteveTheAgentAI](https://x.com/SteveTheAgentAI)
- [ ] Tag [@OOBEonSol](https://x.com/OOBEonSol)
- [ ] Include screenshots or transaction links
- [ ] Save post URL to `X_POST_URL` in `.env`

---

### ☐ 3. Reach 1,000 Arena XP

- [ ] Check current XP on [Arena leaderboard](https://steve.oobeprotocol.ai/arena/leaderboard)
- [ ] Complete trade missions
- [ ] Complete social/creator missions
- [ ] Complete bonus missions (below)
- [ ] Update `ARENA_XP` in `.env` when ≥ 1000

**Missions page:** [steve.oobeprotocol.ai/arena/missions](https://steve.oobeprotocol.ai/arena#agent/arena/missions)

---

### ☐ 4. Complete 5+ Qualifying Trades

Each trade must execute through your Steve Agent wallet:

- [ ] Trade 1: Jupiter swap ≥ 10 USDC
- [ ] Trade 2: Jupiter swap ≥ 10 USDC (reverse direction)
- [ ] Trade 3: Adrena or Phoenix perp
- [ ] Trade 4: Jupiter or perp
- [ ] Trade 5: Jupiter or perp
- [ ] Update `QUALIFYING_TRADES` in `.env`

**Verify sizing before swaps:** `npm run check:jupiter -- SOL USDC 12`

---

## Bonus Missions (Recommended)

Complete via [Arena Missions](https://steve.oobeprotocol.ai/arena#agent/arena/missions):

### ☐ SAP Agent Registry (+250 XP)

- [ ] Open SAP registration mission in Steve Arena
- [ ] Complete SAP Agent Registry through Steve
- [ ] Verify on [SAP Explorer](https://explorer.oobeprotocol.ai)
- [ ] Set `SAP_REGISTERED=true` in `.env`

### ☐ MagicBlock Private Swap (+75 XP)

- [ ] Use Steve's MagicBlock private swap tool
- [ ] Submit mission proof in Arena
- [ ] Set `MAGICBLOCK_SWAP=true` in `.env`

### ☐ MagicBlock Private Transfer (+75 XP)

- [ ] Use Steve's MagicBlock private SPL transfer
- [ ] Submit mission proof in Arena
- [ ] Set `MAGICBLOCK_TRANSFER=true` in `.env`

### ☐ Product Feedback (+125 XP)

- [ ] Complete Product Feedback mission in Arena
- [ ] Include: useful workflows, friction points, improvement ideas
- [ ] Set `PRODUCT_FEEDBACK=true` in `.env`

### ☐ Social & Creator Missions

- [ ] Trade recap post on X
- [ ] Strategy explainer thread
- [ ] Demo video or tutorial (optional, high content score)

---

## Final Submission

When all 4 minimum requirements are complete:

```bash
cp .env.example .env   # if not done
# Fill in all values
npm run verify         # must show 4/4 PASS
npm run submit:earn    # submit to Superteam Earn
```

**Superteam Earn listing:** [Steve Agent Arena](https://superteam.fun/earn/listing/steve-agent-arena-launch-your-agent-and-win-500-usdc)

**Eligibility answer:** Your agent handle from steve.oobeprotocol.ai

**Deadline:** 2026-09-16T21:59:59.000Z

---

## Support

- OOBE Linktree: [linktr.ee/OOBE_Protocol](https://linktr.ee/OOBE_Protocol)
- Bounty Telegram: see listing page on Superteam Earn
- POC: Giuseppe Di Loreto ([@stevethehead](https://superteam.fun/t/stevethehead))
