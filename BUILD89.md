# Build 89

De minimis finality acquired materiality aggregation.

Build 88 gives every residual-interest remainder at or below 0.01 explicit legal finality. Each individual `RIW#` is deliberately tiny. But Build 88 tests each write-off in isolation.

That creates a salami-slicing loophole.

Five separate 0.01 write-offs on one Build 85 case total 0.05. Ten total 0.10. The same authority can also accumulate many sub-threshold write-offs across several different cases. Every individual decision remains de minimis while the aggregate loss stops being de minimis.

Build 89 creates the Interreality Interest Materiality Aggregation Office.

Build 89 never reverses a Build 88 write-off. Every `RIW#` remains historically final and no borrower debt is recreated.

Instead, Build 89 aggregates the exact foregone-interest amounts already recorded by Build 88 and gives repeated tiny write-offs a governance consequence.

## Case materiality

Every historical Build 85 `liquidated-deficiency` case receives a running `interestDustAggregate89` equal to the sum of its real Build 88 `RIW#` amounts.

The case threshold is 0.05, exactly five times the single-item Build 88 tolerance.

When cumulative write-offs for one case reach or exceed 0.05 for the first time, Build 89 creates one `IMR#` record with:
- `kind89='case-materiality'`;
- the Build 85 case ID;
- exact aggregate at trigger;
- 0.05 threshold;
- number of Build 88 write-offs;
- exact source `RIW#` IDs;
- involved monetary-authority IDs.

The Build 85 case receives:
- `interestMaterialityCase89`;
- `interestMaterial89=true`;
- `interestMaterialAt89`.

Case materiality is disclosure and escalation only. It does not move money and does not itself penalize the monetary authority.

There is one case-materiality record per Build 85 case. Later additional dust remains visible in the current aggregate but does not create repeated case events.

## Authority materiality

Build 89 also aggregates Build 88 write-offs across every case by actual Build 55 monetary authority.

The authority threshold is 0.10.

For every complete 0.10 tranche of cumulative foregone interest, Build 89 creates one authority-materiality `IMR#`.

The first tranche is triggered when cumulative authority write-offs reach 0.10. The second appears at 0.20, the third at 0.30, and so on.

Each authority tranche:
- reduces actual Build 55 authority independence by 0.01;
- reduces credibility by 0.015;
- increments the existing `emergencyMandate` by one;
- records before/after governance values;
- records exact source Build 88 write-off IDs and current aggregate.

No cash, monetary base, outstanding credit, reserve-account balance, reserves-extinguished history, authority capital, or borrower balance moves.

That distinction is intentional. Build 89 does not pretend foregone income was a realized balance-sheet loss. It treats repeated use of the de minimis rule as a governance and institutional-credibility problem.

## Exact predecessor tests

### Five write-offs on one case

Exact committed Build 88 was run against five principal-zero facilities on one Build 85 case, each with exactly 0.010 of residual interest.

Build 88 creates five real `RIW#` records:
- aggregate = 0.05;
- authority `residualInterestForegone88 = 0.05`.

Exact committed Build 89 then creates one case-materiality event:
- `IMR1`;
- kind `case-materiality`;
- aggregate 0.05;
- threshold 0.05;
- write-off count 5.

No authority-materiality event occurs yet.

Authority governance remains:
- independence 0.82;
- credibility 0.76;
- emergency mandate 0.

Cash, monetary base, outstanding credit, and capital remain unchanged.

### Ten write-offs on one case

Exact committed Build 88 was run against ten principal-zero facilities on one Build 85 case, each with exactly 0.010 of residual interest.

Build 88 creates ten `RIW#` records totaling approximately 0.10.

Exact Build 89 creates:
- `IMR1` case-materiality;
- `IMR2` authority-materiality tranche 1.

The authority changes:
- independence 0.82→0.81;
- credibility 0.76→0.745;
- emergency mandate 0→1.

Monetary base remains 15, outstanding credit remains 0, borrower cash remains 0, and authority capital remains 14.

### Aggregation across cases

The authority test is deliberately not scoped to one case.

Exact Build 88 creates:
- five 0.010 write-offs on `XDF1`;
- five 0.010 write-offs on `XDF2`.

Each case independently reaches 0.05 and receives its own case-materiality record.

Together the same authority has approximately 0.10 of cumulative foregone interest, so Build 89 also creates one authority-materiality tranche.

Splitting write-offs among separate cases therefore cannot evade the authority-level materiality test.

### Second authority tranche

A staged exact-predecessor harness begins with twenty source facilities:
- first ten carry 0.010 of residual interest;
- second ten initially carry 0.011 and therefore remain outside Build 88.

After the first Build 88/89 pass:
- 10 `RIW#` records exist;
- authority aggregate ≈0.10;
- first authority tranche is recorded;
- independence = 0.81;
- credibility = 0.745;
- emergency mandate = 1.

The second ten source balances are then reduced to exactly 0.010 and exact Build 88 is run again.

Build 88 creates ten more `RIW#` records, taking total foregone interest to approximately 0.20.

Exact Build 89 creates only the missing second authority tranche:
- threshold 0.20;
- independence 0.81→0.80;
- credibility 0.745→0.73;
- emergency mandate 1→2.

The first tranche is not replayed.

## Recovery

Build 89 writes durable materiality snapshots into older state:
- case-materiality events are stored on the Build 85 case;
- authority-materiality events are stored on the real Build 55 authority.

The authority also stores `interestMaterialityTranches89`, the highest governance tranche already applied.

This matters for isolated v89 loss.

The exact recovery harness deletes the Build 89 event ledger and counters after two authority tranches have already occurred, while preserving the older Build 85 case and Build 55 authority.

Build 89 reconstruction restores:
- the one case-materiality event;
- authority tranche 1;
- authority tranche 2;
- event serial;
- case-event count;
- authority-event count;
- penalty-tranche count.

Governance remains exactly:
- independence 0.80;
- credibility 0.73;
- emergency mandate 2.

No penalty is applied again. Cash, base, credit, and capital remain unchanged.

Build 89 relies on canonical script order for Build 88 recovery: `de_minimis_interest.js` loads before Build 89 and reconstructs the real `RIW#` ledger if isolated v88 state was lost.

## Finality

Build 89 deliberately preserves the project's historical-finality pattern.

A Build 88 `RIW#` does not stop being a valid de minimis write-off just because later aggregation shows the authority used that rule many times.

The system can therefore hold both facts at once:
- each individual write-off was legally final under Build 88;
- the aggregate pattern became institutionally material under Build 89.

New places include `a hundredth of a credit becoming material only after it happened enough times` and `rounding errors forming a constituency`.

Build 89 persists through `nothing-state-v89`, wraps the existing save/render chain, loads after `de_minimis_interest.js`, and extends forget-through-v89.

`interest_materiality.js` passes V8 syntax validation. Exact committed-function tests cover one-case 0.05 materiality, one-case 0.10 authority materiality, aggregation across separate cases, staged 0.20 second-tranche escalation, governance-only penalties, and idempotent isolated-v89 reconstruction.
