# Nothing — Project State

**Document revision:** 86.0  
**Current build:** 86  
**Updated:** September 4, 2026

This is the consolidated current-state document for the repository. The individual `BUILDxx.md` files remain the authoritative narrative for each build; this document records the architecture and cross-build dependencies that future changes should preserve unless a later build intentionally breaks them.

## Product rule

Do not decide what this app is supposed to become.

Each build adds whatever seems interesting at the time. Old behavior may become important later, contradict newer behavior, disappear from the visible UI, or accidentally become infrastructure. A new build should follow consequences already present in state before inventing a disconnected subsystem.

## Runtime architecture

- The app is static HTML, CSS, and vanilla JavaScript.
- Browser state is persistent and local to the browser profile/device through `localStorage`.
- Later modules load after earlier modules and may wrap the existing global `save` and `renderAll` functions.
- The newest build module must load last unless a later compatibility fix intentionally follows it.
- Each persistent build owns a versioned state key such as `nothing-state-v86`.
- Forward migration is additive: later builds may read and update older objects, but should not silently discard historical state just because a newer representation exists.
- `make it forget` clears the accumulated versioned local state through the current build.
- Historical records are usually preserved even when their economic effect changes later. A recurring design pattern is that procedural history and current economic state can both remain true.

## Shared globals and integration surfaces

Common helpers and globals include `S`, `save`, `renderAll`, `remember`, `place`, `$`, `panel`, and `closePanel`.

Later financial layers also intentionally reuse older state rather than shadowing it:
- trust and institutional actions use `S.trustAudits`;
- operational failures use `S.incidents`;
- Build 51 insurers remain the actual carriers used by later title insurance;
- Build 52 bonds remain the credit objects used by later recovery notes;
- Build 53 dealers remain actual derivatives counterparties;
- Build 54 clearinghouses and members remain the actual CCP resources;
- Build 55 monetary authorities, facilities, reserve accounts, monetary base, and credit remain the public-money balance sheet;
- Build 63 funds remain the investment-fund cash holders used by Builds 64–86.

## Current causal chain

The late system is not a set of independent features. It is one long chain:

1. Builds 45–50 turn software provenance into dependencies, governance, economics, procurement, oversight, and standards.
2. Build 51 turns standards violations into insurable liability.
3. Build 52 turns liability into credit instruments and ratings.
4. Build 53 turns credit into derivatives and reusable collateral.
5. Build 54 central-clears those derivatives.
6. Build 55 creates settlement money and a lender of last resort for the clearing infrastructure.
7. Builds 56–61 extend that money into FX, trade, stabilization, treaty law, and remedies.
8. Build 62 restructures sovereign debt by collective creditor vote.
9. Build 63 gives distressed creditor claims a market price.
10. Build 64 turns market value into repo leverage.
11. Build 65 allows collateral title to fragment through rehypothecation.
12. Build 66 insures title loss without necessarily cleaning title and gives the insurer subrogation.
13. Build 67 securitizes expected subrogation recovery.
14. Build 68 adds default protection on that recovery-backed security, including naked protection.
15. Build 69 moves that protection into the old Build 54 CCP through sponsored clearing.
16. Build 70 lets the old Build 55 monetary authority make a Build 69 shortfall economically whole with public settlement reserves.
17. Build 71 creates a public recoupment claim when the rescued investor later receives the private recovery anyway.
18. Build 72 turns unpaid public recoupment into junior statutory liens on the fund’s distressed assets while preserving older repo and title priority.
19. Build 73 turns the Build 72 insolvency flag into fund receivership, stays the public collector, preserves repo/title safe harbor, liquidates clean estate assets, and can leave a public deficiency behind.
20. Build 74 sends that surviving public deficiency to the old Build 59 stabilization board, where pooled Build 58 reserves can recapitalize the monetary loss after a recused-member vote or systemic override.
21. Build 75 converts each realized Build 74 reserve loss into one-for-one Build 58 quota for the member whose reserves were consumed, so bailout losses can become Build 59 voting control.
22. Build 76 lets a current loss-born 60% creditor majority impose a compulsory reserve replenishment assessment on the bailout target; payment restores fund capital but also grants quota and can reverse the majority.
23. Build 77 lets the stabilization fund rebalance a wrong-currency Build 76 replenishment through the real Build 56 FX market, retiring issuer monetary base and draining the issuer's foreign reserves.
24. Build 78 lets the issuing Build 55 monetary authority sterilize most of that contraction with temporary, fully collateralized credit while preserving the Build 77 reserve transfer.
25. Build 79 lets the borrower deploy up to 90% of that temporary sterilization liquidity into the same Build 56 FX direction, creating carry P/L and possible Build 55 rollover risk.
26. Build 80 imposes carry-specific macroprudential margin: borrower cash is segregated, insufficient cash forces partial FX unwind, and a failed call escalates into a real Build 55 monetary collateral call.
27. Build 81 gives the public lender a setoff right over stressed segregated carry margin, allowing that buffer to retire Build 55 credit while making the still-open carry under-margined again.
28. Build 82 lets the monetary authority refinance that replacement margin against collateral capacity reopened by the Build 81 setoff, recreating public credit directly inside segregated margin.
29. Build 83 lets the live Build 79 carry novate its funding anchor from a repaid facility into the oldest surviving Build 82 refinancing descendant, preserving margin/leverage continuity after the original loan dies.
30. Build 84 nets every active public facility tied to that carry against the borrower collateral pool counted once, exposing aggregate overextension that old per-facility Build 55 revaluation can miss.
31. Build 85 turns a failed or forborne Build 84 collateral call into a funding-chain cross-default that freezes refinancing, sequesters carry margin, liquidates the FX carry, and applies the estate against the real Build 55 facilities.
32. Build 86 gives any surviving Build 85 public deficiency a floating cash sweep over later borrower liquidity above a fixed operating floor, paying the actual Build 55 facilities until they are cured.

