# Build 90

Interest materiality acquired monetary supervisory remediation.

Build 89 gives repeated de minimis interest write-offs a governance consequence. Every complete 0.10 of cumulative authority foregone interest reduces the actual Build 55 authority's independence and credibility and increments its emergency mandate.

But old Build 55 does not use independence, credibility, or emergency mandate to decide whether ordinary lender-of-last-resort lending remains available. Those fields are mostly descriptive or cumulative governance history. An authority can therefore suffer repeated Build 89 penalties and continue lending at the same old 5.5% discount rate against the same BBB collateral floor.

Build 90 converts sufficiently repeated Build 89 materiality into binding operating policy.

The Interreality Monetary Supervisory Remediation Office does not create a parallel lending engine. It directly tightens the real Build 55 `discountRate` and `collateralFloor` fields that old `extendFacility()` already obeys.

That means the old lender-of-last-resort machinery itself becomes stricter.

## Supervisory stages

Build 90 intentionally leaves the first Build 89 authority tranche as a governance warning.

### Build 89 tranche 1 — 0.10 cumulative foregone interest

No Build 90 remediation order is created.

The authority retains its existing discount rate and collateral floor.

### Build 89 tranche 2 — 0.20 cumulative foregone interest

Build 90 supervisory stage 1 begins.

Required minimum policy:
- discount rate: 7.5%;
- collateral floor: A or better.

The authority receives:
- `supervisoryStage90=1`;
- `supervisoryStatus90='remediation'`;
- `supervisoryMinRate90=0.075`;
- `supervisoryFloor90='A'`.

### Build 89 tranche 3 — 0.30 cumulative foregone interest

Build 90 supervisory stage 2 begins.

Required minimum policy:
- discount rate: 9.5%;
- collateral floor: AA or better.

The authority receives `supervisoryStatus90='heightened-remediation'`.

### Build 89 tranche 4 and above — 0.40+ cumulative foregone interest

Build 90 supervisory stage 3 begins.

Required minimum policy:
- discount rate: 12%;
- collateral floor: AAA.

The authority receives `supervisoryStatus90='severe-remediation'`.

Build 90 caps the supervisory policy at stage 3. Later Build 89 tranches can continue reducing independence/credibility and increasing emergency mandate, but there is no collateral grade tighter than AAA in the old Build 55 grade system.

## One-way tightening

Build 90 never relaxes an authority that was already stricter than the supervisory minimum.

For example, an authority entering stage 1 with:
- discount rate 10.5%;
- collateral floor AA;

remains at 10.5% / AA.

The stage-1 order still records that the legal minimum is 7.5% / A, but the actual policy stays stricter.

The same rule applies to every stage.

## Real old-Build-55 lending consequence

The exact old Build 55 lender was tested before and after Build 90.

Baseline:
- authority discount rate 5.5%;
- collateral floor BBB;
- solvent Build 53 dealer;
- dealer rating BBB;
- requested facility 2.0;
- haircut-adjusted collateral is sufficient.

Exact committed Build 55 ordinary lending accepts the loan:
- `LF1`;
- principal 2.0;
- facility rate 6.5%;
- collateral grade BBB;
- borrower cash rises by 2.0;
- monetary base rises by 2.0.

The same exact state was then given two Build 89 authority-materiality tranches.

Build 90 stage 1 changes the real authority to:
- discount rate 7.5%;
- collateral floor A.

Exact committed Build 55 ordinary `extendFacility()` is then called again for the same solvent BBB dealer and the same 2.0 amount.

The ordinary loan is rejected because BBB is no longer eligible under the real A-or-better Build 55 collateral floor.

So Build 90 is not merely a governance label. It changes the behavior of old Build 55 without replacing old Build 55.

## Historical emergency override survives

Old Build 55 still contains an explicit override path.

After stage-1 remediation, the same BBB dealer can still receive a 2.0 facility if the old `override=true` path is used.

Exact old Build 55 produces:
- principal 2.0;
- collateral grade BBB;
- `override=true`;
- facility rate approximately 11%.

That 11% rate is the stage-1 7.5% discount rate plus the old solvent-borrower spread and the old ineligible-collateral surcharge.

The override increments the old Build 55 emergency-loan count.

Build 90 deliberately does not remove that historical escape hatch. The supervisor tightens ordinary rules; old emergency law can still contradict supervision by lending anyway.

## Policy reimposition

Build 90 continuously enforces the current supervisory minimum.

If an older layer later changes the real authority below the minimum, Build 90 does not silently overwrite history. It creates a durable `MSR#` policy-reimposition event.

The exact old Build 55 policy controls were tested after stage-1 remediation.

