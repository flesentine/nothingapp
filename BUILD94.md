# Build 94

Capital restoration acquired an exception surcharge.

Build 93 makes a real Build 92 capital shortfall persist as a restoration episode.

That episode can remain live even after the original Build 92 shortfall is cured, because the authority may still be rebuilding its restoration buffer while post-cap exposure remains outstanding.

The next problem is repeat behavior.

Without another consequence, a monetary authority that already failed its one-for-one Build 92 capital requirement can keep issuing later post-cap emergency exceptions during the same restoration episode. Build 91 will register them. Build 92 will require one-for-one capital. Build 93 will continue its restoration plan. But the new exception is not itself made more expensive merely because the earlier breach is still unresolved.

Build 94 creates the Interreality Restoration Surcharge Office.

A later post-cap exception issued while an earlier Build 93 restoration order is still live now carries an additional capital surcharge equal to 50% of the facility's current principal.

The older emergency loan remains valid.

Build 94 does not rewrite Build 91, Build 92, or Build 93. It adds a new consequence after them.

## Forward-only boundary

Build 94 is not retroactive.

The Build 94 office records its own activation time.

A Build 91 exception registration is eligible only when:
- it is created at or after Build 94 activation;
- it already has a real Build 92 `SCR#`, proving that it is a post-cap exception;
- the same authority already has a live Build 93 `SRO#`;
- that Build 93 order was created no later than the new exception registration.

This means the exception that originally caused the Build 93 restoration episode is not retroactively surcharged by Build 94.

The surcharge begins with a later post-cap exception while that restoration episode is still alive.

## Live restoration episode

A Build 93 restoration order is considered live while its status is anything other than:
- `released-exposure-closed`;
- `orphaned-authority`.

That includes:
- `capital-deficient`;
- `buffer-building`;
- `buffered-active`.

The important fact is not merely whether the current restoration buffer is complete.

The important fact is that the earlier supervisory-capital breach still belongs to an open restoration episode whose underlying post-cap exposure has not fully disappeared.

## Surcharge requirement

Each eligible later exception receives one `RSR#`.

The surcharge target is:

`current Build 55 facility principal × 50%`

For a later eligible facility with principal 1.0:
- Build 92 requirement = 1.0;
- Build 94 surcharge = 0.5.

The Build 94 amount is separate from the Build 92 one-for-one requirement and from the Build 93 restoration buffer.

It is not folded into either older ledger.

## Real Build 55 capital

Build 94 uses the actual Build 55 authority `capital` field.

If the surcharge requirement is 0.50 and only 0.20 of free authority capital remains:
- free authority capital 0.20 -> 0;
- Build 94 held surcharge capital = 0.20;
- Build 94 surcharge shortfall = 0.30.

If another 0.30 of free capital later becomes available:
- Build 94 takes that 0.30;
- held surcharge capital becomes 0.50;
- surcharge shortfall becomes zero.

No synthetic capital is created.

## Layer priority

Build 94 loads after Build 93.

Therefore the existing layers reconcile first:
1. Build 92 reconciles its one-for-one supervisory capital requirement.
2. Build 93 reconciles the restoration order and restoration buffer.
3. Build 94 receives only whatever real free authority capital remains afterward.

That ordering is deliberate.

Build 94 never steals capital away from an older supervisory obligation.

If Build 92 or Build 93 has already consumed the available free capital, the Build 94 surcharge truthfully remains underfunded.

Same-cycle releases also preserve that priority.

If one Build 94 requirement releases capital while an older Build 92 shortfall or Build 93 restoration-buffer gap is still open, Build 94 does not immediately recycle that released capital into another Build 94 surcharge. The capital is left free for the next reconciliation, allowing the older layer to take its contractual first claim before Build 94 tries again.

## Dynamic principal

The surcharge follows current facility principal.

For an eligible facility:
- principal 1.0 -> surcharge 0.50;
- principal 0.4 -> surcharge 0.20;
- principal 0 -> surcharge 0.

A principal repayment therefore reduces the surcharge one-for-one at the 50% rate.

Example:
- initial principal = 1.0;
- held surcharge = 0.50;
- principal later falls to 0.4.

Build 94 releases:
- 0.30 of surcharge capital.

The remaining requirement is:
- 0.20.

The release returns to the real Build 55 authority `capital` field.

## Monetization

Build 55 monetization does not release the Build 94 surcharge.

If an eligible facility is monetized with 0.4 principal remaining:
- Build 94 required surcharge remains 0.20;
- held surcharge remains 0.20;
- status becomes `surcharge-monetized`.

That matches the Build 92 treatment of permanent-money exposure.

The emergency credit may leave the old outstanding-credit bucket, but the supervisory capital consequence remains attached to the surviving principal.

## Closure

When the linked facility reaches zero principal and closes:
- required surcharge becomes 0;
- held surcharge becomes 0;
- any remaining surcharge capital returns to free authority capital.

A repaid facility becomes:
- `released-repaid`.

Another zero-principal closure becomes:
- `released-closed`.

The historical surcharge record remains.

## What Build 94 does not move

Build 94 never directly changes:
- monetary base;
- outstanding credit;
- reserve-account balances;
- borrower cash;
- facility principal;
- facility interest;
- contractual rate;
- Build 91 exception numbering;
- Build 92 required capital;
- Build 92 held capital;
- Build 93 restoration-buffer target;
- Build 93 restoration-buffer held amount.

