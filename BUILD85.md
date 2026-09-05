# Build 85

Cross-facility collateral netting acquired cross-default. Build 84 can create real Build 55 collateral calls when a fragmented carry-funding chain collectively exceeds the borrower collateral pool. Build 84 deliberately counts failed and forborne calls as unresolved coverage so it does not duplicate the same aggregate deficiency. That leaves a new consequence: the chain can remain undercollateralized after its enforcement call has failed or been waived.

Build 85 creates the Interreality Funding-Chain Cross-Default Office.

The trigger is narrow. A live Build 79 carry enters Build 85 only when a Build 84-created `CBMC#` tied to that carry becomes `failed` or `forborne`. Unrelated failed Build 55 calls do not trigger cross-default.

Triggering does not immediately erase or rewrite the old Build 55 call. The triggering call keeps its old procedural status and remains the historical reason the chain defaulted.

At trigger, Build 85 freezes the carry/refinancing loop before liquidation:
- the Build 79 carry status becomes `cross-default85`;
- the previous carry status is preserved in `preCrossDefaultStatus85`;
- current Build 80 segregated margin is moved into the Build 85 default estate and current posted margin becomes zero;
- open/partial Build 80 margin calls are changed to `frozen-cross-default85`;
- every active public facility tied to the carry is marked with the same `XDF#`;
- the current funding link is not novated while the carry is in cross-default.

This freeze is intentionally cross-layer. Exact Build 82 sees frozen replacement-margin calls as ineligible and cannot create another refinancing facility. Exact Build 83 ignores the position because `cross-default85` is not a live pre-default carry status. Build 84 likewise stops opening new audits because its live-carry filter excludes the defaulted position.

The default estate has two asset sources:
1. Build 80 segregated margin already posted before the cross-default; and
2. the current domestic value of the remaining Build 79 FX carry.

Resolving a case liquidates the entire remaining foreign carry through the real Build 56 FX market using the same directional/liquidity impact formula as a Build 79 close. The proceeds go directly into the default estate rather than passing through borrower cash first.

The Build 79 position is then closed historically. Build 85 writes the normal Build 79 close fields—exit rate, exit FX impact, realized P/L, closed timestamp, current funding-facility carry marker, and Build 79 closed/realized-P&L counters—plus `closedByCrossDefault85` and the Build 85 outcome.

The estate pays principal across the active funding chain pro rata by principal. Principal payments directly reduce the real Build 55 facility principal, monetary base, outstanding credit, reserve-account balance, and existing `reservesExtinguished55` history. Any remaining estate cash then pays accrued facility interest, which increases monetary-authority capital.

Build 85 also reconciles unresolved Build 55 calls against principal retired from each facility. Open, failed, or forborne calls receive `paidCrossDefault85`. If the principal payment fully covers a call's unpaid amount, the call becomes `met`, preserves its previous status in `preCrossDefaultStatus85`, receives `metByCrossDefault85=true`, and increments the existing Build 55 call-met counter.

If margin plus carry liquidation fully pays all facility principal and interest, the case becomes `resolved-paid`. Facilities whose balances reach zero become ordinary `repaid` Build 55 facilities with `repaidByCrossDefault85=true`. Any estate surplus after public debt is paid returns to the actual borrower as equity residual.

If the estate is insufficient, the case becomes `liquidated-deficiency`. The FX carry is still closed, but the unpaid real Build 55 facilities remain active with their actual residual principal. Build 85 does not create a shadow deficiency ledger instead of the real public debt.

Residual facilities receive `crossDefaultDeficiency85`, `crossDefaultAccelerated85=true`, and immediate maturity. This deliberately hands the surviving debt back to old Build 55 lifecycle rules.

That produces an intentional historical collision: exact old Build 55 may evergreen a supposedly accelerated cross-default loan if borrower cash remains below the old 75% repayment threshold.

The exact failed-call trigger harness uses a Build 84 call for 0.44, LF2 principal 1.26, and borrower cash 0.10. Exact committed Build 55 `meetMonetaryCall()` takes the available 0.10, reducing LF2 principal 1.26→1.16 and borrower cash 0.10→0, then marks the call `failed`. Exact Build 85 reconciliation sees that failed Build 84 call, opens `XDF1`, changes the carry to `cross-default85`, and sequesters the existing 0.70 posted margin.

