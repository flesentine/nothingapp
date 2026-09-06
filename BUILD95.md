# Build 95

Restoration-surcharge shortfall acquired a recidivism multiplier.

Build 94 makes a later post-cap emergency exception more expensive when it is issued while an earlier Build 93 capital-restoration episode is still alive.

That later exception carries:
- its ordinary Build 92 one-for-one supervisory capital requirement;
- its Build 94 restoration surcharge equal to 50% of current facility principal.

But Build 94 can itself fail.

If the authority does not have enough real Build 55 capital to fund the surcharge, Build 94 truthfully records a surcharge shortfall.

The next problem is repeat behavior after supervision has already watched that surcharge fail.

Without another consequence, an authority can suffer a Build 94 surcharge shortfall, cure it later, and then issue yet another post-cap exception during the same Build 93 restoration episode at the same 50% surcharge rate.

Build 95 creates the Interreality Surcharge Recidivism Board.

The first Build 94 surcharge shortfall that Build 95 actually observes becomes a durable supervisory strike.

The Build 94 requirement that caused the strike is grandfathered. It is not punished twice.

A later Build 94 requirement in the same still-live Build 93 restoration episode receives an additional Build 95 capital penalty equal to 50% of the linked facility's current principal.

That means a recidivist later exception can now carry:
- Build 92 capital requirement = 100% of principal;
- Build 94 restoration surcharge = 50% of principal;
- Build 95 recidivism penalty = another 50% of principal.

The later facility remains valid.

Build 95 does not rewrite Build 91, Build 92, Build 93, or Build 94.

It adds a progressive consequence after a real surcharge failure has been observed.

## Forward-only observation

Build 95 is not retroactive.

The Build 95 board records its own activation time.

A supervisory strike is created only from a Build 94 surcharge shortfall that is still present while Build 95 is running.

A Build 94 surcharge that ran short historically but was already cured before Build 95 activation does not create a strike merely because old records imply that a shortfall may once have existed.

Build 95 does not infer missing history.

It responds to state it actually observes.

## Strike episode

Each strike is one `SBE#` linked to one Build 93 `SRO#`.

A strike is created when:
- the Build 93 restoration order is still live;
- at least one Build 94 `RSR#` linked to that order has positive current `shortfall94`;
- the aggregate linked Build 94 shortfall is greater than floating-point dust;
- no Build 95 strike already exists for that restoration order.

The strike records:
- authority;
- reality;
- linked Build 93 restoration order;
- current observed Build 94 surcharge shortfall;
- peak observed Build 94 surcharge shortfall;
- the Build 94 requirements already present when the strike was created.

Those already-present Build 94 requirements become the strike's grandfathered set.

## Grandfathering

The first failed Build 94 surcharge is not itself charged again by Build 95.

At strike creation, Build 95 snapshots every Build 94 requirement already linked to that restoration order.

Those requirement IDs are stored in `sourceRequirements95`.

Any requirement in that snapshot is permanently excluded from the Build 95 recidivism penalty for that strike.

This boundary matters even if timestamps collide within the same millisecond.

Eligibility is based on both:
- forward creation time;
- explicit exclusion of the strike's source requirements.

## Later-exception eligibility

A Build 94 requirement can receive a Build 95 penalty only when:
- it was created at or after Build 95 activation;
- the same Build 93 restoration order has an active Build 95 strike;
- the Build 94 requirement was not present in the strike's grandfathered source set;
- the linked Build 93 restoration order is still live;
- the authority matches the strike;
- the Build 94 requirement does not already have a Build 95 penalty.

Each eligible later Build 94 requirement receives one `RPR#`.

## Penalty amount

The Build 95 penalty target is:

`current Build 55 facility principal × 50%`

For a recidivist later facility with current principal 1.0:
- Build 94 surcharge = 0.50;
- Build 95 recidivism penalty = 0.50.

Build 95 is a separate ledger.

It does not increase or rewrite the Build 94 `required94` field.

## Capital priority

Build 95 loads after Build 94.

Older supervisory layers retain first claim on real Build 55 authority capital.

