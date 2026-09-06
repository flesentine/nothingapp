# Build 96

Recidivism capital shortfall acquired multilateral recapitalization.

Build 95 can leave a later emergency exception carrying three separate capital burdens:
- Build 92 one-for-one supervisory capital;
- Build 94 restoration surcharge equal to 50% of current principal;
- Build 95 recidivism penalty equal to another 50% of current principal.

Build 95 can also truthfully leave that recidivism penalty underfunded.

At that point the problem is no longer merely that supervision has become more expensive.

The monetary authority has demonstrated that its own free Build 55 capital is insufficient to satisfy the progressive supervisory regime.

Build 96 connects that failure back to an institution that already exists much earlier in the stack: the Build 58 Interreality Stabilization Fund and the Build 59 quota-weighted stabilization board.

Build 96 creates the Interreality Supervisory Recapitalization Window.

A current positive Build 95 recidivism shortfall becomes eligible for a real multilateral capital-support request.

The target reality is recused from voting on its own recapitalization.

The other stabilization director must carry enough current quota-weighted votes to cross the existing Build 59 major-action threshold, normally 60%.

If the board deadlocks, the existing systemic-necessity logic reappears as a staff-chair override with the same governance costs used by older stabilization interventions.

If approved, Build 96 transfers already-existing pooled stabilization reserves into the real Build 55 monetary authority `capital` field.

Build 96 does not itself satisfy the Build 95 penalty.

It creates real free authority capital and then leaves the older supervisory stack to decide what happens next.

## Existing balance sheets only

Build 96 does not create a synthetic rescue pool.

It uses the existing Build 58 stabilization fund:
- Reality A recapitalization draws from `poolRA`;
- Reality B recapitalization draws from `poolRB`.

Those pooled currencies already exist.

They were originally supplied through the stabilization system by the other reality.

A Build 96 transfer therefore converts an existing cross-reality reserve asset into capital support for the target monetary authority.

The Build 58 pool falls one-for-one.

The Build 55 authority `capital` field rises one-for-one.

No new settlement money is minted.

## Trigger

Build 96 is observational and current-state based.

A recapitalization request is eligible when:
- a Build 95 `RPR#` exists;
- its current `shortfall95` is positive above floating-point dust;
- the Build 95 requirement has not been orphaned or released;
- there is no still-active Build 96 recapitalization request already attached to that same Build 95 requirement;
- the Build 58 stabilization fund and Build 59 board still exist.

Unlike Build 95 strike creation, Build 96 does not need to infer a historical event.

A positive Build 95 shortfall is itself a live unresolved balance-sheet fact.

If that shortfall exists when Build 96 starts, Build 96 may respond to it.

## One request at a time

Each eligible Build 95 requirement creates one `SRC#` recapitalization request at a time.

The request records:
- linked Build 95 requirement;
- linked Build 94 requirement;
- linked Build 95 strike;
- linked Build 93 restoration order;
- linked Build 55 facility;
- linked Build 55 authority;
- target reality;
- burden reality;
- stabilization-pool currency;
- requested amount;
- applied amount;
- linked Build 59 motion.

The initial requested amount equals the Build 95 shortfall observed when the request is created.

If a request is still:
- `pending-vote`;
- `deadlocked`;
- `approved`;
- `implemented-partial`;
- `funding-shortfall`;

Build 96 does not create another request for the same Build 95 requirement.

A later request is possible only after the earlier request has reached a terminal state and a real Build 95 shortfall still remains or later reappears.

## Real Build 59 governance

Every Build 96 request creates a real Build 59 `MOT#` in `S.fundMotions59`.

The motion type is:

`supervisory-recapitalization96`

The target reality is recused.

The motion uses the live Build 59 board threshold, normally 60%.

The non-target director votes yes when the target reality's stabilization-pool currency is available.

Each Build 96 board vote also increments the existing Build 59 `boardVotes59` counter, so the old governance activity history remains complete.