## Builds 61–86: current financial stack

| Build | Layer | Key consequence |
| ---: | --- | --- |
| 61 | Remedies | Treaty and surviving-debt judgments can create restitution and future-inflow enforcement. |
| 62 | Restructuring | Sovereign debt can be exchanged by collective vote; holdouts and challenges survive. |
| 63 | Claims market | Claims and exchange bonds acquire secondary owners and market prices. |
| 64 | Repo finance | Distressed paper becomes collateral and creates margin/default leverage. |
| 65 | Collateral title | Rehypothecation creates competing beneficial, repo, and senior downstream claims. |
| 66 | Title insurance | Cash can compensate title loss without removing the lien; insurer inherits subrogation. |
| 67 | Recovery notes | Expected subrogation cash flow becomes a Build 52 security. |
| 68 | Recovery derivatives | Funds can hedge or speculate on recovery-note default; later recovery may still survive. |
| 69 | Recovery clearing | Fund-native protection enters Build 54 central clearing and can consume mutualized resources. |
| 70 | Recovery monetary backstop | Build 69 shortfalls can be paid with real Build 55 public settlement reserves. |
| 71 | Public recoupment | Later private recovery can be clawed back to retire the public rescue facility and money created by Build 70. |
| 72 | Public liens | Unpaid clawbacks can attach to fund assets, force-sell clean paper, and collect only after older repo/title interests. |
| 73 | Fund resolution | Publicly insolvent funds enter receivership; public collection is stayed while repo/title safe harbor survives and clean assets are liquidated through an estate. |
| 74 | Multilateral recapitalization | A surviving fund-resolution deficiency can be absorbed by Build 58 pooled reserves after a Build 59 vote in which the bailout target is recused. |
| 75 | Loss quota | Each Build 74 reserve loss becomes quota for the member that bore it, allowing repeated bailout losses to shift Build 59 voting power. |
| 76 | Replenishment assessments | A current loss-born majority can compel the bailout target to transfer real foreign reserves into the stabilization fund, receiving quota in return and potentially reversing control. |
| 77 | Reserve FX rebalancing | The stabilization fund can exchange an overweight reserve currency through the existing FX market, returning it to its issuer for the currency the fund actually lacks. |
| 78 | Monetary sterilization | The issuer can recreate most Build 77 monetary-base contraction through ordinary Build 55-compatible collateralized facilities without restoring the foreign reserves lost in the FX trade. |
| 79 | Sterilization carry | Borrowers can deploy temporary Build 78 settlement liquidity into the same FX direction, amplifying the market move and potentially consuming cash needed to repay the Build 55 facility. |
| 80 | Carry margin | The monetary authority can segregate margin against a Build 79 carry, force FX unwind when cash is insufficient, and escalate a failed call into the real Build 55 collateral-call regime. |
| 81 | Margin setoff | Stressed segregated carry margin can be seized to retire the linked Build 55 sterilization facility and reduce any associated Build 55 collateral call. |
| 82 | Margin refinancing | A fresh Build 80 margin deficit created by Build 81 setoff can be funded with a new real Build 55 facility against newly reopened collateral capacity, with proceeds posted directly to segregated margin. |
| 83 | Funding novation | A live carry whose linked public facility is repaid can move its legal funding anchor and Build 79 recovery marker into the oldest surviving Build 82 refinancing facility. |
| 84 | Cross-facility collateral netting | Active facilities funding one carry share one current borrowing base; aggregate shortfall creates real Build 55 collateral calls even when each facility looks individually covered. |
| 85 | Funding-chain cross-default | A failed or forborne Build 84 netting call freezes the carry/refinancing loop and liquidates segregated margin plus the FX carry against the real public funding chain. |
| 86 | Post-default cash sweep | Later borrower cash above a fixed operating floor is swept into the real Build 55 facilities left by a Build 85 liquidated deficiency, without reopening the dead carry. |

