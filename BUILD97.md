# Build 97

Multilateral recapitalization acquired preferred recoupment.

Build 96 allowed the Build 58 stabilization fund to surrender pooled target-currency reserves and convert them into real Build 55 monetary-authority capital after a Build 95 recidivism-capital shortfall.

That solved the immediate capital problem, but it left an unanswered ownership question.

The stabilization pool lost a real reserve asset.

The monetary authority gained real capital.

Build 97 turns that transfer into a principal-only preferred recoupment claim through the Interreality Recapitalization Preference Office.

Every finalized Build 96 `SRT#` transfer creates exactly one Build 97 `RCP#` claim for the same amount and currency.

The claim does not reverse the Build 96 transfer.

It says that future genuinely free authority capital is not entirely free until the stabilization pool has been repaid.

## Existing balance sheets only

Build 97 does not create a synthetic reserve pool or a second monetary-authority balance sheet.

Collection moves value between two existing balance sheets:

- the real Build 55 monetary authority `capital` field falls;
- the real Build 58 stabilization pool in the same currency rises.

For a Reality A recapitalization:
- Build 96 drew from `poolRA`;
- Build 97 recoupment returns RA to `poolRA`.

For a Reality B recapitalization:
- Build 96 drew from `poolRB`;
- Build 97 recoupment returns RB to `poolRB`.

Build 97 does not change Build 58 member quota, contribution history, or Build 59 voting weights.

A recovered bailout is not treated as a fresh quota subscription.

## One preferred claim per real Build 96 transfer

Each positive Build 96 `SRT#` creates one `RCP#`.

The claim records:
- Build 96 transfer;
- Build 96 recapitalization request;
- Build 59 motion;
- Build 95 requirement;
- Build 55 facility;
- Build 55 monetary authority;
- target reality;
- burden reality;
- currency;
- original preferred principal;
- collected amount;
- outstanding amount;
- protected authority-capital floor.

The original preferred principal equals the actual Build 96 transfer amount, not the requested amount.

A partially funded Build 96 request can therefore create more than one Build 97 claim if it later produces more than one real `SRT#` transfer.

The same `SRT#` can never create two claims.

## Principal only

Build 97 does not charge interest, dividends, or a penalty spread.

The preferred claim is principal-only.

If Build 96 transferred 0.30 RA, Build 97 can recover at most 0.30 RA from that claim.

The claim exists to restore the reserve pool, not to turn emergency recapitalization into a profit center.

## Supervisory priority remains senior

Build 97 is deliberately junior to the entire supervisory capital stack that created the recapitalization need.

Before any collection, Build 97 measures live authority-level pressure from:

- Build 92 current `shortfall92`;
- Build 93 live restoration `bufferGap93`;
- Build 94 current `shortfall94`;
- Build 95 current `shortfall95`.

If any of those amounts are positive, the Build 97 claim becomes `blocked-supervisory-priority`.

Build 97 does not collect a cent.

That means the stabilization fund cannot recapitalize an authority in Build 96 and then immediately strip the same capital back out while an older supervisory requirement remains underfunded.

Build 97 is a claim on future free capital, not a circular same-cycle clawback.

## Protected capital floor

Even when all supervisory shortfalls are current, Build 97 cannot sweep the authority below a prudential floor.

The live floor is the larger of:

- the authority capital that existed immediately before the linked Build 96 transfer;
- the authority's current Build 55 `badAssets`.

This has two effects.

First, Build 97 does not seize capital that predated the recapitalization.

Second, Build 97 cannot create negative equity merely to replenish the stabilization pool.

If the authority has:
- 0.60 capital;
- 0.40 current bad assets;
- a Build 97 claim whose pre-recap capital floor was 0.10;

then only 0.20 is collectible.

The effective floor is 0.40.

## Where collectible capital can come from

Build 97 does not care how authority capital later becomes free.

It may come from:

- Build 55 interest income on repaid liquidity facilities;
- Build 92 capital release after principal declines or closes;
- Build 93 restoration-buffer release after post-cap exposure closes;
- Build 94 surcharge release;
- Build 95 recidivism-penalty release;
- unused Build 96 recapitalization capital after the underlying shortfall is cured elsewhere;
- another older mechanism that legitimately increases the same real Build 55 authority capital field.