Before Build 95 can top up a penalty, it checks for any remaining older claim:
- aggregate Build 92 supervisory-capital shortfall;
- active Build 93 restoration-buffer gap;
- aggregate Build 94 restoration-surcharge shortfall.

If any of those is positive, Build 95 leaves the penalty underfunded.

This is stricter than merely relying on module order.

It also protects same-cycle releases.

If one Build 95 penalty releases capital while an older Build 92/93/94 claim remains open, Build 95 does not immediately recycle that released capital into another Build 95 penalty.

The released capital stays free until the next full reconciliation gives the older layers their first claim.

## Real Build 55 capital

Build 95 uses the actual Build 55 authority `capital` field.

Example:
- recidivist facility principal = 1.0;
- Build 95 penalty target = 0.50;
- all Build 92/93/94 older claims are current;
- free authority capital = 0.20.

Result:
- Build 95 held penalty = 0.20;
- Build 95 shortfall = 0.30;
- authority free capital = 0.

If another 0.30 of genuinely free capital later remains after Builds 92, 93, and 94 reconcile:
- Build 95 held penalty becomes 0.50;
- Build 95 shortfall becomes zero.

No synthetic capital is created.

## Dynamic principal

The Build 95 penalty follows current facility principal.

For one eligible facility:
- principal 1.0 -> penalty 0.50;
- principal 0.4 -> penalty 0.20;
- principal 0 -> penalty 0.

If held penalty capital exceeds the new target after repayment, the excess returns to real Build 55 authority capital.

## Monetization

Monetization does not release the Build 95 penalty while positive principal remains.

If the facility becomes `monetized` with principal 0.4:
- required95 = 0.20;
- held95 remains 0.20 when fully funded;
- status becomes `penalty-monetized`.

The penalty follows surviving principal rather than the old outstanding-credit bucket.

## Closure

When principal reaches zero:
- required95 becomes 0;
- held95 becomes 0;
- any remaining held Build 95 capital returns to authority capital.

A repaid facility becomes:
- `released-repaid`.

Another zero-principal closure becomes:
- `released-closed`.

The historical strike and penalty records remain.

## Strike lifetime

A strike remains `strike-active` for as long as its linked Build 93 restoration order remains live.

Curing the current Build 94 surcharge shortfall does not erase the strike.

That is the point of recidivism.

The authority has already demonstrated that the restoration surcharge failed during this restoration episode.

When the linked Build 93 restoration order finally reaches:
- `released-exposure-closed`;
- or `orphaned-authority`;

the Build 95 strike becomes:
- `closed-restoration-ended`.

## Durable records

Build 95 stores:
- `SBE#` surcharge-breach episodes;
- `RPR#` recidivism penalty requirements;
- `RPA#` capital actions.

Capital-moving `RPA#` kinds are:
- `recidivism-topup`;
- `recidivism-release`.

Each penalty/action is mirrored onto:
- the real Build 55 monetary authority;
- the real Build 55 liquidity facility.

Each strike is mirrored onto:
- the real Build 55 monetary authority.

This makes isolated v95 reconstruction non-economic and idempotent.

## Recovery

If the v95 local arrays disappear while durable Build 95 markers remain, reconstruction restores:
- strike episodes;
- penalty requirements;
- penalty actions;
- serial counters;
- aggregate metrics.

Recovery does not:
- subtract capital again;
- release capital again;
- recreate facilities;
- rewrite Build 94 surcharge requirements;
- rewrite Build 93 restoration state.

## What Build 95 does not move

Build 95 never directly changes:
- monetary base;
- outstanding credit;
- reserve-account balances;
- borrower cash;
- facility principal;
- facility interest;
- contractual rate;
- Build 91 exception numbering;
- Build 92 required or held capital;
- Build 93 restoration-buffer target or held amount;
- Build 94 surcharge target or held amount.

Build 95 moves only:
- real Build 55 authority free capital;
- Build 95 recidivism-held capital.

## Deterministic validation

The committed Build 95 module is exercised against Build 92/93/94-compatible deterministic fixtures.

### No strike without observed Build 94 shortfall

