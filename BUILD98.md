# Build 98

Preferred recoupment acquired reserve restitution.

Build 97 allowed a monetary authority to repay Build 96 recapitalization principal from genuinely free Build 55 capital.

That repayment restored the same reserve currency to the common Build 58 stabilization pool.

But the reality whose pooled reserve asset originally bore the Build 96 rescue still received no individual claim on the recovered asset.

Build 98 closes that gap through the Interreality Reserve Restitution Register.

Every positive Build 97 `RRP#` preferred-recoupment payment now restores one-for-one Build 58 Rift Drawing Rights to the payment's `burdenReality`.

The restitution is not a new reserve transfer.

Build 97 already returned the reserve asset to the common pool.

Build 98 restores a claim on that pool to the member whose reserve asset bore the recapitalization loss.

## Existing Build 58 drawing rights

Build 98 does not invent a new synthetic claim.

Build 58 already created RDR.

Each stabilization member has a real `rdr` balance inside `S.stabilizationQuotas58`.

Build 58 also already maintains:
- `S.drawingRights58`;
- the global `drawingRightSerial58`;
- the aggregate `drawingRightsAllocated58`;
- an exchange mechanism that converts RDR into the foreign reserve currency the member needs.

Build 98 uses those exact fields.

For each eligible Build 97 payment it:
- increases the burden reality's existing Build 58 `rdr` balance;
- creates a real Build 58 `RDR#` allocation record;
- increments the old Build 58 drawing-right serial;
- increments the old Build 58 aggregate amount allocated;
- creates one Build 98 `RRA#` restitution record linking the Build 97 payment to that Build 58 RDR allocation.

## Why the burden reality receives the RDR

Build 96 recapitalization uses the target reality's currency from the stabilization pool.

A Reality A recapitalization draws RA from `poolRA`.

Those RA reserves were historically supplied to the fund by Reality B because RA is Reality B's foreign reserve asset.

Build 96 therefore records:
- target reality A;
- burden reality B;
- currency RA.

If Build 97 later returns that RA to `poolRA`, Build 98 gives the restored RDR to Reality B.

That is exactly useful to B because Build 58's existing exchange rule lets Reality B exchange RDR for RA.

The mirror case works the same way:
- Reality B rescue consumes RB;
- Reality A bears the pooled-reserve loss;
- Build 97 returns RB;
- Build 98 restores RDR to A;
- A can later exchange RDR for RB.

## One-for-one restitution

If `RRP1` returns 0.30 RA to the fund:
- Build 98 allocates 0.30 RDR;
- the recipient is the Build 97 payment's burden reality;
- the corresponding Build 58 member `rdr` rises by exactly 0.30;
- one real Build 58 `RDR#` record is created;
- one Build 98 `RRA#` record links the restitution to `RRP1`.

Build 98 does not allocate against the original Build 96 requested amount.

It responds only to actual Build 97 preferred-recoupment payments.

A partially paid Build 97 claim can therefore produce multiple Build 98 restitution allocations over time, one for each real `RRP#`.

The same Build 97 payment can never allocate RDR twice.

## The recovered reserve can leave again

Build 98 deliberately uses fungible Build 58 RDR.

It does not create a locked memorial token.

Once restored, the burden reality's new drawing rights are part of its ordinary Build 58 RDR balance.

The old Build 58 exchange path can use them.

For example:
- Build 96 draws 0.30 RA from `poolRA`;
- Build 97 later returns 0.30 RA;
- Build 98 restores 0.30 RDR to Reality B;
- Reality B can later exchange RDR for RA through the old Build 58 mechanism.

That later exchange:
- reduces B's real RDR balance;
- reduces `poolRA`;
- increases B's real Build 56 foreign reserves.

Build 98 therefore creates a genuine feedback loop.

Repayment can refill the rescue pool without guaranteeing that the recovered reserve remains trapped there.

## Governance consequence already exists

Build 98 does not directly change Build 59 votes.

That consequence already exists in the old governance formula.

Build 59's quota score includes:

`quota + 0.35 × contributions + 0.16 × foreign reserves + 0.025 × exports - 0.08 × RDR - 0.18 × stabilization borrowing`

Outstanding RDR reduces the member's score.

Build 98 raises the burden reality's real Build 58 RDR balance.

The next ordinary Build 59 director recalculation therefore prices that restored liquidity claim into governance. In the normal app lifecycle this can happen immediately in the same full render, because the older Build 59 layer recalculates director weights when its board is rendered.

The creditor receives more potential liquidity but can lose a small amount of voting weight.

This is not a new voting rule.

It is a consequence of reconnecting Build 98 to the original Build 58/59 machinery.

Build 98 itself does not mutate:
- Build 58 quota;
- Build 58 historical reserve contributions;
- Build 59 director votes;
- Build 59 board thresholds;
- Build 59 majority history.

The old Build 59 recalculation remains authoritative.

## Example: 0.30 RA repayment

Start after Build 96:
- Reality A was recapitalized;
- `poolRA` fell from 5.00 to 4.70;
- Reality B was the burden reality.

Build 97 later collects 0.30 from genuinely free Reality A authority capital:
- authority capital falls 0.30;
- `poolRA` rises 4.70 -> 5.00;
- `RRP1` records 0.30 RA returned.