Because Build 97 loads after those layers, the older balance sheets remain authoritative.

Build 97 only sees what is actually free afterward.

## Collection

A collectible claim can be paid through the Recapitalization Preference Office.

Collection amount is the minimum of:

- claim outstanding;
- authority capital above the live protected floor.

Collection:
- reduces real Build 55 authority capital one-for-one;
- increases the corresponding real Build 58 reserve pool one-for-one;
- creates one `RRP#` preferred-recoupment payment;
- reduces claim outstanding;
- preserves every older historical record.

A full collection marks the claim `paid`.

A partial collection records `partial`; the claim can later become collectible again when more genuinely free capital appears.

## Blocked states

A live claim can be:

- `blocked-supervisory-priority` — Builds 92–95 still need capital first;
- `blocked-prudential-floor` — supervision is current, but authority capital is not above the protected floor;
- `collectible` — some free capital can return to the stabilization pool;
- `partial` — some preferred principal has already returned;
- `paid` — all preferred principal has returned;
- `orphaned-authority`;
- `orphaned-fund`.

The blocked states are current conditions rather than erased history.

A claim can move from blocked to collectible later without creating a second claim.

## Example: Build 96 capital is consumed first

Start with:
- Build 95 held = 0.20;
- Build 95 shortfall = 0.30;
- Build 58 `poolRA` = 5.00;
- authority free capital = 0.

Build 96 transfers 0.30 RA:
- `poolRA` becomes 4.70;
- authority capital becomes 0.30;
- Build 95 still shows held 0.20 / shortfall 0.30 until its own reconciliation.

Build 97 creates an `RCP#` for 0.30.

But the Build 95 shortfall is still 0.30.

Result:
- Build 97 status = `blocked-supervisory-priority`;
- no recoupment occurs.

On the next full reconciliation, Build 95 consumes the 0.30:
- held becomes 0.50;
- shortfall becomes 0;
- authority free capital becomes 0.

Build 97 is now blocked by the prudential floor rather than supervisory priority.

The Build 96 rescue remains economically in the older supervisory hold.

## Example: later release repays the pool

Later the linked facility principal falls enough for Build 95 to release 0.20 of its held capital.

Assume:
- all Build 92–95 shortfalls are zero;
- authority bad assets are zero;
- pre-recap authority-capital floor was zero;
- authority free capital is now 0.20.

Build 97 can collect 0.20.

Result:
- authority capital becomes 0;
- `poolRA` rises by 0.20;
- one `RRP#` records the return;
- preferred claim outstanding falls from 0.30 to 0.10;
- claim remains `partial`.

A later 0.10 of free capital can finish the claim.

## Example: Build 55 interest income becomes the repayment source

A Build 55 borrower repays facility interest after the supervisory stack is current.

Build 55 itself increases authority `capital` by that interest payment.

If the authority is above the Build 97 protected floor, that newly earned capital can satisfy the preferred claim.

Build 97 therefore makes ordinary lender-of-last-resort income a possible route by which a cross-reality bailout is eventually repaid.

## Example: bad assets block the sweep

Assume:
- claim outstanding = 0.30;
- authority capital = 0.50;
- current bad assets = 0.45;
- no supervisory shortfall.

Only 0.05 is collectible.

Build 97 will not sweep the other 0.45 because doing so would make bad assets exceed remaining authority capital.

The stabilization pool therefore cannot improve its own balance sheet by manufacturing central-bank negative equity.

## Historical finality

Build 97 does not erase:
- the Build 95 shortfall that triggered recapitalization;
- the Build 96 board vote, deadlock, override, or majority approval;
- the Build 96 `SRC#`;
- the Build 96 `SRT#`;
- the stabilization-pool loss recorded by Build 96;
- any Build 92–95 capital requirement, hold, release, strike, surcharge, or penalty.

If a Build 97 claim is eventually paid, the system can truthfully retain both facts:

- the stabilization pool recapitalized the authority;
- the authority later returned the preferred principal from genuinely free capital.

