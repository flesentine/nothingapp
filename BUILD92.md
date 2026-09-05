# Build 92

Supervisory exception saturation acquired capital conservation.

Build 91 solves the unlimited-exception problem by ratcheting future monetary policy every time a supervised authority uses another emergency lending exception.

But that ratchet eventually runs out of ordinary levers.

The rate caps at 20%. The collateral floor caps at AAA.

After those limits are already in force, the next emergency override is still legally possible. Build 91 can register it, but it cannot make the rate higher or the collateral requirement tighter.

Build 92 creates the Interreality Supervisory Capital Conservation Board.

Once price and collateral supervision are already saturated, later emergency exceptions must be backed one-for-one by the issuing Build 55 authority's own capital.

The emergency loan remains valid.

The monetary authority simply loses access to an equal amount of free capital while that post-cap exception remains outstanding.

## Trigger

Build 92 does not charge the exception that first reaches the Build 91 ceiling.

It begins with the next exception.

The test is based on the Build 91 registration event's historical supervisory stage and exception number.

For each Build 90 stage:

### Stage 1

Build 90 base:
- 7.5%;
- A.

Build 91 reaches 20% / AAA on exception #8.

Therefore:
- exception #8 is not a Build 92 capital-backed exception;
- exception #9 is the first Build 92 capital-backed exception.

### Stage 2

Build 90 base:
- 9.5%;
- AA.

Build 91 reaches 20% / AAA on exception #7.

Therefore:
- exception #7 is not charged;
- exception #8 is the first Build 92 capital-backed exception.

### Stage 3

Build 90 base:
- 12%;
- AAA.

Build 91 reaches 20% / AAA on exception #5.

Therefore:
- exception #5 is not charged;
- exception #6 is the first Build 92 capital-backed exception.

This test is based on the stage recorded when the Build 91 exception was registered.

A later Build 90 stage escalation does not retroactively turn older exceptions into post-cap exceptions.

## Supervisory capital requirement

Every qualifying Build 91 registration receives one `SCR#`.

The required supervisory capital is:

`current Build 55 facility principal × 100%`

The requirement is dynamic.

For an active facility with 1.0 principal:
- required capital = 1.0.

For a partially repaid facility with 0.6 principal:
- required capital = 0.6.

For a monetized facility with 0.6 principal:
- required capital remains 0.6.

For a fully repaid facility:
- required capital = 0.

Build 92 does not use the old 0.01 debt-finality tolerance for this reserve.

Any positive principal above floating-point dust remains capital-backed.

## Real Build 55 capital

Build 92 uses the actual Build 55 authority `capital` field.

When a requirement is funded:
- free authority capital decreases;
- `supervisoryCapitalHeld92` increases by the same amount.

No new asset is invented.

The held amount is supervisory ring-fenced capital that the authority can no longer treat as free capital while the emergency exposure remains outstanding.

This has a real cross-layer consequence because old Build 55 uses `capital` when evaluating monetary-authority solvency and bad assets.

Build 92 therefore makes repeated post-cap emergency lending capable of weakening the authority's actual available capital.

## What does not move

A supervisory capital hold does not:
- create settlement reserves;
- extinguish settlement reserves;
- change monetary base;
- change outstanding credit;
- change reserve-account balances;
- change borrower cash;
- rewrite facility principal;
- rewrite facility interest;
- rewrite the facility's contractual rate.

Those monetary effects remain entirely under the old issuing/repayment layers.

Build 92 moves only the division between:
- free authority capital;
- supervisory capital held against post-cap exception exposure.

## Exact Build 90 → 91 → 55 → 92 chain

The canonical exact-predecessor harness starts with a Build 90 stage-1 authority.

Initial policy:
- 7.5%;
- A.

Exact old Build 55 then issues nine override facilities of principal 1.0 each.

Exact Build 91 registers all nine.

After exception #8:
- policy has reached 20% / AAA.

Exception #9 is therefore the first loan issued after the ordinary Build 91 ratchet was already exhausted.

Before Build 92:
- Build 91 exception count = 9;
- Build 91 registrations = 9;
- Build 91 ratchets = 7;
- authority policy = 20% / AAA;
- authority capital = 14;
- monetary base = 9;
- outstanding credit = 9.

Exact committed Build 92 creates exactly one capital requirement:

`SCR1`
- source exception: the Build 91 registration for LF9;
- facility: LF9;
- exception number: 9;
- required capital: 1.0;
- held capital: 1.0;
- shortfall: 0;
- status: `reserved-active`.

Authority free capital changes:
- 14→13.

Authority supervisory capital held becomes:
- 1.0.

Monetary base and outstanding credit remain exactly:
- 9;
- 9.

No Build 92 money creation or retirement occurs.

## Cross-stage boundary test

A compact exact-blob test supplies the boundary registration events for all three Build 90 stages.

Build 92 creates requirements only for:
- stage 1 exception #9;
- stage 2 exception #8;
- stage 3 exception #6.

It does not create requirements for:
- stage 1 exception #8;
- stage 2 exception #7;
- stage 3 exception #5.

Each qualifying 1.0 facility moves exactly 1.0 from free authority capital into supervisory capital.

## Partial repayment releases capital

The canonical stage-1 test starts after LF9 is fully capital-backed.

Before repayment:
- LF9 principal = 1.0;
- status = active;
- supervisory capital held = 1.0;
- authority free capital = 13;
- base = 9;
- credit = 9.

