# Build 84

Funding novation acquired cross-facility collateral netting. Build 82 can create several active Build 55 refinancing facilities for one continuous Build 79 carry, and Build 83 can move the carry's legal funding anchor among those facilities. Build 82 correctly subtracts aggregate active principal when each new facility is issued. Old Build 55, however, later revalues each facility independently against the borrower's entire collateral pool.

That creates a hidden leverage hole: several public facilities can each look individually well collateralized while their combined principal exceeds the collateral pool counted only once.

Build 84 creates the Interreality Cross-Facility Collateral Netting Office and gives every live carry-funding chain one stack-wide borrowing base.

The office finds all active Build 55 facilities economically tied to the same live Build 79 carry. The chain includes the current funding anchor, any still-active original funding facility, facilities carrying current or historical Build 79 carry markers, and active Build 82 margin-refinance facilities whose `positionId79` is the carry. Repaid and monetized facilities are not included in active-credit exposure.

Current collateral is recomputed from the actual borrower using the same borrower classes, Build 52 rating lookup, and haircut schedule used by Build 82. Dealer collateral is current derivative collateral plus 35% of dealer capital with a minimum face of 2. CCP, insurer, and package-treasury collateral follow the same Build 82 formulas.

Build 84 does not overwrite old Build 55 `collateralValue`. The old per-facility view remains historically and procedurally true. Build 84 adds a second, stack-wide diagnostic: aggregate active principal versus the one current haircut-adjusted collateral pool.

When aggregate exposure is within lendable collateral, the audit is `safe`. When exposure exceeds lendable collateral, Build 84 records `shortfall-open` and allocates the one collateral pool across active facilities pro rata by current principal.

Pro-rata allocation is diagnostic rather than a new legal seniority rule. Its purpose is to show how much of each facility's principal is supported when the collateral pool is counted once.

The actual monetary remedy remains the old Build 55 collateral-call system. Build 84 creates real `CBMC#` calls tied to the actual facilities, authorities, borrower type/id, and reality. Each call is tagged `crossFacilityNetting84` and records its `CFN#` audit, carry position, aggregate exposure, aggregate lendable collateral, allocated collateral, and allocated shortfall.

Unresolved Build 55 collateral-call coverage is fungible across the chain because payment of any such call reduces aggregate public principal. Build 84 therefore caps new calls by:

`aggregate shortfall - aggregate unresolved Build 55 call coverage`.

Open, failed, and forborne Build 55 calls count as unresolved coverage. A failed call contributes only its still-unpaid amount. Calls already marked met do not count because their payment has already reduced facility principal.

Build 84 still uses the pro-rata facility allocation to decide where any genuinely uncovered residual call should be placed. Existing coverage on a facility is credited against that facility's diagnostic shortfall first; any chain-wide residual is then assigned only until aggregate unresolved coverage equals the aggregate deficiency.

This chain-wide coverage rule is important after partial repayment. Without it, paying one facility's initial pro-rata call would reduce aggregate exposure, recompute the pro-rata shares, and could incorrectly cause a second call on that same facility even though another still-open call already covered the full remaining aggregate shortfall.

The canonical safe harness uses two active 1.26 Build 82 facilities for one carry. Dealer collateral is 10 and dealer capital 2.48, giving face collateral 10.868 and BBB lendable collateral 8.91176. Aggregate exposure is only 2.52, so `CFN1` is `safe`, both facilities receive 1.26 of diagnostic collateral allocation, and no Build 55 call is issued.

The hidden-overextension harness keeps the same two 1.26 facilities but reduces dealer collateral to zero. The Build 82/84 formula bottoms dealer collateral face at 2.0. At BBB with an 18% haircut, lendable collateral is therefore 1.64.

Each 1.26 facility remains individually smaller than the full 1.64 pool. Old per-facility logic can therefore regard each loan as independently covered. Build 84 instead sees the combined 2.52 exposure against 1.64 counted once: aggregate shortfall 0.88.

