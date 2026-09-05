# Build 87

Cash sweep acquired residual interest claims.

Build 86 can repay all monetary principal while leaving a small amount of accrued interest behind. That creates a state old Build 55 was never designed to handle: an `active` lender-of-last-resort facility with principal exactly zero and only interest remaining.

Exact old Build 55 reproduces the bug. Its maturity test is based on whether borrower cash is at least 75% of principal. When principal is zero, the threshold is automatically satisfied. The old code therefore keeps trying `repayFacility()`, but if borrower cash is zero the repayment returns false. The facility remains active, maturity remains expired, no evergreen penalty occurs, and interest no longer grows because accrual is principal × rate. The result is a zero-principal monetary zombie.

Build 87 creates the Interreality Residual Interest Claims Office.

The new layer separates money from fees. A Build 55 facility tied to a historical Build 85 `liquidated-deficiency` case is eligible when:
- status is `active` or `monetized`;
- principal is at or below 0.01;
- accrued interest is above 0.01;
- no Build 87 claim has already been created for that facility.

Crystallization creates one `RIC#` residual-interest claim for the exact unpaid interest. It records the source Build 55 facility, Build 85 cross-default case, borrower, authority, and original/outstanding amount.

Crystallization itself moves no money.

The source facility is changed to `repaid`, principal is fixed at zero, accrued interest is set to zero, and the old monetary facility receives `repaidPrincipalOnly87=true` plus the linked `RIC#`. Monetary base, outstanding credit, reserve-account balance, reserves-extinguished history, borrower cash, and authority capital are unchanged.

This is intentional: the monetary principal was already extinguished by Builds 85/86. The remaining interest is no longer treated as settlement money or lender-of-last-resort credit.

Once all linked facilities have been reduced to zero and any residual interest has been detached, Build 87 sets the current Build 86 cash-sweep outstanding amount to zero and `cashSweepCured86=true`. Historical `CSW#` records are not rewritten. Build 87 separately records the new current obligation in `residualInterestOutstanding87`.

Later payments use the same frozen operating floor already established by Build 86. Build 87 does not invent another liquidity threshold.

Cash above that floor can pay due/partial `RIC#` claims. If a case has several claims, payment is allocated pro rata by current outstanding amount.

A `RIP#` payment:
- reduces actual borrower cash;
- increases the linked monetary authority's capital;
- reduces the `RIC#` outstanding amount;
- does not change monetary base;
- does not change outstanding credit;
- does not change reserve-account balances;
- does not increment reserves extinguished.

When a claim reaches zero it becomes `paid`. When every `RIC#` for the Build 85 case is paid, the historical Build 85 case remains `liquidated-deficiency`, while Build 87 marks `residualInterestCured87=true`.

The exact old-Build-55 zombie harness begins with one facility:
- status `active`;
- principal 0;
- interest 0.05;
- maturity already passed;
- borrower cash 0;
- monetary base 15;
- outstanding credit 0.

Exact committed Build 55 `accrue()` leaves the facility active with principal 0 and interest 0.05. Maturity remains expired, independence and credibility do not change, and no cash moves. The zombie state is therefore real.

The canonical Build 87 crystallization harness uses two such facilities, each with 0.05 residual interest. Build 87 creates:
- `RIC1 = 0.05`;
- `RIC2 = 0.05`.

Both source facilities become ordinary `repaid` records with principal 0 and interest 0. The Build 85 case now has 0.10 of residual-interest outstanding. Borrower cash stays 0, monetary base stays 15, outstanding credit stays 0, reserve-account balance stays 0, reserves-extinguished history is unchanged, and authority capital stays 14.

The exact Build 86→87 handoff is also tested from the committed predecessor rather than a hand-built interest-only state.

Starting state:
- LF2 principal 0.50 + interest 0.05;
- LF3 principal 0.50 + interest 0.05;
- total public debt 1.10;
- Build 86 protected floor 0.11;
- borrower cash 1.14;
- monetary base 16;
- outstanding credit 1.

Exact committed Build 86 sweeps 1.03:
- principal retired = 1.00;
- interest paid = 0.03;
- borrower cash 1.14→0.11;
- monetary base 16→15;
- outstanding credit 1→0;
- authority capital 14→14.03.

The predecessor leaves:
- LF2 principal 0 / interest 0.02;
- LF3 principal 0 / interest 0.05;
- current Build 86 cash-sweep outstanding 0.07.

Build 87 then creates:
- `RIC1 = 0.02`;
- `RIC2 = 0.05`.

Both monetary facilities become `repaid`. Build 86's current cash-sweep outstanding becomes 0 and its current cure flag becomes true. Build 87 records 0.07 of separate residual-interest outstanding. Borrower cash remains 0.11, monetary base remains 15, outstanding credit remains 0, and authority capital remains 14.03.

The standard payment harness uses two 0.05 claims and the Build 86 floor of 0.226.

With borrower cash 0.30:
- cash above the floor = 0.074;
- Build 87 creates `RIP1` for 0.074;
- each 0.05 claim receives 0.037;
- each claim remains partial with 0.013 outstanding;
- borrower cash 0.30→0.226;
- authority capital 14→14.074;
- monetary base remains 15;
- outstanding credit remains 0;
- reserve-account balance remains 0.

When another 0.50 of borrower cash later arrives, only 0.026 of residual interest remains. `RIP2` therefore pays exactly 0.026:
- each claim receives its remaining 0.013;
- both claims become `paid`;
- borrower cash 0.726→0.70;
- authority capital 14.074→14.10;
- base and credit remain 15 / 0;
- the Build 85 case gets `residualInterestCured87=true`.

A principal-zero facility already marked `monetized` is handled the same way. Because its monetary principal is already zero, Build 87 can crystallize its interest and close the facility without touching outstanding credit or monetary base.

Missing authority records block crystallization before any facility state is changed. Later payment is likewise blocked if any due claim's authority record is missing.

Durable recovery is split intentionally between claim state and payment receipts.

The latest `RIC#` snapshot is upserted on the source facility and the Build 85 case whenever the claim changes. Each `RIP#` receipt is stored on the Build 85 case.

If isolated v87 state is lost after a partial payment, reconstruction restores:
- the exact current `RIC#` balances/statuses;
- the `RIP#` payment ledger;
- claim/payment serials;
- total crystallized interest;
- total collected interest;
- current case outstanding;
- cured-case count.

The recovery harness after `RIP1 = 0.074` restores both claims at 0.013 outstanding, restores the 0.074 payment receipt, and leaves borrower cash 0.226, monetary base 15, outstanding credit 0, and authority capital 14.074 unchanged. No payment is replayed.

Build 87 persists through `nothing-state-v87`, wraps the existing save/render chain, loads after `post_default_cash_sweep.js`, and extends forget-through-v87.

New places include `central-bank loan principal died before its interest bill did`, `a repaid monetary facility leaving a debt-shaped ghost behind`, `monetary principal repaid while its interest survived as a separate claim`, and `the last debt ghost paid without recreating monetary credit`.

`residual_interest.js` passes V8 syntax validation. Exact committed-function tests cover the old Build 55 zero-principal zombie, balance-sheet-neutral crystallization, exact Build 86→87 handoff, partial and full later-cash payment, monetized-source crystallization, missing-authority blocking, and idempotent reconstruction of both claims and payment receipts.