Build 94 moves only:
- free Build 55 authority capital;
- Build 94 surcharge-held capital.

## Durable actions

Build 94 records `RSA#` actions.

Capital-moving action kinds are:
- `surcharge-topup`;
- `surcharge-release`.

Each action records:
- linked `RSR#`;
- linked Build 91 exception;
- linked Build 92 `SCR#`;
- linked Build 93 `SRO#`;
- facility;
- authority;
- amount;
- held surcharge before;
- held surcharge after;
- authority free capital after.

## Recovery

Build 94 mirrors each `RSR#` snapshot and `RSA#` action onto:
- the real Build 55 facility;
- the real Build 55 monetary authority.

This makes isolated v94 reconstruction non-economic.

If the v94 local ledger disappears while the durable markers remain, reconstruction restores:
- surcharge requirements;
- surcharge actions;
- serial counters;
- aggregate held/shortfall metrics.

Recovery does not:
- subtract capital a second time;
- release capital a second time;
- recreate monetary balances;
- rewrite Build 92 or Build 93 state.

## Deterministic validation

The committed Build 94 module is exercised against Build 92/93-compatible deterministic fixtures.

### No retroactive surcharge

Fixture:
- Build 94 office activation = t1000;
- live Build 93 order already exists;
- post-cap Build 91 registration occurred at t900.

Result:
- no Build 94 requirement;
- no authority capital movement.

### No surcharge without prior restoration episode

Fixture:
- post-cap Build 91 registration at t1100;
- matching Build 92 requirement exists;
- no live Build 93 restoration order existed before the registration.

Result:
- no Build 94 requirement.

### Eligible later exception

Fixture:
- live Build 93 order created at t500;
- Build 94 office active at t1000;
- later post-cap Build 91 exception registered at t1100;
- linked facility principal = 1.0;
- free authority capital = 0.20.

Result:
- exactly one `RSR1`;
- surcharge target = 0.50;
- held = 0.20;
- shortfall = 0.30;
- free authority capital = 0;
- status = `surcharge-shortfall`.

### Same-cycle older-layer priority

Fixture:
- one Build 94 surcharge releases 0.30 after a principal reduction;
- a different Build 94 surcharge remains underfunded;
- the same authority still has a positive Build 93 restoration-buffer gap.

Result:
- the 0.30 release returns to real authority capital;
- the other Build 94 surcharge does not immediately take it in the same Build 94 pass;
- the next full reconciliation gives Build 93 first claim before Build 94 retries.

### Later top-up

Later free authority capital = 0.30.

Result:
- Build 94 held surcharge 0.20 -> 0.50;
- surcharge shortfall -> 0;
- free authority capital -> 0;
- status -> `surcharge-active`.

### Partial repayment

Linked facility principal 1.0 -> 0.4.

Result:
- required surcharge 0.50 -> 0.20;
- held surcharge 0.50 -> 0.20;
- 0.30 returns to authority capital.

### Monetization

The same 0.4-principal facility becomes `monetized`.

Result:
- required = 0.20;
- held = 0.20;
- status = `surcharge-monetized`;
- no release occurs merely because old outstanding credit changed.

### Final repayment

Facility principal -> 0 and status -> `repaid`.

Result:
- required -> 0;
- held -> 0;
- remaining 0.20 returns to authority capital;
- status -> `released-repaid`.

Across the full lifecycle:
- total surcharge top-ups = 0.50;
- total surcharge releases = 0.50.

## Isolated v94 recovery

After the lifecycle above, the isolated v94 requirement/action arrays and counters are removed while durable Build 94 markers remain on the older authority/facility objects.

Reconstruction restores:
- one `RSR1`;
- four `RSA#` actions;
- requirement serial = 1;
- action serial = 4;
- final released state.

Authority free capital remains exactly where the historical actions left it.

No capital movement is replayed.

## Historical finality

Build 94 preserves every older fact.

The Build 91 exception remains a legally issued emergency exception.

The Build 92 `SCR#` remains the one-for-one capital requirement.

The Build 93 `SRO#` remains the restoration episode created by the earlier breach.

Build 94 does not pretend the later emergency facility was never issued.

Instead, the system can now say:
- an earlier post-cap exception exhausted available capital;
- a restoration order was imposed;
- the restoration episode remained open;
- another post-cap exception was still issued;
- that later exception remained valid;
- supervision responded by charging an additional 50% capital surcharge;
- the surcharge itself could become underfunded;
- repayment reduced it;
- monetization did not release it;
- final closure eventually returned the surcharge capital.

New places include `emergency lending getting more expensive after the central bank already failed its capital test` and `restoration plan charging a surcharge on the next exception before the old episode is over`.

Build 94 persists through `nothing-state-v94`, wraps the current save/render chain, loads after `capital_restoration.js`, and extends forget-through-v94.

`restoration_surcharge.js` passes V8/Node syntax validation. Deterministic committed-function fixtures cover forward-only eligibility, no false trigger without a prior restoration episode, partial surcharge funding, later top-up, dynamic repayment release, monetization retention, closure release, and isolated v94 reconstruction without duplicate capital movement.
