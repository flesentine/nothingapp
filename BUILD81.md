# Build 81

Segregated carry margin acquired setoff. Build 80 creates a real segregated margin balance against the Build 79 FX carry while the same borrower still owes the old Build 55 sterilization facility that funded the carry. Build 81 gives the public lender a setoff right over that segregated margin through the Interreality Segregated Margin Setoff Office.

Setoff is not ordinary borrower repayment. The posted Build 80 margin has already been removed from borrower cash. Build 81 therefore moves it directly from the segregated buffer into the old Build 55 balance sheet without crediting borrower cash first.

A position is eligible only while its linked Build 55 sterilization facility is still active, posted Build 80 margin exceeds 0.01, and at least one stress condition exists: the Build 79 carry is `rollover-risk`, the carry is `open-permanent-money`, the Build 55 facility is within 15 seconds of maturity, or a live Build 80-originated Build 55 collateral call exists.

The amount seized is capped by currently posted Build 80 margin and the linked Build 55 facility's remaining principal plus accrued interest. Setoff pays principal first and then accrued interest, matching the economic ordering of old Build 55 repayment.

Principal setoff reduces the actual Build 55 facility principal, the issuing monetary authority's monetary base and outstanding credit, and the linked Build 55 reserve-account balance. The same principal amount increments the existing Build 55 `reservesExtinguished55` total. Any interest setoff reduces accrued facility interest and increases monetary-authority capital.

The Build 80 position's `macroMarginPosted80` balance falls by the amount seized. Historical Build 80 call records and cumulative posted-margin counters remain historical facts rather than being rewritten as though the margin had never been posted.

If the Build 80 margin failure already created a real Build 55 `CBMC#`, Build 81 applies the same setoff to that obligation. A fully covered old call becomes `met` and increments the existing Build 55 collateral-call-met counter. A partially covered call is reduced to its true remaining amount and left or returned to `open`, allowing exact old Build 55 `meetMonetaryCall()` to collect the remainder normally.

For a previously failed Build 55 call, Build 81 preserves the original amount in `originalAmount81`, records the amount already paid by ordinary Build 55 cash and the amount paid through setoff, resets the live `amount` to the remaining obligation, and reopens the call. This avoids double collection while restoring compatibility with the old Build 55 routine, which expects an open call whose `amount` is the amount still due.

The canonical rollover-risk harness begins with a 3.6 RB Build 79 carry, 1.26 RB of Build 80 margin, and a 4.0 Build 55 sterilization facility. Build 81 seizes all 1.26. Facility principal falls 4.00→2.74, monetary base 19.00→17.74, outstanding credit 4.00→2.74, reserve-account balance 4.00→2.74, and cumulative Build 55 reserves extinguished rise 5.00→6.26. Posted carry margin falls 1.26→0.

The carry remains `rollover-risk`, so the buffer seizure immediately recreates the macroprudential problem. Exact committed Build 80 code sees the same 3.6 domestic carry basis, the same 35% rollover-risk margin rate, and zero posted margin. It creates a new 1.26 margin call. The policy loop is therefore real: margin is posted, public credit seizes it, public credit shrinks, and the carry immediately needs the same margin again.

A partial Build 55-call harness begins with 0.50 segregated margin, 4.0 facility principal, and `CBMC1` for 1.4. Build 81 seizes the 0.50, reducing facility principal 4.0→3.5, monetary base 19.0→18.5, outstanding credit 4.0→3.5, and the reserve account 4.0→3.5. `CBMC1` is reduced from 1.4 to 0.9 and remains open.

Exact old Build 55 `meetMonetaryCall()` then services that reduced 0.9 obligation normally. Borrower cash falls 2.0→1.1, facility principal 3.5→2.6, monetary base 18.5→17.6, the call becomes `met`, and 0.9 is recorded as paid. The combination of 0.5 setoff plus 0.9 ordinary Build 55 collection exactly settles the original 1.4 call without double collection.

A previously failed-call harness begins with original `CBMC1` amount 1.4 and 0.4 already collected by old Build 55 before failure. Build 81 then applies 0.5 segregated margin. The old call is reopened with exactly 0.5 remaining, records 0.5 as Build 81 setoff, and increments the Build 81 reopened-call counter.

Full facility repayment also handles residual margin correctly. With only 0.5 principal left and 0.72 segregated margin, Build 81 seizes 0.5, reduces principal to zero, marks the facility `repaid`, and leaves 0.22 still segregated. Exact Build 80 reconciliation recognizes the repaid Build 55 facility and releases that 0.22 back to actual borrower cash.

Build 81 stores an immutable `MSX#` setoff record on both the Build 79 position and the linked Build 55 facility. The facility marker records amount seized, principal and interest paid, margin before/after, facility principal before/after, public-money balances after settlement, any linked `CBMC#`, and whether the call was cured or reopened.

If isolated v81 state is missing while older Build 55/79/80 state survives, Build 81 reconstructs its setoff ledger and aggregate counters from those facility markers without reducing facility principal, monetary base, reserve-account balance, or posted margin a second time. The recovery harness preserved principal 2.74, monetary base 17.74, posted margin zero, and Build 55 reserves extinguished 6.26 while rebuilding the 1.26 `MSX1` record.

Build 81 persists through `nothing-state-v81`, wraps the existing save/render chain, loads after `carry_margin.js`, and extends forget-through-v81. It updates the actual Build 55 facility, monetary authority, reserve account, and collateral-call objects plus the live Build 79/80 posted-margin state. It does not create a shadow monetary balance sheet or rewrite the historical Build 80 margin-call record.

New places include `central bank seizing segregated carry margin to repay the loan that funded the carry` and `risk buffer extinguishing public money and immediately needing to be rebuilt`. `margin_setoff.js` passes V8 syntax validation. Exact committed-function tests cover rollover-risk setoff, immediate Build 80 re-margin, partial Build 55 call reduction and legacy collection, failed-call reopening, full facility repayment with Build 80 residual-margin release, and idempotent marker reconstruction.