The 1.64 borrowing base is allocated 0.82 to LF2 and 0.82 to LF3. Each facility therefore has a diagnostic 0.44 shortfall. With no prior calls, Build 84 creates:
- `CBMC1` on LF2 for 0.44;
- `CBMC2` on LF3 for 0.44.

The two new calls sum exactly to the 0.88 aggregate deficiency.

Existing legacy calls are credited rather than duplicated. In the coverage harness, LF2 already has an unrelated/open Build 55 call for 0.20. Aggregate shortfall is still 0.88, so only 0.68 remains uncovered. Build 84 creates 0.24 on LF2 and 0.44 on LF3. Existing 0.20 plus new 0.68 equals exactly 0.88.

The exact old Build 55 collection harness then services the new calls through committed `meetMonetaryCall()`.

Initial state:
- LF2 principal: 1.26;
- LF3 principal: 1.26;
- aggregate exposure: 2.52;
- lendable collateral: 1.64;
- aggregate shortfall: 0.88;
- borrower cash: 2.48;
- monetary base: 17.52;
- outstanding credit: 2.52.

Exact Build 55 pays `CBMC1` for 0.44:
- borrower cash 2.48→2.04;
- LF2 principal 1.26→0.82;
- aggregate exposure 2.52→2.08;
- monetary base 17.52→17.08;
- outstanding credit 2.52→2.08.

The new aggregate shortfall is now 0.44. `CBMC2` is still open for exactly 0.44. Build 84 re-audits and issues zero new calls because aggregate unresolved coverage already equals the full remaining aggregate shortfall.

Exact Build 55 then pays `CBMC2`:
- borrower cash 2.04→1.60;
- LF3 principal 1.26→0.82;
- total active exposure 2.08→1.64;
- monetary base 17.08→16.64;
- outstanding credit 2.08→1.64.

The next Build 84 audit becomes `safe`: active public principal 1.64 exactly equals current lendable collateral 1.64. No extra call is created.

This proves that Build 84 does not merely detect fragmentation. It can hand the aggregate deficiency to exact old Build 55 payment machinery and converge the fragmented public-loan stack back to the current borrowing base.

Build 84 intentionally does not count segregated Build 80 margin as ordinary collateral. That margin remains a separate protective buffer and can enter public repayment only through the explicit Build 81 setoff mechanism. Counting it automatically in the borrowing base would collapse two distinct protections into one asset.

Every `CFN#` snapshot is stored on each active facility in the audited chain. The Build 79 carry also stores the latest audit signature. The signature contains the position, current collateral grade/lendable value, and exact active facility/principal set, so principal repayment, new refinancing, facility closure, rating changes, or collateral-value changes trigger a fresh audit while an unchanged state does not spam duplicate records.

If isolated v84 state is lost, Build 84 reconstructs audit history, serials, safe/shortfall counters, shortfall totals, and Build 55 call totals from those facility markers. It restores the carry's audit signature before automatic reconciliation, so reconstruction does not create duplicate `CBMC#` calls or change any facility principal.

The recovery harness removed v84 after a 0.88 shortfall audit had already created two calls. Reconstruction restored one `CFN1` record, one audit, one shortfall, two Build 55 calls totaling 0.88, and the exact carry signature. The real Build 55 call array remained at two calls, call serial remained 2, and both facility principals remained 1.26.

Build 84 persists through `nothing-state-v84`, wraps the existing save/render chain, loads after `funding_novation.js`, and extends forget-through-v84. Build 83 remains responsible for moving the legal carry anchor. Build 84 only nets active public-credit exposure against the shared collateral pool and delegates actual repayment to old Build 55.

New places include `each central-bank loan looked safe until the collateral was counted only once` and `refinancing fragments discovering they all owned the same borrowing base`. `cross_facility_netting.js` passes V8 syntax validation. Exact committed-function tests cover safe stacks, hidden aggregate overextension, legacy-call coverage, sequential exact Build 55 collection without over-calling, convergence back to a safe borrowing base, and idempotent v84 recovery.