Build 98 observes `RRP1`.

If Reality B had 4.00 RDR:
- B RDR rises 4.00 -> 4.30;
- a new Build 58 `RDR#` record carries amount 0.30;
- `drawingRightsAllocated58` rises by 0.30;
- `RRA1` records the restitution.

Nothing else moves at allocation time.

The 0.30 RA stays in `poolRA` until an old Build 58 mechanism actually uses it.

## Existing RDR exchange

Suppose Reality B then invokes the existing Build 58 RDR exchange.

Because B's foreign currency is RA:
- B can exchange RDR for RA;
- its `rdr` balance falls;
- `poolRA` falls;
- B's Build 56 foreign reserves rise.

Build 98 does not special-case or intercept that exchange.

The restitution has become ordinary fungible RDR.

That preserves the original Build 58 institution rather than creating a parallel redemption system.

## No quota purchase

Build 98 is not Build 59 quota subscription and not Build 76 replenishment assessment.

The burden reality does not receive quota merely because its prior reserve loss was repaid.

Build 98 never directly changes:
- member quota;
- `contributedRA`;
- `contributedRB`;
- Build 59 director votes.

The new RDR is a liquidity claim, not governance capital.

That distinction matters because Build 59 treats quota and RDR differently:
- quota raises the score;
- outstanding RDR lowers the score.

## Historical finality

Build 98 does not erase:
- the Build 96 recapitalization request;
- the Build 96 stabilization-board motion;
- the Build 96 reserve transfer;
- the Build 97 preferred claim;
- the Build 97 preferred payment.

A completed sequence can truthfully retain all of these facts:
- one member's pooled reserve asset recapitalized the other reality;
- the target authority later returned preferred principal to the common fund;
- the burden member then received restored RDR against the replenished pool;
- the burden member may later exchange some or all of that RDR.

No historical bailout or repayment is rewritten.

## Recovery

Economic allocation is marked durably on surviving older objects.

Each Build 98 restitution is mirrored onto:
- the source Build 97 `RRP#`;
- the recipient Build 58 quota object;
- the Build 58 stabilization fund;
- the actual Build 58 `RDR#` record.

If isolated v98 state disappears while those older records survive, Build 98 reconstructs its `RRA#` ledger and serial counters from those markers.

Recovery is non-economic.

It does not:
- increase member RDR again;
- create another Build 58 RDR allocation;
- increase `drawingRightsAllocated58` again;
- move pool reserves;
- replay the Build 97 preferred payment.

The old Build 58 RDR record itself is also an authoritative no-double-allocation signal through `sourcePayment97`.

## Deterministic validation targets

The Build 98 exact-blob harness covers:

### One payment, one restitution
A 0.30 `RRP1` with burden reality B:
- creates exactly one `RRA1`;
- creates exactly one real Build 58 `RDR#`;
- raises B RDR by exactly 0.30;
- raises old `drawingRightsAllocated58` by exactly 0.30.

Repeated reconciliation does not duplicate any of those effects.

### Mirror currency
A Reality B preferred payment in RB with burden reality A:
- restores RDR to A;
- does not mistakenly allocate to B.

### Partial Build 97 payments
Two distinct preferred payments of 0.20 and 0.10:
- create two RRA records;
- create two Build 58 RDR records;
- restore total RDR of exactly 0.30.

### Zero payment
A zero-amount Build 97 record creates no restitution.

### No direct pool movement
Creating the restitution:
- does not change `poolRA`;
- does not change `poolRB`;
- does not change Build 55 authority capital.

The reserve movement already occurred in Build 97.

### No direct governance mutation
Creating restitution:
- does not change quota;
- does not change historical contribution fields;
- does not directly change Build 59 director votes.

### Exact Build 59 score consequence
After Build 98 raises the burden reality's RDR, executing the exact old Build 59 score recalculation:
- incorporates the increased RDR through the original `-0.08 × RDR` term;
- slightly reduces that member's vote share relative to the otherwise identical state.

### Exact Build 58 exchange consequence
After Build 98 restores RDR to the burden reality, executing the exact old Build 58 exchange path:
- spends the member's fungible RDR;
- drains the correct recovered pool currency;
- increases the member's real Build 56 foreign reserves.

### Isolated v98 recovery
After an RRA allocation:
- v98 ledger/counter state is removed;
- Build 97 payment, Build 58 quota/fund, and Build 58 RDR markers remain;
- Build 98 reconstructs the same RRA;
- member RDR and old allocation aggregate do not increase again;
- no second Build 58 RDR record appears.

## Persistence and UI

Build 98 persists through `nothing-state-v98`.

It wraps the current save/render chain.

It loads after `preferred_recoupment.js`.

It extends forget-through-v98.

The UI adds:
- `RRR1` Reserve Restitution Register;
- `RRA#` restitution nodes;
- the linked Build 58 RDR allocation ID;
- current member RDR balances;
- current Build 59 vote weight for the restitution recipient;
- a reserve-restitution summary line.

New places include `repaid bailout reserve reappearing as a creditor drawing right`, `the rescue pool refilled and immediately owing the old loss-bearer a claim on it`, and `liquidity restitution quietly reducing the creditor's governance score`.