## Money and finality invariants

These distinctions are intentional and should not be collapsed accidentally:

- A Build 61/62/63 ownership or debt record can change economically without erasing the judgment, conference, or trade that created it.
- A Build 65 title dispute can remain open after Build 66 insurance pays.
- A Build 67 note can default while its assigned subrogation recovery remains alive.
- A Build 68 protection payout remains historically final even if the recovery note later pays.
- A Build 69 settlement can remain `final-with-shortfall` after Build 70 makes the arrears economically whole.
- A Build 70 public make-good remains historical after Build 71 recoups the cash and retires the linked public credit.
- Build 71 must never collect more than the still-outstanding public facility principal.
- Build 72 public liens are junior to Build 64 repo and Build 65 rehypothecation/title interests; a public levy cannot bypass a live senior private claim.
- Build 72 can retire public credit from levy or residual proceeds without erasing the Build 70 rescue, Build 71 claim, or older private-collateral history.
- Build 73 stays Build 71/72 public collection during receivership but does not stay existing Build 64 repo or Build 65 rehypothecation/title rights.
- Build 73 may close a fund with a public deficiency; the unpaid Build 55 facility principal and monetary base remain real public balance-sheet items after the fund is liquidated.
- Build 74 may economically cure that deficiency without changing the historical Build 73 `liquidated-deficiency` status; stabilization-pool transfers reduce the real Build 55 facility principal and monetary base.
- Build 74 recapitalization motions are real Build 59 motion records but use Build 74-specific statuses so legacy Build 59 vote logic cannot accidentally vote an unknown motion type.
- Build 75 loss-quota credits increase only the existing Build 58 `quota`; they do not refill the depleted reserve pool or pretend new reserve contributions occurred.
- Build 75 updates actual Build 58/59 vote weights using the existing Build 59 score formula, so those votes directly affect later Build 74 recap motions.
- Build 76 assessments use real Build 56 foreign reserves and update real Build 58 pool, contribution, quota, and Build 59 director-vote state; they do not mint replacement reserves.
- Build 76 replenishes the currency the assessed member actually holds, so a bailout that depleted `poolRA` can be followed by an assessment that increases `poolRB`, creating a real stabilization-fund currency mismatch.
- A Build 76 payment can destroy the creditor majority that authorized it; later Build 74 recap votes must use the new director weights rather than the historical Build 75 majority event.
- Build 77 reserve rebalancing is balance-sheet constrained: the fund cannot acquire more of the missing currency than the issuing reality actually holds as foreign reserves or retire more settlement reserves than the issuing monetary authority has in monetary base.
- Build 77 updates the real Build 56 market and flow history rather than shadowing FX; returning RA/RB to its issuer reduces the corresponding Build 55 monetary base and increments existing reserves-extinguished history.
- Build 77 can rebalance total fund value while moving the exchange rate, stressing pegs, changing the reserve-currency designation, and leaving a smaller residual mismatch after the price move.
- Build 78 ordinarily offsets 80% of Build 77 monetary-base retirement; a Build 77 trade that already stressed a peg is limited to a 40% sterilization target.
- Build 78 sterilization uses real Build 55-compatible facilities against unused haircut-adjusted eligible collateral. It restores domestic monetary base and outstanding credit but does not restore the foreign reserves transferred in Build 77.
- A negative-equity Build 55 authority blocks ordinary Build 78 sterilization; an explicit emergency override can proceed at independence/credibility cost.
- Build 78 facilities remain under the old Build 55 accrual, revaluation, collateral-call, repayment, evergreen, and monetization lifecycle.
- Build 79 carry deployment removes actual cash from the Build 55 borrower and holds a marked foreign-currency asset; it does not duplicate the sterilization proceeds.
- Build 79 opening and closing trades update the real Build 56 FX market in opposite directions, while facility repayment remains entirely under old Build 55 rules.
- An open Build 79 carry can cause a real Build 55 evergreen if borrower cash falls below the old 75% maturity threshold, and a later Build 55 monetization can leave the FX carry funded by permanent money.
- Durable carry markers live on the Build 55 facility so isolated v79 recovery cannot spend borrower cash or move FX twice.
- Build 80 margin is segregated and is not ordinary borrower cash, so satisfying the new safety rule can itself reduce the cash available for Build 55 repayment.
- Build 80 forced unwinds reduce the live Build 79 carry and push the real Build 56 FX market opposite the original carry direction.
- A failed Build 80 margin call creates a real Build 55 `CBMC#` record; old Build 55 payment/forbearance/crisis rules remain authoritative.
- Build 80 mirrors margin snapshots and the reduced post-unwind carry onto the Build 55 facility so v79/v80 recovery cannot recreate the pre-unwind trade.
- Build 81 setoff acts directly on already-segregated margin; it never credits borrower cash before reducing the real Build 55 facility, monetary base, outstanding credit, and reserve-account balance.
- Build 81 can reduce or cure a Build 80-originated `CBMC#`; partial setoff leaves the true remaining amount open so exact old Build 55 collection can continue without double counting.
- Consuming Build 80 margin through Build 81 can immediately create a new Build 80 margin deficit on the same live carry.
- Build 81 facility markers make setoff recovery idempotent without retiring public credit twice.
- Build 82 refinancing never increases borrower cash; newly issued reserves go directly into the live Build 80 segregated margin balance while increasing the real Build 55 reserve account, monetary base, and outstanding credit.
- Build 82 subtracts all active Build 55 principal from current haircut-adjusted collateral capacity, so repeated refinancing is limited by the same borrower collateral rather than by the size of the margin call.
- A partially refinanced Build 80 call is reduced to the true remaining amount, allowing old Build 80 cash/forced-unwind mechanics to collect only the unfunded remainder.
- Build 82 facilities remain ordinary active Build 55 loans after issuance and can be repaid, evergreened, revalued, called, or monetized by old Build 55 logic.
- Build 81→80→82 can recycle the same 1.26 units repeatedly: setoff retires original credit, remargin demands 1.26 again, and refinancing recreates equivalent public credit without changing borrower cash.
- Build 83 prevents repayment of the original Build 78 facility from falsely ending leverage when active Build 82 refinancing descendants still fund the same carry.
- Build 83 moves the unique live Build 79 `carryPosition79` recovery marker with the funding anchor, preserving older facilities as historical novated markers and preventing duplicate v79 reconstruction.
- Build 83 reconciles before invoking the older render chain so a Build 81 repayment can novate the carry before Build 80 releases margin.
- If Build 80 already released margin before Build 83 existed, Build 83 recalls as much as is still required and available from borrower cash, preserving the historical release while leaving any unrecalled amount as a real new margin deficit.
- Once novated, exact Build 81/80/82 mechanics can continue against the refinancing descendants instead of the dead original sterilization facility.
- Build 84 counts the borrower collateral pool once across all active facilities economically tied to a live carry; old per-facility `collateralValue` fields remain untouched.
- Build 84 allocates current lendable collateral pro rata for diagnostics, but unresolved Build 55 collateral-call coverage is fungible across the chain because payment of any call reduces aggregate principal.
- New Build 84 `CBMC#` demands are capped by aggregate shortfall minus aggregate unresolved Build 55 call coverage, preventing over-collection after partial repayment.
- Segregated Build 80 margin is not automatically counted as collateral; it remains available to public repayment only through explicit Build 81 setoff.
- Exact old Build 55 collateral-call payment can reduce a fragmented refinancing chain back to the one current borrowing base, after which the next Build 84 audit becomes safe.
- Build 85 triggers only from failed/forborne Build 84-created collateral calls tied to the carry; unrelated Build 55 failures do not cross-default the chain.
- Triggering Build 85 moves current Build 80 posted margin into a default estate, freezes open Build 80 margin calls, and changes the carry to `cross-default85`, which blocks Build 82 refinancing and Build 83 novation.
- Build 85 liquidation sells the remaining FX carry through the real Build 56 market and applies margin plus proceeds directly to the real Build 55 facilities, reducing monetary base/outstanding credit/reserve accounts without routing through borrower cash first.
- Residual Build 55 debt survives a deficient liquidation as real active facilities with immediate maturity; exact old Build 55 can still evergreen those supposedly accelerated loans if borrower cash is below its historical 75% repayment threshold.
- Build 85 durable `XDF#` markers are upserted so recovery sees the final case state rather than an obsolete trigger snapshot.
- Build 86 fixes the protected operating floor at 10% of the original Build 85 deficiency, bounded to 0.10–0.50, so repeated timer ticks cannot ratchet the floor downward and sweep cash without a new inflow.
- Build 86 sweeps only borrower cash above that floor, pays real Build 55 principal pro rata first, then accrued interest, and leaves the historical Build 85 `liquidated-deficiency` status unchanged even after economic cure.
- Active facility principal retirement reduces monetary base, outstanding credit, reserve-account balance, and reserves-extinguished history; monetized-facility redemption reduces monetary base but does not subtract outstanding credit twice.
- Build 86 can cure open/failed/forborne Build 55 collateral calls through `paidCashSweep86`; fully covered calls become `met` while preserving their prior status.
- Missing facility or authority records block the entire cash sweep before borrower cash moves.
- Exact old Build 55 can continue to evergreen partially swept residual facilities, and later genuinely new borrower cash can trigger another Build 86 sweep.