The exact forbearance trigger harness starts from the same open Build 84 call. Exact Build 55 `forbearCall()` changes it to `forborne`, increments old collateral-forbearance history, and reduces authority independence 0.82→0.78 and credibility 0.76→0.73. Exact Build 85 then opens `XDF1` on the same carry and sequesters the 0.70 margin.

An unrelated failed Build 55 call with no `crossFacilityNetting84` / matching `positionId79` does not trigger Build 85.

The canonical full-resolution harness uses two active 1.26 facilities, 1.26 of posted margin, and a 3.5-RA carry marked at `RA/RB=1.0336561099`. The carry liquidation produces about 3.6177963846 RB. Together with the 1.26 margin estate, the case has more than enough value to retire both facilities.

Build 85 retires 2.52 principal:
- LF2 1.26→0;
- LF3 1.26→0;
- monetary base 17.52→15.00;
- outstanding credit 2.52→0;
- reserve-account balance 2.52→0.

The triggering failed Build 84 call becomes `met` through `paidCrossDefault85`. The carry closes with about +0.0177963846 realized FX P/L, the real Build 56 rate moves in the carry-unwind direction, and the remaining 2.3577963846 estate value returns to borrower cash as equity residual. The Build 85 case becomes `resolved-paid`.

The deficiency harness uses only 0.10 posted margin and a deeply depleted carry holding 0.20 RA at `RA/RB=0.80`. Carry liquidation raises 0.16 and total estate value is only 0.26 against 2.52 public principal.

Build 85 pays 0.13 to each facility:
- LF2 1.26→1.13;
- LF3 1.26→1.13;
- monetary base 17.52→17.26;
- outstanding credit 2.52→2.26;
- total surviving public principal deficiency = 2.26.

The carry is closed and the case becomes `liquidated-deficiency`. Both residual Build 55 facilities remain active but are accelerated to immediate maturity.

Exact old Build 55 `accrue()` was then run against those accelerated residual facilities with borrower cash only 0.10. Because 0.10 is below 75% of either 1.13 principal balance, old Build 55 evergreens both loans rather than forcing immediate repayment. Each maturity is extended one minute, authority independence falls 0.82→0.80, and credibility falls 0.76→0.744. The old temporary-liquidity rule therefore survives the new cross-default acceleration and partially defeats it.

The freeze path is also exact-tested. After `XDF1` triggers:
- the Build 80 replacement call becomes `frozen-cross-default85`;
- exact Build 82 `callEligible()` returns false;
- exact Build 82 refinancing returns null;
- exact Build 83 reconciliation leaves the funding anchor unchanged.

So Build 85 prevents the system from refinancing its way out of the default before the default estate is resolved.

Durable `XDF#` snapshots are upserted—not appended—on the Build 79 position and every facility in the cross-default chain. The trigger snapshot is replaced by the final resolved snapshot under the same ID. This prevents isolated v85 recovery from reconstructing an obsolete `triggered` version after the case has already been liquidated.

The exact recovery harness removes isolated v85 state after a full resolution. Reconstruction restores one final `XDF1` record, trigger/resolution counters, principal retired, deficiency, margin-seized history, carry proceeds, equity residual, and call-cure totals. It does not replay FX liquidation, sequester margin again, repay principal again, alter borrower cash, or create another call.

Build 85 persists through `nothing-state-v85`, wraps the existing save/render chain, loads after `cross_facility_netting.js`, and extends forget-through-v85. The real Build 55 facilities remain authoritative for any surviving deficiency after the carry estate is gone.

New places include `one failed central-bank collateral call accelerating every public loan funding the same carry`, `the carry margin and FX position becoming a bankruptcy estate for their own funding chain`, and `cross-default liquidation exhausted the carry estate with public debt still outstanding`. `funding_cross_default.js` passes V8 syntax validation. Exact committed-function tests cover failed and forborne old-Build-55 triggers, unrelated-call exclusion, cross-layer refinancing/novation freeze, full liquidation, deficiency liquidation, old Build 55 evergreen of accelerated residual debt, call cure, real FX unwind, and idempotent v85 recovery.
