# Nothing — Project State

**Document revision:** 76.0  
**Current build:** 76  
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
- Each persistent build owns a versioned state key such as `nothing-state-v76`.
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
- Build 63 funds remain the investment-fund cash holders used by Builds 64–76.

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

## Builds 61–76: current financial stack

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

The current head after Build 76 should leave these facts true:

- A Build 75 loss-quota credit is assessable only while its `burdenReality` currently holds at least the Build 59 board threshold after a fresh quota-score recalculation.
- Each Build 76 assessment creates a real Build 59 `MOT#` record of type `reserve-replenishment76`; the assessed target is recused and Build 76-specific statuses prevent legacy Build 59 vote logic from executing it incorrectly.
- Assessment amount equals the underlying Build 75 loss-quota amount.
- Payment takes real Build 56 foreign reserves from the assessed reality, adds those reserves to the matching Build 58 pool, increases the assessed member's historical contribution field and quota one-for-one, and recalculates real Build 58/59 vote weights.
- The assessment does not recreate the currency consumed by Build 74 unless the assessed member happens to hold that currency; A bailout losses in RA can therefore be followed by A payments in RB.
- Insufficient reserves create assessment arrears and can exhaust the target's foreign-reserve stock.
- A full or partial assessment can reduce the creditor below 60%; Build 76 records that majority reversal and subsequent Build 74 votes use the lower current weight.
- Durable markers on the Build 75 credit make assessment reconstruction additive without recollecting reserves or granting quota twice.
- `replenishment.js` is the final loaded module for Build 76.

Future builds should start from these facts rather than reconstructing the financial stack from scratch.