Starting supervisory policy:
- rate 7.5%;
- collateral floor A.

Exact old Build 55 `moveRate(a,-0.01)` lowers the rate to 6.5%.

Exact old Build 55 `moveFloor(a,1)` loosens A→BBB.

The old collateral-floor action itself still executes its historical governance consequence:
- independence falls by 0.015;
- emergency mandate increases by one.

Build 90 then reconciles and creates a policy-reimposition event:
- attempted rate/floor: 6.5% / BBB;
- restored rate/floor: 7.5% / A.

The failed loosening attempt's old governance damage remains. Build 90 restores policy but does not erase the fact that the old authority tried to loosen it.

## Exact Build 89 → Build 90 predecessor chain

Build 90 was tested against exact committed Build 89 rather than only manually seeded tranche counts.

Build 88 write-off records were supplied to exact Build 89 in increasing totals.

### 0.10 aggregate

Exact Build 89:
- authority materiality tranches = 1;
- independence 0.82→0.81;
- credibility 0.76→0.745;
- emergency mandate 0→1.

Exact Build 90:
- stage 0;
- rate remains 5.5%;
- floor remains BBB;
- no remediation order.

### 0.20 aggregate

Exact Build 89:
- tranches = 2;
- independence 0.80;
- credibility 0.73;
- mandate 2.

Exact Build 90:
- stage 1;
- rate 7.5%;
- floor A;
- one remediation order.

### 0.30 aggregate

Exact Build 89:
- tranches = 3;
- independence 0.79;
- credibility 0.715;
- mandate 3.

Exact Build 90:
- stage 2;
- rate 9.5%;
- floor AA;
- stage-1 and stage-2 remediation orders exist.

### 0.40 aggregate

Exact Build 89:
- tranches = 4;
- independence 0.78;
- credibility 0.70;
- mandate 4.

Exact Build 90:
- stage 3;
- rate 12%;
- floor AAA;
- stage-1, stage-2, and stage-3 remediation orders exist.

Build 90 does not apply another independence or credibility penalty when a stage is installed. The governance damage comes from Build 89; Build 90 turns that damage into operating constraint.

Monetary base, outstanding credit, and authority capital do not move when a remediation order is installed.

## Stage catch-up

If Build 90 first loads after an authority already reached a later Build 89 tranche, it creates every missing historical supervisory stage in order.

An authority already at four or more Build 89 tranches receives:
- stage-1 order;
- stage-2 order;
- stage-3 order;

and finishes at 12% / AAA.

An authority at seven tranches is still stage 3 because the supervisory policy is capped at AAA / 12%.

## Recovery

Each `MSR#` record is durably stored on the real Build 55 authority.

The authority itself also stores:
- `supervisoryStage90`;
- `supervisoryOrder90`;
- `supervisoryMinRate90`;
- `supervisoryFloor90`;
- `supervisoryStatus90`;
- `supervisedSince90`;
- `supervisoryReimpositions90`;
- `monetaryRemediationMarkers90`.

Isolated v90 recovery was tested after:
- stage 1;
- stage 2;
- stage 3;
- one later policy reimposition.

Deleting the isolated Build 90 event ledger/counters and reconstructing from the real authority restores:
- four `MSR#` records;
- three remediation orders;
- one policy reimposition;
- one supervised authority;
- event serial.

The authority remains exactly:
- stage 3;
- rate 12%;
- collateral floor AAA.

No order is applied again and no policy values are tightened twice.

## Finality

Build 90 preserves every older fact:
- Build 88 write-offs remain final;
- Build 89 authority-materiality events remain the source of governance damage;
- Build 55 independence/credibility/mandate history remains intact;
- old emergency override lending remains possible;
- old policy-change attempts remain historically meaningful even when supervision reverses the resulting rate/floor.

The system can therefore say all of these things at once:
- tiny write-offs were individually final;
- their aggregate damaged monetary governance;
- supervisory policy tightened;
- the old authority tried to loosen it;
- supervision restored the tighter rule;
- old emergency law can still lend around the ordinary restriction.

New places include `central bank lost discretion one hundredth of foregone interest at a time` and `the lender of last resort being supervised by its rounding errors`.

Build 90 persists through `nothing-state-v90`, wraps the existing save/render chain, loads after `interest_materiality.js`, and extends forget-through-v90.

`monetary_remediation.js` passes V8 syntax validation. Exact committed-function tests cover stage thresholds, exact Build 89→90 escalation, ordinary Build 55 lending rejection after remediation, surviving Build 55 emergency override, exact old policy-loosening/reimposition behavior, pre-existing stricter policy preservation, stage catch-up, and idempotent v90 recovery.