At the original 50/50 board:
- target director is recused;
- other director has only 50 weighted votes;
- 60 are required;
- the motion deadlocks.

If later quota changes give the non-target reality at least 60% of current votes, the same request can pass without an override.

Build 96 therefore inherits every prior Build 59/75/76 governance shift.

It does not invent a new voting system.

## Systemic-necessity override

A deadlocked or still-pending Build 96 request can use the stabilization chair's systemic-necessity authority.

The override:
- passes the Build 96 motion;
- increments the existing Build 59 chair-power counter;
- increments the existing Build 59 board-override counter;
- reduces Build 58 fund independence by 0.045;
- reduces Build 58 credibility by 0.02.

The override is therefore institutionally costly.

It is not free authorization.

## Transfer accounting

Once approved, Build 96 computes the live amount it may transfer as the minimum of:
- current Build 95 `shortfall95`;
- still-unused approved Build 96 request amount;
- currently available stabilization-pool currency.

If the live Build 95 shortfall has already disappeared:
- no pool asset moves;
- no authority capital moves;
- the request becomes `cured-before-transfer` if nothing had been applied;
- or `implemented-current-shortfall-cured` if a partial transfer had already occurred.

If the pool is empty:
- no authority capital moves;
- request becomes `funding-shortfall`;
- the approved request can be retried if the pool is later replenished.

If the pool contains less than the approved live need:
- Build 96 transfers only what exists;
- request becomes `implemented-partial`;
- the remaining approved amount can be retried later.

If the full current need or full approved amount is transferred:
- request becomes `implemented-awaiting-consumption`;
- the request remains active until an older-layer reconciliation proves that the delivered authority capital was actually consumed or the Build 95 shortfall disappeared.

This intermediate state is recovery-critical.

Build 96 does not mark a fully transferred request terminal merely because the pool transfer succeeded. Otherwise a crash after the pool moved but before Build 95 reconciled could reconstruct the completed request, still see the old Build 95 shortfall, and create a duplicate recapitalization request.

After the next older-layer reconciliation:
- if Build 95 shortfall reaches zero, the request becomes `implemented`;
- if the Build 95 shortfall remains but either that shortfall decreased or authority capital fell below the post-transfer level, the request becomes `implemented-consumed-with-residual-shortfall`;
- only then can a new recapitalization request be created for any genuine residual Build 95 shortfall.

## Real authority capital

For a 0.30 Build 95 shortfall in Reality A:

Before:
- Build 58 `poolRA` = 5.00;
- Build 55 authority free capital = 0;
- Build 95 held penalty = 0.20;
- Build 95 shortfall = 0.30.

After a 0.30 approved Build 96 transfer:
- `poolRA` = 4.70;
- authority free capital = 0.30;
- Build 95 held penalty is still 0.20;
- Build 95 shortfall is still 0.30 until Build 95 reconciles again.

Build 96 does not silently edit the Build 95 requirement.

On the next full reconciliation, Build 95 may consume that 0.30 into the recidivism hold if every older Build 92/93/94 claim is already current.

## Older claims may absorb the recapitalization first

Build 96 deliberately transfers into the real unrestricted Build 55 authority `capital` field.

It does not create an earmarked synthetic account.

That means the existing priority chain remains authoritative.

If Build 92, Build 93, or Build 94 has a renewed older claim when the recapitalization arrives:
- the new authority capital is real;
- the older layer may consume it first;
- the Build 95 shortfall may remain;
- Build 96 does not reach backward and override that priority.

A later Build 96 request may become necessary if the original recapitalization was economically absorbed by older supervisory obligations.

This is a feature, not a bookkeeping accident.

## No monetary-base change

Build 96 differs from Build 74.

Build 74 used pooled stabilization reserves to extinguish an unpaid public rescue facility and reduced:
- facility principal;
- monetary base;
- outstanding credit when appropriate.

Build 96 does none of those things.

