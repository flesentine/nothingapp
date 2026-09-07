# Build 99

Reserve restitution acquired governance arbitrage.

Build 98 restored real Build 58 Rift Drawing Rights to the reality whose pooled reserve asset had borne a Build 96 recapitalization loss.

That restoration created two opposite effects inside machinery that already existed.

While the RDR remains outstanding, the old Build 59 quota score subtracts `0.08 × RDR`, slightly reducing the member's board weight.

But the old Build 58 exchange path converts RDR into the member's real Build 56 foreign reserves.

A redemption therefore changes the same old Build 59 score in two favorable directions at once:

- outstanding RDR falls;
- foreign reserves rise.

With all other score inputs unchanged, redeeming one RDR improves the member's Build 59 score by:

`+0.08 + 0.16 = +0.24`

Build 99 turns that latent relationship into an explicit governance-arbitrage consequence through the Interreality Restitution Governance Arbitrage Desk.

The desk does not create a new voting formula.

It does not assign votes.

It identifies when some of the RDR restored by Build 98 can be redeemed through the same real balance-sheet route as Build 58 and, by the old Build 59 formula, move the recipient across the live board-majority threshold.

## Existing machinery only

Build 99 uses:

- the Build 98 `RRA#` restitution records;
- the recipient's real Build 58 quota-object `rdr`;
- the real Build 58 `poolRA` or `poolRB`;
- the recipient's real Build 56 `foreignReserves`;
- the live Build 59 board threshold;
- the original Build 59 quota-score formula.

Build 99 does not create:

- a second RDR balance;
- a second reserve pool;
- a second foreign-reserve account;
- a second board;
- a new voting-weight field.

## Governance-arbitrage positions

For each reality with at least one Build 98 restitution, Build 99 creates one `GAP#` governance-arbitrage position.

The position aggregates:

- total RDR restored by Build 98 to that reality;
- amount already used through Build 99 governance arbitrage;
- remaining restitution amount;
- the member's current real RDR balance;
- the correct foreign-reserve pool;
- current Build 59 score;
- opposing Build 59 score;
- current vote forecast;
- live board threshold;
- RDR amount required to cross that threshold;
- immediately redeemable amount;
- post-redemption vote forecast.

Build 99 can combine multiple partial Build 98 restitutions.

If Build 97 paid 0.20 and then 0.10, producing two Build 98 restitution records, Build 99 sees 0.30 of aggregate restored RDR rather than incorrectly treating the two records as unrelated liquidity.

## Exact score relationship

Build 99 forecasts with the same score components already used by Build 59:

`quota + 0.35 × contributions + 0.16 × foreign reserves + 0.025 × exports - 0.08 × RDR - 0.18 × stabilization borrowing`

It does not mutate Build 59 votes from that forecast.

The forecast only answers whether an exchange is potentially decisive.

If the recipient's current score is `S`, the other member's score is `O`, and the live board threshold is `T`, then the score required for control is:

`T / (1 - T) × O`

Because one RDR redemption improves the recipient's raw score by 0.24, the required RDR is solved against the raw pre-floor score. This matters because Build 59 itself floors every quota score at 2; Build 99 preserves that floor rather than incorrectly assuming a redemption immediately raises a member already pinned at 2.

When the member is above the floor, the familiar expression is:

`max(0, (required score - S) / 0.24)`

When the member is pinned at the floor, Build 99 first accounts for enough redemption to lift the raw score through that floor before counting any governance improvement. Build 99 adds only a tiny numerical epsilon when executing so a mathematically exact threshold does not miss because of floating-point equality.

## Decisive-only redemption

Build 99 does not redeem restored RDR merely because it exists.

A position becomes `decisive-arbitrage` only when one permitted redemption can move the member from below the live threshold to at least that threshold.

The amount available for one Build 99 action is bounded by:

- unused Build 98 restitution amount;
- the member's actual current Build 58 RDR balance;
- the correct live Build 58 reserve pool;
- the old Build 58 single-exchange cap of 3 RDR.

If those bounds cannot produce a majority, Build 99 leaves the balance sheets untouched.

Possible current states include:

- `already-majority`;
- `decisive-arbitrage`;
- `insufficient-restored-rdr`;
- `restitution-exhausted`;
- `no-rdr`;
- `pool-empty`;
- `currency-mismatch`;
- `orphaned`;
- `majority-restored`.

## Real redemption

Executing a decisive position creates one `GAR#` governance-arbitrage redemption.