Exact old Build 55 `repayFacility(LF9, 0.4)` runs.

Old Build 55:
- borrower cash falls by 0.4;
- LF9 principal 1.0→0.6;
- monetary base 9→8.6;
- outstanding credit 9→8.6.

Build 92 then sees that only 0.6 of post-cap exception exposure remains.

It creates a capital-release action for 0.4.

After Build 92 reconciliation:
- required capital = 0.6;
- held capital = 0.6;
- authority free capital 13→13.4.

Build 92 does not change the 8.6 monetary base or 8.6 outstanding credit produced by old Build 55 repayment.

## Monetization keeps the capital locked

The same LF9 is then monetized by exact old Build 55 with 0.6 principal still outstanding.

Old Build 55:
- changes facility status to `monetized`;
- reduces outstanding credit by the remaining 0.6;
- leaves monetary base outstanding.

The exact test therefore moves:
- outstanding credit 8.6→8.0;
- monetary base remains 8.6.

Build 92 keeps:
- required capital = 0.6;
- held capital = 0.6;
- status = `reserved-monetized`.

That is deliberate.

Once emergency credit becomes permanent money, the corresponding post-cap supervisory capital is not released merely because the facility left the old `active` credit bucket.

## Full repayment releases the hold

A fully repaid post-cap exception has no remaining principal exposure.

Build 92 releases the corresponding held capital back to the real authority.

A precision harness uses only 0.005 of remaining active principal.

Build 92 still holds:
- 0.005 required;
- 0.005 held.

When the facility becomes `repaid` with principal zero:
- required becomes 0;
- held becomes 0;
- the 0.005 is returned to authority capital;
- status becomes `released-repaid`.

This proves Build 92 follows positive principal to zero instead of inheriting the old 0.01 finality tolerance.

## Capital shortfall

A post-cap exception can exceed available free authority capital.

The exact shortfall harness uses:
- exception facility principal = 1.0;
- free authority capital = 0.4.

Build 92 requires 1.0 but can initially ring-fence only 0.4.

Result:
- authority free capital 0.4→0;
- held capital = 0.4;
- shortfall = 0.6;
- requirement status = `capital-shortfall`.

Monetary base and outstanding credit remain:
- 1;
- 1.

Build 92 therefore does not pretend a reserve exists when the authority lacks capital.

## Later capital automatically tops up the reserve

The shortfall remains live.

If another 0.6 of authority capital later becomes available, Build 92 consumes it automatically.

The exact harness manually supplies 0.6 of later authority capital to represent later income or recapitalization.

Build 92 creates another capital-topup action:
- additional hold = 0.6;
- total hold = 1.0;
- shortfall = 0;
- free capital returns to 0;
- status becomes `reserved-active`.

Monetary base and outstanding credit remain unchanged.

## Durable actions

Build 92 records two kinds of `SCA#` actions:
- `capital-topup`;
- `capital-release`.

Each action records:
- linked `SCR#`;
- linked Build 91 exception;
- linked Build 55 facility;
- authority;
- amount;
- held capital before;
- held capital after;
- authority free capital after.

The requirement itself continuously records:
- current required capital;
- current held capital;
- current shortfall;
- current status.

## Recovery

Build 92 mirrors the current `SCR#` snapshot onto:
- the real Build 55 facility;
- the real Build 55 authority.

It also mirrors every `SCA#` action onto both objects.

This makes isolated v92 recovery non-economic.

The exact recovery harness first creates:
- one 1.0 capital requirement;
- initial top-up of 0.4;
- later top-up of 0.6.

At the recovery checkpoint:
- free authority capital = 0;
- held capital = 1.0;
- requirement status = `reserved-active`;
- monetary base = 1;
- outstanding credit = 1.

The isolated v92 requirement/action ledgers and counters are then removed.

Reconstruction restores:
- one `SCR#`;
- two `SCA#` top-up actions;
- total top-up amount 1.0;
- held capital 1.0;
- requirement status `reserved-active`.

After reconstruction:
- authority free capital remains 0;
- monetary base remains 1;
- outstanding credit remains 1.

No capital is transferred a second time.

## Historical finality

Build 92 preserves every older fact.

A Build 91 exception remains a valid emergency loan.

A Build 91 ratchet remains a valid supervisory response.

The exception that reached 20% / AAA remains uncharged by Build 92.

The next exception can remain legally valid while simultaneously causing the authority to lose access to an equal amount of its own capital.

Old Build 55 repayment can later reduce the public exposure and cause capital to be released.

Old monetization can turn the exception into permanent money while the capital hold remains.

The system can therefore say all of these things at once:
- supervision exhausted its rate lever;
- supervision exhausted its collateral lever;
- emergency law still issued another loan;
- the loan remained valid;
- the authority had to lock its own capital behind it;
- repayment released that capital;
- monetization did not.

New places include `a lender of last resort running out of policy levers and having to collateralize itself` and `central-bank capital locked behind an emergency loan that supervision could no longer make more expensive`.

Build 92 persists through `nothing-state-v92`, wraps the existing save/render chain, loads after `supervisory_exceptions.js`, and extends forget-through-v92.

`supervisory_capital.js` passes V8 syntax validation. Exact committed-function tests cover stage-specific post-cap boundaries, the exact nine-exception Build 55/90/91 predecessor chain, one-for-one capital hold, partial repayment release, monetization retention, positive-principal dust backing, capital shortfall, later reserve top-up, and idempotent isolated-v92 recovery.