## Persistence discipline

When adding Build N:

1. Read the current final module and the older modules whose state the new consequence will touch.
2. Capture the previous `save` and `renderAll`.
3. Load the new module last in `index.html`.
4. Persist new fields in `nothing-state-vN`.
5. Preserve prior version state and extend forget-through-N behavior.
6. Prefer updating the real older balance sheet/object over creating a duplicate representation.
7. Preserve historical records unless the build explicitly introduces a legal or institutional mechanism that changes them.
8. Add a `BUILDN.md` explaining both the mechanics and the tested failure paths.

## Validation discipline

Validation claims should say exactly what happened.

- **Syntax validation** means the committed JavaScript parsed successfully.
- **Instrumented harness validation** means the actual committed functions were executed against deterministic state fixtures.
- **GitHub verification** means the committed branch/blob/diff/load order was checked.
- **Browser validation** means the app was actually opened and exercised in a browser. Do not claim Chromium/browser validation when only syntax and harness tests were run.
- A merge should normally verify that the branch is based on current `main`, contains only intended files, is mergeable, and has no failing configured status checks.

## Documentation map

- `README.md` — project premise, full early-build narrative, and compact late-build ledger.
- `PROJECT_STATE.md` — this current architecture/cross-build snapshot.
- `BUILDxx.md` — authoritative per-build behavior, invariants, and validation notes.
- `index.html` — visible current-build headline plus canonical CSS/JS load order.