The original rescue does not disappear merely because it was later recouped.

## No monetary-base change

Build 97 does not retire public credit.

It does not behave like Build 71 or Build 74.

Build 97 never directly changes:
- monetary base;
- outstanding credit;
- reserve-account balances;
- borrower cash;
- Build 55 facility principal;
- Build 55 facility interest;
- contractual rates;
- Build 91 exception numbering;
- Build 92 required/held capital;
- Build 93 restoration buffer;
- Build 94 surcharge requirement/hold;
- Build 95 recidivism requirement/hold;
- Build 96 transfer amount or recapitalization history;
- Build 58 quota;
- Build 58 contribution history;
- Build 59 director votes.

It changes only:
- real Build 55 free authority capital when an eligible preferred payment is collected;
- the corresponding real Build 58 reserve pool;
- Build 97 claims and payments;
- durable recovery markers and observability records.

## Durable recovery

Build 97 mirrors each `RCP#` claim and `RRP#` payment onto surviving older objects:

- the linked Build 96 transfer;
- the real Build 55 monetary authority;
- the Build 58 stabilization fund.

If isolated v97 state disappears while those markers survive, Build 97 reconstructs:
- the same claim IDs;
- the same payment IDs;
- serial counters;
- aggregate collected amount;
- current paid/partial/blocked counts.

Recovery is non-economic.

It does not:
- reduce authority capital again;
- increase the stabilization pool again;
- recreate the Build 96 transfer;
- recreate the Build 96 board motion;
- edit Builds 92–96;
- collect the preferred claim again merely because local v97 state was lost.

## Deterministic validation targets

The Build 97 exact-blob harness covers:

### One transfer, one claim
A 0.30 Build 96 `SRT1` creates exactly one `RCP1` for 0.30.

Repeated reconciliation does not duplicate it.

### Supervisory priority block
With Build 95 shortfall still 0.30:
- claim exists;
- status is `blocked-supervisory-priority`;
- collection is zero;
- authority capital and pool stay unchanged.

### Prudential-floor block
After Build 95 is fully funded:
- authority free capital is zero;
- claim becomes `blocked-prudential-floor`;
- no collection occurs.

### Partial release collection
With all supervisory pressure zero and 0.20 free capital above the floor:
- collection = 0.20;
- authority capital falls 0.20;
- target reserve pool rises 0.20;
- claim outstanding falls 0.30 -> 0.10;
- one `RRP#` is created.

### Final collection
With another 0.10 free capital:
- collection = 0.10;
- claim becomes `paid`;
- total pool recovery equals exactly 0.30.

### Bad-asset floor
With 0.50 authority capital and 0.45 bad assets:
- only 0.05 is collectible;
- authority ends at 0.45;
- Build 97 does not create negative equity.

### Pre-recap capital floor
If the Build 96 transfer arrived when the authority already had 0.40 free capital:
- Build 97 records 0.40 as the claim's baseline floor;
- later collection cannot reduce authority capital below 0.40 unless another older system changes that capital first.

### Multiple partial Build 96 transfers
Two different `SRT#` transfers create two distinct preferred claims.

Each transfer can be recouped only up to its own actual amount.

### Isolated v97 recovery
After a partial preferred payment:
- v97 arrays/counters are removed;
- durable markers remain;
- recovery rebuilds the same claim and payment;
- authority capital and stabilization pool remain exactly where the original payment left them;
- no duplicate collection occurs.

## Persistence and UI

Build 97 persists through `nothing-state-v97`.

It wraps the current save/render chain.

It loads after `supervisory_recapitalization.js`.

It extends forget-through-v97.

The UI adds:
- `RPO1` Recapitalization Preference Office;
- `RCP#` claim nodes;
- live supervisory-priority and prudential-floor visibility;
- a `collect preferred recoupment` action;
- `RRP#` payment detail;
- a recapitalization-preference summary line.

New places include `foreign reserve bailout waiting to be repaid from future central-bank profits`, `released supervisory capital flowing back across the rift to replenish the rescue pool`, and `central-bank capital no longer fully discretionary because another reality's reserve pool has a preference`.