Its purpose is authority recapitalization, not public-credit retirement.

Build 96 never directly changes:
- monetary base;
- outstanding credit;
- reserve-account balances;
- borrower cash;
- Build 55 facility principal;
- Build 55 facility interest;
- contractual rates;
- Build 91 exception numbering;
- Build 92 requirement or held capital;
- Build 93 restoration buffer;
- Build 94 surcharge requirement or hold;
- Build 95 recidivism requirement or hold.

Build 96 changes only:
- the Build 58 pooled reserve asset;
- the real Build 55 authority free-capital field;
- Build 59 governance records;
- Build 96 recapitalization records.

## Transfer records

Every actual pooled-reserve transfer creates one `SRT#`.

Each transfer records:
- Build 96 request;
- Build 59 motion;
- Build 95 requirement;
- Build 55 facility;
- Build 55 authority;
- target reality;
- burden reality;
- currency;
- amount;
- stabilization-pool amount remaining;
- authority capital before;
- authority capital after;
- Build 95 shortfall observed immediately before transfer.

## Historical finality

Build 96 does not erase any older failure.

The Build 91 exception remains valid.

The Build 92 requirement remains historical and authoritative.

The Build 93 restoration order remains historical and authoritative.

The Build 94 surcharge remains historical and authoritative.

The Build 95 strike and recidivism penalty remain historical and authoritative.

If Build 96 later supplies enough capital for Build 95 to become fully funded, the older shortfall still happened.

The system can now say:
- an emergency exception survived multiple supervisory escalations;
- the ordinary authority capital requirement ran short;
- restoration was imposed;
- a later exception acquired a surcharge;
- that surcharge ran short;
- a strike was recorded;
- another exception acquired a recidivism penalty;
- that penalty also ran short;
- the authority could not recapitalize itself;
- the stabilization board was asked to socialize the supervisory capital failure;
- the target reality could not vote on its own rescue;
- the board could deadlock or a dominant creditor could approve;
- a staff chair could override;
- pooled reserves could become central-bank capital;
- and older supervisory claims could still decide where that capital ultimately went.

## Durable recovery

Build 96 mirrors each `SRC#` request and `SRT#` transfer onto surviving older objects:
- the linked Build 95 requirement;
- the real Build 55 monetary authority;
- the Build 58 stabilization fund.

This makes isolated v96 reconstruction non-economic.

If the v96 arrays disappear while the durable markers remain, reconstruction restores:
- recapitalization requests;
- transfer records;
- serial counters;
- aggregate request/vote/override/transfer metrics.

Recovery does not:
- reduce the Build 58 pool again;
- increase authority capital again;
- replay a board vote;
- replay an override;
- edit Build 95 held capital;
- create another motion.

A recovered `implemented-awaiting-consumption` request remains active.

If the Build 95 shortfall has not yet changed and the delivered authority capital is still present, recovery does not create another `SRC#`.

The request becomes terminal only after the older stack visibly consumes the delivered capital or cures the shortfall.

## Deterministic validation

The committed Build 96 module is tested against Build 58/59/95-compatible deterministic fixtures.

### No shortfall

Fixture:
- live Build 95 requirement;
- `shortfall95 = 0`.

Result:
- no Build 96 request;
- no Build 59 motion;
- no pool movement;
- no authority-capital movement.

### Current Build 95 shortfall

Fixture:
- `RPR1.shortfall95 = 0.30`;
- Reality A authority capital = 0;
- Build 58 `poolRA = 5.0`;
- Build 59 board A = 50 votes, B = 50 votes.

Result:
- exactly `SRC1`;
- requested96 = 0.30;
- one real Build 59 motion;
- target Reality A recused;
- no transfer before governance.

### Default 50/50 deadlock

The board votes:
- A = recused;
- B = yes with 50;
- threshold = 60.

Result:
- motion becomes `deadlocked-supervisory-recap96`;
- `SRC1` becomes `deadlocked`;
- pool remains 5.0;
- authority capital remains 0.

