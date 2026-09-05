# Build 82

Setoff acquired margin refinancing. Build 81 can seize segregated Build 80 margin and use it to retire the Build 55 sterilization loan that originally funded the Build 79 FX carry. That reduces public credit, reduces monetary base, and simultaneously leaves the still-open carry under-margined. Exact Build 80 then creates a replacement margin call. Build 82 turns that replacement call into a new source of public credit through the Interreality Margin Refinancing Window.

The core rule is intentionally circular. Build 81 setoff pays down the original Build 55 sterilization facility. That repayment frees unused haircut-adjusted collateral capacity at the same borrower. Build 82 can lend against that newly reopened capacity and post the proceeds directly into the new Build 80 margin call.

The refinancing reserves never become ordinary borrower cash. A successful Build 82 operation creates a real active Build 55 `LF#` facility, increases the borrower's real Build 55 reserve-account balance, increases the issuing authority's monetary base and outstanding credit, increments the old Build 55 reserves-issued total, and increases the live Build 80 segregated margin balance. The borrower's cash field is unchanged.

Build 82 only refinances a fresh Build 80 margin call that follows a Build 81 setoff on the same Build 79 carry. The call must still be `open`, must not already contain ordinary Build 80 cash or forced-unwind payments, and the linked original sterilization facility must remain active.

Collateral remains real and aggregate-constrained. Build 82 recomputes the current Build 55-style collateral for the same borrower, applies the current Build 52 rating and Build 55 haircut/floor, subtracts all active Build 55 principal already using that borrower, and lends only against the remaining capacity. A Build 81 setoff can therefore make refinancing possible by reducing active principal, but Build 82 cannot lend more merely because a margin deficit exists.

The new facility uses the same Build 55 borrower identity, authority, reserve account, collateral type, grade, face, haircut, and lendable value. Its rate is the authority's current discount rate plus 1.5 percentage points, and its maturity is 60 seconds. The higher spread and shorter maturity make it recognizably different from the original Build 78 sterilization facility while leaving old Build 55 lifecycle code authoritative afterward.

If the monetary authority is already `negative-equity`, ordinary margin refinancing is blocked. An explicit emergency override can proceed only if the underlying borrower and collateral still satisfy the normal collateral rule. The override reduces monetary-authority independence by 0.03 and credibility by 0.025 and records a crisis.

If current freed collateral is less than the replacement margin call, Build 82 issues only the supported amount. The Build 80 call's live amount is reduced to the true remaining obligation, the already posted refinance amount is recorded separately, and the call stays open. Exact Build 80 can then collect the remainder from borrower cash and/or force a carry unwind without collecting the refinanced portion again.

A fully refinanced Build 80 call becomes ordinary `met` with `metByRefinance82=true`. Build 82 updates the real Build 80 met counter and mirrors the amended call snapshot onto the Build 79 position and original Build 55 sterilization facility. The current margin balance on the position and original facility is also updated.

The canonical Build 81→80→82 harness begins after Build 81 has seized 1.26 from the carry buffer. Original sterilization principal is 2.74, monetary base is 17.74, outstanding credit is 2.74, reserve-account balance is 2.74, posted margin is zero, and borrower cash is 2.48. Exact Build 80 creates a new 1.26 margin call at the rollover-risk 35% rate.

Build 82 then issues a new 1.26 Build 55 facility against the newly reopened dealer collateral capacity. Original sterilization principal stays 2.74. The new facility holds 1.26 principal. Monetary base rises 17.74→19.00, outstanding credit 2.74→4.00, reserve-account balance 2.74→4.00, and posted margin 0→1.26. Borrower cash remains exactly 2.48.

The full exact three-build loop was executed twice. Starting from original principal 4.00, total public credit 4.00, base 19.00, and 1.26 posted margin:

1. Build 81 seizes 1.26. Original principal becomes 2.74; credit/base become 2.74/17.74; posted margin becomes zero.
2. Build 80 issues a new 1.26 margin call.
3. Build 82 issues a new 1.26 margin-refinance facility. Total active public credit/base return to 4.00/19.00; posted margin returns to 1.26.
4. Build 81 seizes that new 1.26 margin. Original principal becomes 1.48 while the first 1.26 refinancing facility remains outstanding. Total credit/base again fall to 2.74/17.74.
5. Build 80 issues another 1.26 replacement call.
6. Build 82 issues a second 1.26 refinancing facility. Total public credit/base return to 4.00/19.00 again.

Borrower cash remains 2.48 throughout both complete cycles. The original public loan is progressively extinguished while equivalent public credit is recreated in a growing stack of margin-refinance facilities.

The partial-collateral harness gives the borrower only enough unused lendable collateral for 0.5605 against a 1.26 replacement call. Build 82 issues exactly 0.5605 and posts it directly to margin, leaving the Build 80 call open for 0.6995. Exact Build 80 then takes 0.50 of actual borrower cash and forces a 0.1995 FX unwind. The final Build 80 call becomes `met-forced-unwind`, total posted margin reaches 1.26, borrower cash falls to zero, and no part of the 0.5605 public refinancing is collected twice.

Negative-equity behavior is also explicit. An ordinary request against a negative-equity authority creates a `blocked-negative-equity` Build 82 record and issues zero. Emergency override against otherwise eligible collateral issues the full 1.26, restores monetary base and outstanding credit, reduces independence 0.82→0.79 and credibility 0.76→0.735, and records the override.

The new refinancing facility remains a real Build 55 loan after Build 82 stops touching it. In the exact legacy Build 55 lifecycle harness, the 1.26 refinancing facility reaches maturity while borrower cash is 2.48. Exact committed Build 55 `accrue()` repays it normally, including accrued interest. Borrower cash falls to about 1.2171, monetary base 19.00→17.74, outstanding credit 4.00→2.74, reserve-account balance 4.00→2.74, cumulative reserves extinguished rise 6.26→7.52, and the Build 82 facility becomes `repaid`.

Build 82 stores a durable `MRF#` snapshot directly on each Build 55 refinancing facility. If isolated v82 state is missing while older Build 55/79/80/81 state survives, Build 82 reconstructs its refinancing ledger, serial, issued amount, facility count, partial/override history, and loop count without creating reserves, increasing margin, or changing borrower cash a second time.

Build 82 also repairs the historical Build 80 cumulative posted-margin counter after cross-version recovery by taking the maximum of the persisted counter and the sum of Build 80 cash payments, forced-unwind payments, and Build 82 direct margin refinancings. This repair changes only the historical aggregate counter; it does not recreate current segregated margin.

Build 82 persists through `nothing-state-v82`, wraps the existing save/render chain, loads after `margin_setoff.js`, and extends forget-through-v82. It updates the actual Build 55 facility/reserve-account/monetary-authority objects and the actual Build 80 margin call/Build 79 position. It does not create borrower cash, shadow public credit, or erase the Build 81 setoff that created the refinancing opportunity.

New places include `central bank recreating reserves solely to refill margin it just seized`, `extinguished public credit reopening collateral capacity for another public loan`, `central bank replacing seized margin with another loan against newly freed collateral`, and `public credit extinguished and recreated without ever reaching borrower cash`. `margin_refinance.js` passes V8 syntax validation. Exact committed-function tests cover full refinancing, two complete Build 81→80→82 recycling loops, partial-collateral fallback into exact Build 80, negative-equity block/override, idempotent recovery, and exact old Build 55 repayment of the new refinancing facility.