Fixture:
- Build 95 active;
- live Build 93 restoration order;
- linked Build 94 requirement fully funded with shortfall94 = 0.

Result:
- no `SBE#`;
- no Build 95 requirement;
- no capital movement.

### First observed shortfall creates one strike

Fixture:
- live Build 93 `SRO1`;
- Build 94 `RSR1` has shortfall94 = 0.30.

Result:
- exactly one `SBE1`;
- current observed shortfall = 0.30;
- peak observed shortfall = 0.30;
- `RSR1` is stored in the grandfathered source set;
- no `RPR#` is created for `RSR1`.

### Cure does not erase strike

Fixture:
- `RSR1.shortfall94` later becomes 0;
- `SRO1` remains live.

Result:
- `SBE1` remains `strike-active`;
- current observed shortfall becomes 0;
- peak remains 0.30.

### Later exception receives penalty

Fixture:
- later Build 94 `RSR2` appears under the same `SRO1`;
- linked facility principal = 1.0;
- older Build 92/93/94 claims are current;
- authority free capital = 0.20.

Result:
- exactly one `RPR1`;
- required95 = 0.50;
- held95 = 0.20;
- shortfall95 = 0.30;
- authority free capital = 0.

### Older-layer priority

Fixture:
- `RPR1` remains underfunded;
- Build 94 shortfall is again positive;
- authority receives new free capital.

Result:
- Build 95 does not take that capital while the Build 94 shortfall remains;
- the Build 95 shortfall persists truthfully.

After Build 94 becomes current and 0.30 of genuinely free capital remains:
- Build 95 tops up to 0.50;
- shortfall95 becomes 0.

### Partial repayment

Facility principal 1.0 -> 0.4.

Result:
- required95 0.50 -> 0.20;
- held95 0.50 -> 0.20;
- 0.30 returns to authority capital.

### Monetization

The same facility becomes `monetized` at principal 0.4.

Result:
- required95 = 0.20;
- held95 = 0.20;
- status = `penalty-monetized`;
- no release merely because the credit became permanent money.

### Final repayment

Facility principal -> 0 and status -> `repaid`.

Result:
- required95 -> 0;
- held95 -> 0;
- remaining 0.20 returns to authority capital;
- status -> `released-repaid`.

Across the lifecycle:
- total Build 95 top-ups = 0.50;
- total Build 95 releases = 0.50.

### Same-cycle release priority

Fixture:
- one Build 95 penalty releases capital after repayment;
- another Build 95 penalty is underfunded;
- an older Build 93 restoration-buffer gap or Build 94 surcharge shortfall is still positive.

Result:
- the released capital is not recycled into the other Build 95 penalty during that pass;
- the next full reconciliation gives the older layer first claim.

## Isolated v95 recovery

After the lifecycle above, the isolated v95 arrays and counters are removed while durable Build 95 markers remain on the older authority/facility objects.

Reconstruction restores:
- one strike;
- one recidivism penalty;
- historical Build 95 actions;
- serial counters;
- final released state.

Authority free capital remains exactly where historical actions left it.

No capital movement is replayed.

## Historical finality

Build 95 preserves every older fact.

The Build 91 emergency exception remains valid.

The Build 92 capital requirement remains valid.

The Build 93 restoration order remains valid.

The Build 94 restoration surcharge remains valid.

The first failed Build 94 surcharge is not secretly increased after the fact.

Instead, the system can now say:
- a restoration episode was already open;
- a later emergency exception acquired a Build 94 surcharge;
- that surcharge ran short;
- supervision recorded a strike;
- the first failed surcharge remained grandfathered;
- the authority later issued another exception in the same restoration episode;
- that later exception acquired another 50% capital penalty;
- the penalty itself could be underfunded;
- repayment reduced it;
- monetization retained it;
- final closure released it.

New places include `a central bank paying a higher capital price after the first restoration surcharge ran short` and `a supervisory strike that does not punish the first breach twice but makes the next exception more expensive`.

Build 95 persists through `nothing-state-v95`, wraps the current save/render chain, loads after `restoration_surcharge.js`, and extends forget-through-v95.