### Chair override

The systemic-necessity chair overrides the deadlock.

Result:
- motion becomes `passed-override-supervisory-recap96`;
- fund independence falls by 0.045;
- fund credibility falls by 0.02;
- 0.30 RA leaves `poolRA`;
- authority free capital rises 0 -> 0.30;
- Build 95 held/shortfall values remain unchanged until Build 95 runs again.

### Build 95 consumes the recapitalization

After the exact Build 95 reconciliation runs with older Build 92/93/94 claims current:

Result:
- Build 95 held penalty 0.20 -> 0.50;
- Build 95 shortfall 0.30 -> 0;
- authority free capital 0.30 -> 0.

Build 96 did not make those Build 95 edits.

### Majority approval

Fixture:
- Reality B currently has 65% of Build 59 votes;
- Reality A remains recused;
- `poolRA` is sufficient.

Result:
- B alone crosses the 60% threshold;
- motion passes without override;
- no credibility/independence penalty is charged;
- the transfer occurs.

### Partial pool funding

Fixture:
- approved request = 0.30;
- `poolRA = 0.10`.

Result:
- only 0.10 transfers;
- authority capital rises by 0.10;
- request becomes `implemented-partial`;
- 0.20 of approved amount remains available for a later retry.

### Empty pool

Fixture:
- approved request still has live need;
- `poolRA = 0`.

Result:
- no transfer;
- request becomes `funding-shortfall`;
- no synthetic capital is created.

### Cure before vote

Fixture:
- `SRC1` is pending;
- Build 95 shortfall is cured from another source before governance acts.

Result:
- request becomes `cured-before-vote`;
- no board transfer is needed;
- no pool or authority-capital movement occurs.

### Cure after partial transfer

Fixture:
- `SRC1` already applied 0.10;
- remaining Build 95 shortfall is later cured elsewhere.

Result:
- request becomes `implemented-current-shortfall-cured`;
- the historical 0.10 transfer remains final;
- no unused approved amount is transferred.

### Crash window after full transfer

Fixture:
- a full 0.30 pool transfer has occurred;
- the request is `implemented-awaiting-consumption`;
- Build 95 still shows its pre-reconciliation 0.30 shortfall;
- authority capital still contains the delivered 0.30;
- v96 local state disappears while durable markers survive.

Result:
- recovery restores the same request and transfer;
- the request remains active;
- no second `SRC#` is created;
- pool and authority capital do not move again.

After an older-layer reconciliation consumes the delivered capital:
- the awaiting request becomes `implemented` if Build 95 is cured;
- or `implemented-consumed-with-residual-shortfall` if a real shortfall remains;
- only a genuine residual shortfall can create a later request.

### Isolated v96 recovery


After a completed transfer, the v96 request/transfer arrays and counters are removed while durable markers remain on the Build 95 requirement, Build 55 authority, and Build 58 fund.

Reconstruction restores:
- the original `SRC#`;
- the original `SRT#`;
- serial counters;
- aggregate transfer amount.

The already-reduced stabilization pool stays unchanged.

The already-increased authority capital stays unchanged.

No economic movement is replayed.

## Persistence and UI

Build 96 persists through `nothing-state-v96`.

It wraps the current save/render chain.

It loads after `surcharge_recidivism.js`.

It extends forget-through-v96.

The UI adds:
- the `SRW1` supervisory recapitalization office;
- `SRC#` request nodes;
- board-vote action;
- systemic-necessity override action;
- retryable partial/funding-shortfall transfer action;
- `SRT#` transfer detail;
- a supervisory recap summary line.

New places include `foreign reserve pool recapitalizing a central bank after its progressive supervision ran out of capital`, `the other reality becoming the equity backstop for emergency lending it did not issue`, `other reality's reserve contribution becoming central bank equity after supervisory capital failed`, and `public recapitalization arriving as free capital before older supervisory claims choose where it goes`.
