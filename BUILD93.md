# Build 93

Supervisory capital shortfall acquired a restoration buffer.

Build 92 makes post-cap emergency lending consume the real Build 55 authority's own free capital one-for-one.

That solves the problem of an authority continuing to use emergency exceptions after price and collateral supervision have already reached 20% / AAA.

But Build 92 can still end in an explicit shortfall.

If a 1.0 post-cap exception is outstanding and only 0.4 of free authority capital remains, Build 92 truthfully records:
- required capital = 1.0;
- held capital = 0.4;
- supervisory shortfall = 0.6.

The emergency loan is still valid.

The remaining problem is recovery.

A later 0.6 of authority capital can cure the Build 92 shortfall, but Build 92 immediately consumes all 0.6 into the one-for-one hold. The authority therefore exits the breach with no free capital cushion.

Build 93 creates the Interreality Supervisory Capital Restoration Office.

The first real Build 92 shortfall now creates a durable restoration order. The order remembers the largest uncovered amount the authority actually reached and requires an additional post-breach recovery buffer equal to 50% of that peak shortfall.

Build 92 always gets first claim on capital needed to satisfy the original one-for-one requirement.

Only after the Build 92 shortfall is zero can Build 93 begin rebuilding the separate restoration buffer.

## Trigger

Build 93 is authority-level, not facility-level.

A restoration order is created only when the real Build 55 monetary authority has at least one Build 92 `SCR#` whose aggregate current `shortfall92` is greater than floating-point dust.

A fully funded Build 92 requirement does not trigger Build 93.

A temporary historical fact that once had a requirement but currently has:
- required capital fully held;
- no current shortfall;

also does not create a new order by itself.

The first uncovered amount creates one `SRO#` for that authority's current breach episode.

## Peak-shortfall rule

Each restoration order records:
- current Build 92 shortfall;
- peak Build 92 shortfall;
- current live post-cap exposure;
- restoration-buffer target;
- restoration-buffer held amount;
- remaining restoration-buffer gap;
- whether the authority remains under restoration restriction.

The buffer target is:

`50% × peak Build 92 supervisory capital shortfall`

Example:
- peak Build 92 shortfall = 0.60;
- Build 93 restoration-buffer target = 0.30.

The peak is historical within that restoration episode.

If the authority later reaches a larger shortfall, the target rises with it.

A later decline in current shortfall does not reduce the target.

## Build 92 has first claim

Build 93 never competes with Build 92 for capital while an `SCR#` is still underfunded.

If Build 92 shortfall is positive:
- Build 93 does not top up its own restoration buffer from free capital;
- the authority remains `capital-deficient` under Build 93;
- Build 92 remains the layer that consumes free authority capital into the one-for-one supervisory hold.

This preserves the meaning of the original requirement.

Build 93 is a recovery layer, not a replacement for Build 92.

## Buffer building after cure

Once aggregate Build 92 shortfall reaches zero but post-cap exposure remains outstanding, Build 93 begins building the restoration buffer.

It uses the real Build 55 authority `capital` field.

For a restoration target of 0.30:
- if free authority capital = 0, held restoration buffer remains 0;
- if 0.20 of later free capital appears, Build 93 moves 0.20 into the restoration buffer;
- if another 0.10 later appears, Build 93 moves that 0.10 into the buffer;
- the authority then has 0.30 held against a 0.30 target.

While the buffer is incomplete, the order status is:
- `buffer-building`.

When the target is fully funded while post-cap exposure remains live, the status becomes:
- `buffered-active`.

## Real capital, not a shadow balance sheet

Build 93 removes buffer funding from the actual Build 55 authority `capital` field.

The amount is stored as `bufferHeld93` on the restoration order and mirrored durably onto the authority.

Therefore a 0.20 Build 93 top-up changes:
- free authority capital: -0.20;
- restoration buffer held: +0.20.

Build 93 does not create new capital.

Like Build 92, this can matter to old Build 55 solvency evaluation because ring-fenced restoration capital is no longer free capital.

## Later shortfall deploys the buffer

The restoration buffer is not decorative.

If a later Build 92 capital shortfall appears while a Build 93 buffer is held, Build 93 deploys as much of its buffer as possible back into the real authority's free `capital` field.

That returned free capital is then available for Build 92 to consume on its next reconciliation.

Example:
- Build 93 target = 0.30;
- Build 93 held = 0.30;
- a later Build 92 shortfall appears = 0.25.

Build 93 changes:
- restoration held 0.30 -> 0.05;
- free authority capital 0 -> 0.25.

Build 93 records a `buffer-deployment` action.

On the next Build 92 reconciliation, Build 92 can move that 0.25 into the real `SCR#` hold through its own ordinary `capital-topup` path.

This two-layer sequence preserves the Build 92 action ledger rather than silently editing the old requirement from Build 93.

## Larger later breach

If a later current shortfall exceeds the order's prior peak, the peak rises.

The restoration target rises at the same time to 50% of the new peak.

For example:
- old peak = 0.60;
- old target = 0.30;
- new current shortfall = 0.80;
- new peak = 0.80;
- new target = 0.40.

The order records a `target-increase` action.

A later cure does not shrink that 0.40 target within the same breach episode.

## Exposure closure releases the buffer

Build 93 distinguishes:
- curing the capital shortfall;
- closing the underlying post-cap exposure.

They are not the same event.

If Build 92 shortfall is zero but one or more Build 92 requirements still have positive `required92`, the restoration buffer stays held.

Only when the authority has no remaining positive Build 92 post-cap required exposure does Build 93 release any remaining restoration buffer back to free authority capital.

The order then becomes:
- `released-exposure-closed`.