The action moves the same three balance-sheet fields used by the old Build 58 RDR exchange economics:

- recipient Build 58 `rdr` falls;
- the correct Build 58 reserve pool falls;
- recipient Build 56 `foreignReserves` rises.

Build 99 does not directly mutate a Build 59 vote.

After the balance-sheet movement is persisted, Build 99 runs the older render chain.

The normal Build 59 board render recalculates director weights from the actual old score formula.

Build 99 then observes that old-layer result and records whether the majority was restored.

The final `GAR#` record includes:

- amount redeemed;
- source Build 98 restitutions used;
- RDR before/after;
- reserve pool before/after;
- foreign reserves before/after;
- board vote before/after;
- live threshold;
- whether the old Build 59 recalculation actually crossed the threshold.

## Example: restitution first dilutes, redemption then restores

Assume both members initially have equal Build 59 scores and 50/50 votes.

Build 98 restores 0.30 RDR to Reality B.

The old Build 59 formula now penalizes B's score by:

`0.30 × 0.08 = 0.024`

So B falls slightly below 50%.

That particular state is nowhere near the 60% majority threshold, so Build 99 does nothing.

Now consider a different pre-existing balance-sheet state in which B is just below 60% after receiving restitution.

Suppose:

- B current score is only 0.05 score-units below the score needed for a 60% majority;
- B has at least 0.30 restored RDR remaining;
- `poolRA` has at least 0.30;
- B has the corresponding Build 56 foreign-reserve account.

Build 99 computes that about:

`0.05 / 0.24 = 0.208333... RDR`

is sufficient.

The desk redeems only the amount needed to cross the threshold, plus numerical epsilon.

That redemption:

- reduces B RDR by about 0.208334;
- reduces `poolRA` by the same amount;
- raises B real foreign reserves by the same amount.

The old Build 59 score then sees both changes.

If the resulting vote reaches 60%, Build 99 records `majority-restored`.

## Why this is governance arbitrage

The member is not buying new quota.

It is changing the form of an already-existing restitution asset.

Before redemption:
- the member holds RDR;
- that claim reduces its Build 59 score.

After redemption:
- the member holds foreign reserves;
- those reserves increase its Build 59 score.

The economic value moved from one old balance-sheet field to another, but the old governance formula values those forms differently.

Build 99 makes that institutional asymmetry operational.

## No guaranteed majority

Build 99 does not guarantee control.

A position cannot execute if:

- restored RDR remaining is too small;
- the member has already spent its RDR elsewhere;
- the relevant reserve pool is too small;
- the old 3-RDR single-exchange cap is binding;
- the member is missing required older state;
- the projected redemption still cannot reach the live threshold.

The desk refuses non-decisive redemptions rather than draining reserve assets merely to improve a vote by an immaterial amount.

## Existing Build 58 liquidity scarcity survives

A successful governance arbitrage is economically real.

The reserve leaves the stabilization pool.

That means a majority-restoring redemption can reduce the same pool that later Build 58 stabilization programs or Build 96 supervisory recapitalizations may need.

Build 99 does not reserve or replenish that pool after redemption.

The gain in governance power can therefore come at the cost of weaker future rescue capacity.

## Existing Build 58 exchange cap survives

The original Build 58 manual exchange permits at most 3 RDR in one exchange.

Build 99 preserves that one-action ceiling.

If crossing the board threshold would require more than 3 RDR in a single move, the position is not decisive for Build 99 even if the member has a much larger total RDR balance.

This avoids creating a privileged unlimited exchange route merely because the motive is governance.

## Restitution provenance and fungibility

Build 98 deliberately made restitution RDR ordinary fungible RDR.

Build 99 preserves that.

The desk does not claim that a physical token is uniquely traceable after allocation.

Instead, it limits its governance-arbitrage authority by aggregate Build 98 restitution principal that has not already been attributed to a Build 99 `GAR#`.

Actual redemption is also bounded by the member's current real RDR balance.

If the member has already exchanged RDR through the ordinary Build 58 path, Build 99 cannot use more RDR than remains.

When Build 99 executes, it attributes the redeemed amount across the oldest still-unused Build 98 restitution records so the governance-arbitrage ledger cannot exceed aggregate restitution.

## Historical finality

Build 99 does not erase:

- Build 96 recapitalization;
- Build 97 preferred claim;
- Build 97 preferred payment;
- Build 98 restitution;
- the Build 58 RDR allocation;
- any earlier Build 59 vote or majority.