## Current handoff

The current head after Build 86 should leave these facts true:

- Build 86 applies only to historical Build 85 cases that remain `liquidated-deficiency` and still have real linked Build 55 principal or interest outstanding.
- The protected borrower operating floor is fixed on first evaluation at 10% of the original Build 85 deficiency, bounded to 0.10–0.50. It does not shrink as principal is repaid.
- Borrower cash at or below that floor is untouched. Cash above the floor is swept up to the surviving public debt.
- Principal is paid before interest and allocated pro rata across surviving linked facilities.
- Principal retirement directly reduces the real Build 55 facility principal, monetary base, reserve-account balance, and reserves-extinguished history.
- Outstanding credit is reduced for active facilities only; already-monetized facilities can be redeemed without subtracting outstanding credit a second time.
- Accrued interest is paid only after principal and increases monetary-authority capital without extinguishing monetary base.
- Open/failed/forborne Build 55 calls on paid facilities can be cured through `paidCashSweep86`; cured calls become `met` with their previous status preserved.
- A fully cured workout marks the facilities `repaid` and sets `cashSweepCured86=true` on the historical Build 85 case, but the Build 85 case itself remains `liquidated-deficiency`.
- Exact old Build 55 can still evergreen a partially swept residual facility if borrower cash remains below the old 75% maturity threshold; Build 86 waits for genuinely new cash above the frozen floor before sweeping again.
- Missing facility or authority records block the whole sweep before cash moves.
- Durable `CSW#` markers on the Build 85 case and paid facilities make isolated v86 reconstruction idempotent without replaying cash movement or public-balance-sheet retirement.
- `post_default_cash_sweep.js` is the final loaded module for Build 86.

Future builds should start from these facts rather than reconstructing the financial stack from scratch.
