# Build 91

Monetary remediation acquired an exception register.

Build 90 makes repeated Build 89 materiality operational by tightening the real Build 55 discount rate and collateral floor. Ordinary lending becomes harder as supervisory remediation escalates.

But the old monetary stack still contains emergency override paths.

Exact old Build 55 can lend against ineligible collateral with `override=true`. Build 70 can use a recovery-window override. Build 78 can override negative-equity sterilization. Build 82 can override negative-equity margin refinancing.

Those old escape hatches are intentionally preserved by Build 90.

The problem is repetition.

Nothing in Build 90 limits how many times a supervised authority can use the emergency path. A central bank can therefore operate under a formal 7.5% / A supervisory minimum and repeatedly choose exceptions until the ordinary rule becomes mostly ceremonial.

Build 91 creates the Interreality Supervisory Exception Register.

Build 91 does not cancel emergency loans, retroactively rewrite facility pricing, or remove old override powers.

Instead, every qualifying post-supervision override becomes a durable supervisory exception. Repeated exceptions progressively consume future policy discretion.

## Eligibility

A Build 55 facility enters Build 91 only when:
- its issuing authority is already under Build 90 supervision;
- the authority has a real `supervisedSince90` timestamp;
- the facility was issued at or after that supervision began;
- the facility represents an actual old override path.

Recognized override forms are:
- generic Build 55 `override=true`;
- Build 70 recovery-window override;
- Build 78 `sterilizationOverride78=true`;
- Build 82 `marginRefinanceOverride82=true`.

A pre-supervision override is historical monetary policy and is not retroactively placed into the Build 91 exception count.

Each qualifying facility receives:
- `supervisoryException91`;
- `supervisoryExceptionNumber91`;
- `supervisoryExceptionSource91`;
- a durable `supervisoryExceptionMarker91`.

## Exception registration

The first post-supervision exception is registered but does not add a new Build 91 policy tightening.

That preserves a genuine emergency escape hatch.

For a Build 90 stage-1 authority:
- Build 90 minimum remains 7.5%;
- collateral floor remains A;
- exception #1 is recorded.

The facility's contractual rate is whatever the old issuing layer calculated at issuance. Build 91 does not change that facility rate later.

## Exception ratchet

Every exception after the first tightens future monetary policy.

The rate rule is:

`required rate = Build 90 stage minimum + 0.02 × (exception count - 1)`

with a hard cap of 20%.

The collateral rule tightens one grade per additional exception until AAA.

The actual Build 55 `discountRate` and `collateralFloor` are updated, so all old lending windows that read those fields inherit the ratchet.

### Stage-1 example

Build 90 stage 1 begins at:
- 7.5%;
- A.

Exception sequence:
- #1 → 7.5% / A;
- #2 → 9.5% / AA;
- #3 → 11.5% / AAA;
- #4 → 13.5% / AAA;
- later exceptions keep adding 2 percentage points until the 20% cap.

### Later Build 90 stages

The ratchet is always based on the current Build 90 stage minimum.

A stage-2 authority begins at 9.5% / AA:
- #1 → 9.5% / AA;
- #2 → 11.5% / AAA;
- #3 → 13.5% / AAA.

A stage-3 authority begins at 12% / AAA:
- #1 → 12% / AAA;
- #2 → 14% / AAA.

Build 91 never loosens an already stricter policy.

## Exact old Build 55 override chain

Exact committed Build 55, exact committed Build 90, and the exact committed Build 91 module were executed together.

The authority starts after Build 90 stage 1:
- discount rate 7.5%;
- collateral floor A.

A solvent BBB Build 53 dealer has ample collateral.

### Exception #1

Exact old Build 55 override lending issues:
- `LF1`;
- principal 1.0;
- facility rate approximately 11%;
- BBB collateral;
- override=true.

Build 91 creates `SER1`:
- kind `exception-registration`;
- exception number 1;
- source `build55-override`.

The facility remains at its original 11% rate.

Future authority policy remains:
- 7.5%;
- A.

### Exception #2

Exact old Build 55 issues a second override facility at approximately 11%.

Build 91 creates:
- `SER2` exception registration;
- `SER3` exception ratchet.

Future authority policy becomes:
- 9.5%;
- AA.

Both already-issued facilities keep their contractual 11% rates.

### Exception #3

The third exact old Build 55 override is issued after the authority has already ratcheted to 9.5% / AA.

Old Build 55 therefore prices this new override facility at approximately 13%.

Build 91 then creates:
- `SER4` exception registration;
- `SER5` exception ratchet.

Future policy becomes:
- 11.5%;
- AAA.

The third facility remains at its approximately 13% issue rate. Build 91 does not rewrite it to 11.5% or any other later value.