A complete history can truthfully show:

1. pooled reserves recapitalized a monetary authority;
2. the authority later repaid the preferred principal;
3. the reserve-loss bearer received restitution RDR;
4. outstanding RDR diluted that member's score;
5. the member redeemed some restitution RDR into foreign reserves;
6. the old Build 59 formula restored a voting majority.

## No direct vote mutation

Build 99 never directly writes:

- Build 58 quota;
- Build 59 director `votes`;
- Build 59 board `majority`;
- Build 59 dominant-member history.

The old Build 59 render/recalculation remains authoritative for the actual governance result.

Build 99 only records the before/after vote it observes.

## Other non-mutations

Build 99 never directly changes:

- monetary base;
- outstanding credit;
- borrower cash;
- Build 55 facility principal;
- Build 55 facility interest;
- Build 55 authority capital;
- Builds 91–97 supervisory or recapitalization ledgers;
- Build 98 restitution principal;
- Build 58 quota;
- Build 58 historical reserve contributions.

The only direct economic changes are:

- real Build 58 member RDR;
- real Build 58 target reserve pool;
- real Build 56 foreign reserves.

## Recovery

Build 99 mirrors position and redemption snapshots onto surviving older objects:

- Build 98 restitution records;
- the recipient Build 58 quota object;
- the Build 58 stabilization fund.

Each Build 98 restitution also carries the amount already attributed to Build 99 governance-arbitrage use.

If isolated v99 state disappears:

- `GAP#` positions are reconstructed from durable markers;
- `GAR#` redemptions are reconstructed from durable markers;
- serial counters are restored;
- aggregate redeemed amount is restored;
- the historical count of positions that successfully restored a majority is recomputed from durable position markers;
- already-attributed Build 98 restitution use remains in the old objects.

Recovery is non-economic.

It does not:
- reduce RDR again;
- reduce the reserve pool again;
- increase foreign reserves again;
- recalculate or assign a new vote by itself;
- create another redemption.

## Deterministic validation targets

The Build 99 exact-blob harness covers:

### Far from majority
A member with restored RDR but a 50% vote cannot reach 60% with the available restitution.

Result:
- position = `insufficient-restored-rdr`;
- no balance-sheet movement.

### Decisive minimum redemption
A member just below the live 60% threshold has enough restored RDR and pool liquidity.

Build 99:
- computes the minimum decisive redemption;
- redeems less than the full restitution amount;
- moves RDR/pool/foreign reserves one-for-one;
- does not write votes directly.

The exact old Build 59 recalculation then moves the member to at least 60%.

### Existing majority
A member already above the threshold receives no governance-arbitrage redemption.

### Empty pool
A mathematically decisive position with an empty relevant pool does not move RDR or foreign reserves.

### RDR already spent elsewhere
If current member RDR is below remaining restitution principal, Build 99 can use only the actual RDR still present.

### Multiple partial restitutions
Two Build 98 restitutions can combine into one decisive governance-arbitrage position.

A successful redemption attributes use across those source restitutions without exceeding either source amount.

### 3-RDR cap
A threshold crossing requiring more than 3 RDR cannot execute in one Build 99 action.

### Mirror reality
Reality A restitution uses RB / A foreign reserves.

Reality B restitution uses RA / B foreign reserves.

### Exact old Build 59 integration
The final majority result comes from the exact committed Build 59 score/recalculation code after the Build 99 balance-sheet movement.

### Isolated v99 recovery
After a successful redemption:
- v99 arrays/counters are removed;
- durable Build 98/quota/fund markers remain;
- recovery rebuilds the same GAP/GAR records;
- RDR, pool, and foreign reserves remain exactly where the original redemption left them;
- no second redemption occurs.

## Persistence and UI

Build 99 persists through `nothing-state-v99`.

It wraps the current save/render chain.

It loads after `reserve_restitution.js`.

It extends forget-through-v99.

The UI adds:

- `GAD1` Restitution Governance Arbitrage Desk;
- one `GAP#` position per restitution recipient;
- current score/vote/threshold;
- RDR required to cross;
- amount redeemable now;
- post-redemption vote forecast;
- `redeem restored RDR for board control` only when the position is actually decisive;
- `GAR#` redemption detail;
- a governance-arbitrage summary line.

New places include `drawing rights redeemed because liquidity became voting power`, `restitution leaving the rescue pool and returning as creditor control`, and `reserve liquidity spent to cross a governance threshold`.
