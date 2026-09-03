# Nothing — Project State

**Document revision:** 71.0  
**Current build:** 71  
**Updated:** September 3, 2026

This is the consolidated current-state document for the repository. The individual `BUILDxx.md` files remain the authoritative narrative for each build; this document records the architecture and cross-build dependencies that future changes should preserve unless a later build intentionally breaks them.

## Product rule

Do not decide what this app is supposed to become.

Each build adds whatever seems interesting at the time. Old behavior may become important later, contradict newer behavior, disappear from the visible UI, or accidentally become infrastructure. A new build should follow consequences already present in state before inventing a disconnected subsystem.

## Runtime architecture

- The app is static HTML, CSS, and vanilla JavaScript.
- Browser state is persistent and local to the browser profile/device through `localStorage`.
- Later modules load after earlier modules and may wrap the existing global `save` and `renderAll` functions.
- The newest build module must load last unless a later compatibility fix intentionally follows it.
- Each persistent build owns a versioned state key such as `nothing-state-v71`.
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
- Build 63 funds remain the investment-fund cash holders used by Builds 64–71.

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

## Builds 61–71: current financial stack

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

## Money and finality invariants

These distinctions are intentional and should not be collapsed accidentally:

- A Build 61/62/63 ownership or debt record can change economically without erasing the judgment, conference, or trade that created it.
- A Build 65 title dispute can remain open after Build 66 insurance pays.
- A Build 67 note can default while its assigned subrogation recovery remains alive.
- A Build 68 protection payout remains historically final even if the recovery note later pays.
- A Build 69 settlement can remain `final-with-shortfall` after Build 70 makes the arrears economically whole.
- A Build 70 public make-good remains historical after Build 71 recoups the cash and retires the linked public credit.
- Build 71 must never collect more than the still-outstanding public facility principal.

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

The current head after Build 71 should leave these facts true:

- Build 70 public-double-recovery events automatically produce at most one Build 71 recoupment claim each.
- A collectible claim is capped by public make-good, later recovery, and live Build 55 facility principal.
- Collection takes actual Build 63 fund cash and retires actual Build 55 facility principal, monetary base, and outstanding credit.
- Already-repaid public facilities make the claim moot rather than collectible.
- Waiver is an explicit policy choice and leaves public credit outstanding.
- `public_recoupment.js` is the final loaded module for Build 71.

Future builds should start from these facts rather than reconstructing the financial stack from scratch.
