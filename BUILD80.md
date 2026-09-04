# Build 80

Sterilization carry acquired macroprudential margin. Build 79 allows temporary Build 78 central-bank liquidity to fund a live FX carry trade. That creates a new policy problem: the lender of last resort is no longer exposed only to the sterilization loan collateral; its own temporary money is also supporting a currency position that can consume repayment cash or become permanent-money leverage. Build 80 creates the Interreality Macroprudential Carry Margin Authority.

Build 80 does not replace the old Build 55 collateral regime. It adds a carry-specific margin layer on top of an already-existing Build 79 position. If the new margin layer fails, the failure can escalate into a real old Build 55 `CBMC#` monetary collateral call on the sterilization facility itself.

The base requirement is 20% of the carry position's remaining domestic deployed amount. A Build 79 `rollover-risk` position adds 15 percentage points. An `open-permanent-money` position adds 20 points. Current FX losses add `min(20%, -return × 80%)`. Total carry-margin rate is capped at 55%.

A normal open 3.6-unit carry therefore requires 0.72 domestic margin. A rollover-risk carry with the same remaining domestic notional requires 35%; a permanent-money carry requires 40% before any loss add-on. An ordinary open position with a sufficiently deep loss can reach 40% from the loss add-on alone, while stressed statuses plus losses can reach the 55% cap.

Margin is segregated rather than treated as ordinary borrower cash. Meeting a call from cash reduces the actual Build 55 borrower's cash field and increases `macroMarginPosted80` on the live Build 79 position. Posted margin therefore cannot simultaneously satisfy the old Build 55 repayment threshold.

If cash is insufficient, Build 80 forces a partial unwind of the Build 79 foreign asset. The unwind sells enough foreign currency, subject to the remaining position, to raise the unpaid domestic margin amount. The position's foreign units and domestic cost basis both shrink proportionally, realized P/L on the forced slice is recorded, and all domestic proceeds go directly into segregated margin rather than back to borrower cash.

Forced unwinds update the real Build 56 market in the opposite direction from the carry opening. A Reality B carry originally bought RA with RB and pushed `RA/RB` higher; Build 80 selling RA for RB to meet margin pushes the live rate lower. Reality A mirrors in the other direction.

If borrower cash plus the entire remaining carry asset still cannot meet the margin call, Build 80 marks the call `failed` and creates a real Build 55-shaped `CBMC#` collateral call. The old object uses the actual sterilization facility, authority, borrower type/id, amount, open status, and monetary-collateral-call counters. It is tagged `macroprudential80`, but subsequent payment, failure, forbearance, repayment, and monetary-crisis behavior remains governed by the old Build 55 code.

The deterministic cash-only harness starts from the canonical Build 79 position: 3.6 RB deployed, 3.4999004543 RA held, and `RA/RB=1.0336561099`. Build 80 requires 20%, or 0.72 RB. A dealer with 10.4 cash pays the full 0.72. Dealer cash becomes 9.68, the call becomes `met`, 0.72 is segregated, no carry units are sold, and the FX rate does not move.

The forced-unwind harness gives the same position only 0.10 of borrower cash. Build 80 takes that 0.10 and forces the sale of 0.5998126399 RA to raise the remaining 0.62 RB. The carry's remaining domestic basis falls 3.6→2.9830323085 and remaining RA falls 3.4999004543→2.9000878144. The forced slice realizes about +0.0030323085, total posted margin reaches 0.72, and `RA/RB` moves 1.0336561099→1.0328617105.

The deep-loss failure harness starts with the same 3.6 domestic basis but only 0.25 RA remaining and a market rate of 0.20. The position is deeply impaired. The loss add-on raises margin to 40%, creating a 1.44 call. Borrower cash is zero and liquidating the entire 0.25 RA raises only 0.05 RB. The Build 80 call therefore fails with 1.39 still unpaid and creates `CBMC1` for 1.4 against the actual Build 55 sterilization facility.

The exact old Build 55 compatibility harness then services that `CBMC1` with the exact committed `meetMonetaryCall()` code. Starting borrower cash is 2.0, facility principal 4.0, monetary base 19, and the old call is open. Build 55 takes 1.4 cash, reduces borrower cash to 0.6, facility principal 4.0→2.6, monetary base 19→17.6, marks `CBMC1` `met`, records 1.4 paid, and increments the old monetary-collateral-call-met counter. Build 80 escalation is therefore a real monetary call, not just a similarly named record.

Build 80 margin can itself create the rollover risk it is supposed to control. In the near-maturity integration harness, the borrower starts with 3.20 cash against a 4.0 Build 55 facility and an otherwise ordinary open carry. Paying the normal 0.72 Build 80 margin leaves 2.48 cash. Exact committed Build 79 reconciliation then sees cash below the old 75% repayment threshold of 3.0 inside the final 15 seconds and changes the carry to `rollover-risk`. Macroprudential protection can therefore make the temporary central-bank credit harder to exit.

When the carry closes, becomes `open-unlevered`, or the linked Build 55 facility is repaid, Build 80 releases any remaining segregated margin back to the actual borrower. The cash-only release harness returns the 0.72 margin, taking borrower cash 9.68→10.4, while preserving the historical margin call.

Build 80 persistence is deliberately anchored in older state. Every margin-call snapshot is written onto both the Build 79 position and the linked Build 55 facility. Current segregated margin is mirrored onto the facility as well. Forced unwinds also update the facility's Build 79 carry markers to the reduced current domestic basis and foreign units.

The strongest recovery harness deletes both v79 and v80 state while preserving older Build 55/56 state after a forced unwind. Exact Build 79 reconstruction first rebuilds the reduced carry from the Build 55 facility marker: 2.9830323085 domestic basis and 2.9000878144 RA, not the original 3.6/3.4999 position. Build 80 then rebuilds the `MCM1` `met-forced-unwind` call and 0.72 segregated margin from the same facility snapshots. Borrower cash remains zero and `RA/RB` remains exactly 1.0328617105; neither the cash payment nor FX unwind is replayed.

Build 80 persists through `nothing-state-v80`, wraps the existing save/render chain, loads after `sterilization_carry.js`, and extends forget-through-v80. It selectively updates Build 55 facilities/collateral calls, real borrower cash, Build 56 FX market state, and Build 79 carry positions while preserving the historical Build 77 reserve trade and Build 78 sterilization issuance.

New places include `central bank margining the currency bet financed by its own temporary money`, `macroprudential safety consuming the cash needed to repay lender-of-last-resort credit`, and `macroprudential margin forcing the central-bank-funded carry trade backward through FX`. `carry_margin.js` passes V8 syntax validation. Exact committed-function tests cover cash-only margin, forced unwind, deep-loss failure and Build 55 escalation, margin release, dual v79/v80 reconstruction, margin-induced Build 79 rollover risk, and exact old Build 55 collateral-call servicing.