This means a fully funded but still-live emergency exposure can keep two separate facts true at once:
- Build 92 one-for-one capital remains behind the exposure;
- Build 93 post-breach restoration capital remains separately ring-fenced because the authority previously failed the Build 92 requirement.

## What Build 93 does not move

Build 93 never directly changes:
- monetary base;
- outstanding credit;
- reserve-account balances;
- borrower cash;
- Build 55 facility principal;
- Build 55 facility interest;
- facility contractual rates;
- Build 91 exception numbering;
- Build 92 required capital.

Build 93 moves only the division between:
- real free Build 55 authority capital;
- Build 93 restoration-buffer capital.

When a later shortfall appears, Build 93 can return held restoration capital to free authority capital, but Build 92 remains responsible for moving that capital into its own supervisory hold.

## Durable actions

Build 93 records `CRA#` actions.

Capital-moving action kinds are:
- `buffer-topup`;
- `buffer-deployment`;
- `buffer-release`.

A non-cash supervisory action also exists:
- `target-increase`.

Each action records:
- linked `SRO#`;
- authority;
- amount;
- restoration buffer before;
- restoration buffer after;
- free authority capital after;
- explanatory note.

## Recovery

Build 93 mirrors each restoration order and action onto the real Build 55 monetary authority.

This makes isolated v93 reconstruction non-economic.

If the isolated `nothing-state-v93` order/action ledger disappears while the older monetary-authority object still contains the durable Build 93 markers, reconstruction restores:
- the `SRO#` snapshot;
- all durable `CRA#` actions;
- serial counters;
- aggregate metrics.

Recovery does not:
- subtract the restoration buffer from authority capital again;
- redeploy the buffer again;
- release the buffer again.

The capital location already recorded on the older authority remains authoritative.

## Deterministic lifecycle validation

The committed Build 93 module is exercised against deterministic Build 92-compatible state fixtures.

### No false trigger

Fixture:
- `SCR1` required 1.0;
- held 1.0;
- shortfall 0;
- authority free capital 2.0.

Result:
- no Build 93 restoration order;
- free authority capital remains 2.0.

### Initial breach

Fixture:
- `SCR1` required 1.0;
- held 0.4;
- shortfall 0.6;
- authority free capital 0.

Result:
- exactly one `SRO1`;
- peak shortfall 0.6;
- restoration target 0.3;
- restoration held 0;
- status `capital-deficient`;
- no money or authority capital moves merely because the order is created.

### Build 92 cures first

Fixture transition:
- `SCR1` held becomes 1.0;
- shortfall becomes zero;
- free authority capital remains zero.

Result:
- Build 93 does not pretend the restoration buffer is funded;
- `SRO1` becomes `buffer-building`;
- target remains 0.3;
- held remains zero.

### Restoration top-ups

Later free capital appears in two steps:
- 0.20;
- then 0.10.

Result:
- two `buffer-topup` actions;
- free authority capital returns to zero after each top-up;
- restoration held reaches 0.30;
- order becomes `buffered-active`.

### Buffer deployment into a later shortfall

A second Build 92 requirement then creates:
- current shortfall 0.25.

Result:
- Build 93 restoration held 0.30 -> 0.05;
- free authority capital 0 -> 0.25;
- one `buffer-deployment` action;
- order returns to `capital-deficient`.

After the next Build 92-compatible fixture consumes that 0.25 into the Build 92 hold:
- free authority capital returns to zero;
- current Build 92 shortfall returns to zero;
- Build 93 remains `buffer-building` with 0.05 held and 0.25 still required to rebuild the original 0.30 target.

### Closure

When all Build 92 required exposure becomes zero:
- the remaining 0.05 restoration buffer is released;
- free authority capital becomes 0.05;
- restoration held becomes zero;
- order becomes `released-exposure-closed`.

### Isolated v93 recovery

After the lifecycle above, isolated v93 order/action state is removed while durable authority markers remain.

Reconstruction restores:
- `SRO1`;
- the durable Build 93 action history;
- released status.

Free authority capital remains exactly 0.05.

No capital movement is replayed.

## Historical finality

Build 93 preserves the older facts.

The emergency loan that caused the Build 92 breach remains valid.

The Build 91 exception registration remains valid.

The Build 92 `SCR#` remains authoritative for the one-for-one requirement.

A later Build 92 top-up remains a Build 92 action even if the capital came from a Build 93 restoration-buffer deployment.

A restoration order does not erase the fact that the authority once failed to fund its supervisory requirement.

A later restoration buffer does not erase the old shortfall.

Closing the underlying exposure can release the restoration buffer without rewriting the historical breach.

The system can therefore say all of these things at once:
- price supervision hit its ceiling;
- collateral supervision hit its ceiling;
- capital conservation was imposed;
- the authority still ran out of free capital;
- the emergency loan remained valid;
- later capital cured the original requirement;
- the authority still had to rebuild a separate post-breach buffer;
- that buffer was available to absorb a later supervisory shortfall;
- the buffer was finally released only after the underlying post-cap exposure disappeared.

New places include `central bank rebuilding a buffer after supervision proved its capital could run out` and `capital released by repayment but still not free because the breach must be repaired first`.

Build 93 persists through `nothing-state-v93`, wraps the existing save/render chain, loads after `supervisory_capital.js`, and extends forget-through-v93.

`capital_restoration.js` passes V8/Node syntax validation. Deterministic committed-function fixtures cover no-false-trigger behavior, initial shortfall order creation, Build 92 first-claim priority, partial and complete buffer building, later buffer deployment, exposure-closure release, and isolated v93 reconstruction without duplicate capital movement.
