# Build 86

Cross-default deficiency acquired a cash sweep.

Build 85 can close the FX carry, seize its segregated margin, and still leave real Build 55 principal outstanding. It accelerates that debt, but exact old Build 55 may immediately evergreen the facilities when repayment cash is insufficient. The carry is dead while the lender-of-last-resort debt survives.

Build 86 creates the Interreality Post-Default Cash Sweep Office and gives that surviving public deficiency a floating claim on later borrower liquidity.

The trigger is a historical Build 85 case whose status remains `liquidated-deficiency` and whose linked Build 55 facilities still contain principal or accrued interest. Build 86 does not reopen the liquidated carry and does not change the historical Build 85 case status.

The workout protects a small operating buffer. The protected floor is fixed at 10% of the original Build 85 deficiency, bounded to a minimum of 0.10 and maximum of 0.50. The floor is stored on the Build 85 case the first time Build 86 evaluates it.

Freezing the floor is important. An earlier implementation recalculated 10% from the shrinking current principal. Every sweep then lowered the floor and created another timer-driven sweep even without new borrower cash. The final policy fixes the floor to the original deficiency so only genuinely new liquidity is trapped.

Borrower cash at or below the protected floor is untouched. Cash above the floor is available to the public workout up to the total surviving facility principal and accrued interest.

Principal is paid first and allocated pro rata across all surviving facilities in the Build 85 chain. Every principal dollar directly reduces the actual Build 55 facility principal, monetary base, reserve-account balance, and existing `reservesExtinguished55` history.

For an active Build 55 facility, principal payment also reduces outstanding credit. For a facility already converted to `monetized` by old Build 55, Build 86 still extinguishes principal and monetary base but does not reduce outstanding credit again because Build 55 monetization already removed that amount from outstanding credit.

Only after available principal is paid does Build 86 pay accrued facility interest. Interest increases the actual monetary authority's capital. It does not reduce monetary base, outstanding credit, or reserves a second time.

Open, failed, and forborne Build 55 collateral calls on a paid facility receive `paidCashSweep86`. When the cash-sweep principal payment fully covers the remaining call amount, the old call becomes `met`, preserves its previous status in `preCashSweepStatus86`, receives `metByCashSweep86=true`, and increments the existing Build 55 met-call counter.

If all linked public principal and interest are extinguished, the Build 86 event becomes `cured-after-default`. The linked Build 55 facilities become ordinary `repaid` records with `repaidByCashSweep86=true`. The historical Build 85 case remains `liquidated-deficiency`, but receives `cashSweepCured86=true` and a zero current cash-sweep outstanding balance.

If debt remains, the event stays `swept`, the real facilities stay active or monetized, and the borrower remains subject to future sweeps whenever new cash rises above the same frozen operating floor.

The canonical Build 85 deficiency is 2.26, leaving two active Build 55 facilities at 1.13 each. Its protected Build 86 operating floor is therefore 0.226.

With borrower cash only 0.10, exact committed Build 86 creates no sweep. Cash, monetary base, outstanding credit, and facility principal remain unchanged.

With borrower cash 1.00:
- protected floor = 0.226;
- available later cash = 0.774;
- Build 86 sweeps exactly 0.774;
- borrower cash 1.00→0.226;
- LF2 principal 1.13→0.743;
- LF3 principal 1.13→0.743;
- monetary base 17.26→16.486;
- outstanding credit 2.26→1.486;
- reserve-account balance 2.26→1.486.

The exact old Build 55 maturity routine was then run against those two 0.743 facilities with borrower cash still 0.226. Because 0.226 is below 75% of either facility principal, exact old Build 55 evergreens both loans again. Their maturities move out one minute, authority independence falls 0.82→0.80, and credibility falls 0.76→0.744. Build 86 does not rewrite that historical rule.

With no new borrower cash after that evergreen, Build 86 creates no second sweep.

When another 1.00 of borrower cash later appears, cash becomes 1.226. The protected floor is still the original 0.226, so Build 86 sweeps exactly the new 1.00:
- borrower cash returns to 0.226;
- LF2 0.743→0.243;
- LF3 0.743→0.243;
- outstanding public principal 1.486→0.486;
- both old Build 55 collateral calls become `met` once their remaining amounts are fully covered by cash-sweep principal retirement.

A full cure harness starts with the original two 1.13 facilities and borrower cash 3.00. The protected floor is still 0.226, but the debt itself is only 2.26, so Build 86 sweeps exactly 2.26 and leaves the remaining 0.74 as borrower equity cash.

The full cure produces:
- LF2 1.13→0 and `repaid`;
- LF3 1.13→0 and `repaid`;
- monetary base 17.26→15.00;
- outstanding credit 2.26→0;
- reserve-account balance 2.26→0;
- both Build 55 collateral calls become `met`;
- the Build 85 case remains historically `liquidated-deficiency` but receives `cashSweepCured86=true`.

Monetized debt is also redeemable. In the exact harness, one active 0.60 facility and one already-monetized 0.60 facility share a 1.20 post-default deficiency. Build 86 sweeps 1.20, retires both principals, and reduces monetary base by the full 1.20. Outstanding credit falls only by the active 0.60 because the monetized 0.60 was already removed from credit when Build 55 monetized it.

Interest is handled separately. With two facilities each carrying 0.50 principal and 0.05 accrued interest, total public debt is 1.10. Build 86 sweeps exactly 1.10:
- principal retired = 1.00;
- interest paid = 0.10;
- monetary base 16.00→15.00;
- outstanding credit 1.00→0;
- `reservesExtinguished55` 9.00→10.00;
- monetary-authority capital 14.00→14.10.

So interest never masquerades as monetary-base extinction.

Build 86 blocks the entire sweep if any Build 85 facility record is missing or any linked public authority record is missing. Borrower cash does not move in those orphaned states.

Durable `CSW#` snapshots are written to the Build 85 case and every facility participating in the sweep. If isolated v86 state is lost, Build 86 reconstructs the sweep ledger, serials, amount/principal/interest totals, cured-call totals, and cured-case totals from those markers.

The exact recovery harness removes isolated v86 state after the canonical 0.774 partial sweep. Reconstruction restores exactly one `CSW1` event and the 0.774 historical principal retirement while leaving borrower cash 0.226, monetary base 16.486, outstanding credit 1.486, and both facility principals 0.743 unchanged. Because the protected floor is fixed at the original 0.226, recovery does not trigger another sweep.

Build 86 persists through `nothing-state-v86`, wraps the existing save/render chain, loads after `funding_cross_default.js`, and extends forget-through-v86.

New places include `borrower survived liquidation but its future cash belonged to the central bank first`, `evergreened emergency loans becoming a floating lien on later liquidity`, and `dead carry stayed dead while later cash repaid the debt it left behind`.

`post_default_cash_sweep.js` passes V8 syntax validation. Exact committed-function tests cover protected-floor no-op, partial sweep, repeated later-cash sweep, old Build 55 evergreen coexistence, full cure, Build 55 call cure, monetized-facility redemption, interest accounting, missing-record blocking, and idempotent v86 reconstruction.