After all three overrides:
- public facility principal = 3.0;
- monetary base = 3.0;
- outstanding credit = 3.0;
- borrower cash increased by the actual 3.0 issued;
- Build 91 itself moved none of those balances.

## Governance accounting

Build 91 deliberately does not invent another generic independence/credibility penalty.

Old layers remain authoritative for the governance consequences of the override they created.

In exact old Build 55, generic override lending increments the old emergency-loan count but does not independently reduce authority independence or credibility.

Build 70, Build 78, and Build 82 already contain their own older governance penalties for their specialized emergency paths.

Build 91 therefore aggregates and constrains future policy without double-charging those older actions.

## Cross-layer exception recognition

A compatibility harness uses representative facility records carrying the exact override tags written by the older committed modules.

One facility with generic `override=true` was issued before supervision. Build 91 ignores it.

Three facilities were then issued after supervision:
- Build 70 recovery bridge with `override=true`;
- Build 78 sterilization facility with `sterilizationOverride78=true` even though its generic `override` field is false;
- Build 82 margin-refinance facility with `marginRefinanceOverride82=true`.

Build 91 registers exactly those three facilities:
- exception #1 → `recovery-window-override70`;
- exception #2 → `sterilization-override78`;
- exception #3 → `margin-refinance-override82`.

The pre-supervision facility remains outside the register.

The resulting stage-1 authority policy is 11.5% / AAA.

## Build 91-only reimposition

Build 91 has its own continuing policy floor on top of Build 90.

The exact combined harness first creates three supervised exceptions, leaving:
- Build 90 stage 1;
- Build 90 base minimum 7.5% / A;
- Build 91 exception minimum 11.5% / AAA.

Exact old Build 55 policy controls then attempt:
- discount rate 11.5%→10.5%;
- collateral floor AAA→AA.

The old floor-loosening rule still executes its historical consequence:
- independence falls by 0.015;
- emergency mandate increases by one.

The resulting 10.5% / AA policy is still stricter than Build 90's own 7.5% / A minimum.

Exact Build 90 therefore correctly does nothing.

Build 91 detects that the authority is below the separate exception-derived minimum and creates an `exception-reimposition` `SER#`.

Policy returns to:
- 11.5%;
- AAA.

The old attempted-loosening governance damage remains historical.

## Stage escalation interaction

Build 91's required policy is calculated from the current Build 90 stage.

If an authority already has supervised exceptions and Build 89 later causes Build 90 to escalate to a higher stage, Build 91 recalculates the exception requirement from the new higher base.

It never reduces the current rate/floor.

The system can therefore stack:
- Build 89 materiality;
- Build 90 remediation stage;
- Build 91 exception count.

## Recovery

Every exception registration is durably stored on the actual Build 55 facility.

Every registration, ratchet, and reimposition is also durably snapshotted on the actual Build 55 monetary authority.

The authority stores:
- `supervisoryExceptionCount91`;
- `supervisoryExceptionRatchetCount91`;
- `supervisoryExceptionMinRate91`;
- `supervisoryExceptionFloor91`;
- `supervisoryExceptionStatus91`;
- `supervisoryExceptionStarted91`;
- `supervisoryExceptionReimpositions91`.

The exact recovery harness was run after:
- three exception registrations;
- two ratchets;
- one Build 91-only reimposition.

Deleting isolated v91 state and reconstructing from the durable Build 55 authority/facility markers restores:
- 3 registrations;
- 2 ratchets;
- 1 reimposition;
- 1 supervised authority with exceptions;
- the event serial.

The authority remains exactly:
- exception count 3;
- ratchet count 3;
- discount rate 11.5%;
- collateral floor AAA.

No registration, ratchet, or reimposition is economically replayed.

## Finality

Build 91 preserves all older facts.

An emergency override remains a valid historical Build 55/70/78/82 action.

A Build 90 supervisory order remains valid.

Build 91 adds the later fact that repeated use of those valid exceptions reduced the authority's future discretion.

The stack can therefore simultaneously say:
- supervision tightened ordinary lending;
- emergency law allowed an exception;
- the emergency loan remained valid;
- a second exception made future policy stricter;
- a third exception made it stricter again;
- an old policy control tried to loosen the result;
- Build 90 considered the loosened policy acceptable relative to its own floor;
- Build 91 restored the stronger exception-derived requirement.

New places include `an emergency exception becoming the new ordinary rule one loan at a time` and `a supervisor keeping a ledger of every time supervision was ignored`.

Build 91 persists through `nothing-state-v91`, wraps the existing save/render chain, loads after `monetary_remediation.js`, and extends forget-through-v91.

`supervisory_exceptions.js` passes V8 syntax validation. Exact committed-function tests cover the three-loan old Build 55 override chain, non-retroactive facility pricing, pre-supervision exclusion, Build 70/78/82 override-tag recognition, Build 91-only policy reimposition, and idempotent isolated-v91 recovery.
