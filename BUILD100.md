# Build 100

Governance arbitrage acquired borrower-recused conditionality capture.

Build 99 can convert some Build 98 restitution RDR into real foreign reserves when that conversion is just enough for the old Build 59 score to restore a board majority.

Build 100 follows the first direct institutional consequence of that restored control.

The old Build 59 board already governs stabilization programs through real `MOT#` motions.

A motion aimed at a program's borrower recuses that borrower from voting on its own rescue terms.

Build 100 therefore does not invent a second policy engine.

Instead, after a successful Build 99 `GAR#`, it can sponsor one genuine pending Build 59 tightening motion against the other reality's stabilization program.

The old Build 59 board remains solely responsible for voting and applying that motion.

## Majority Conditionality Capture Register

Build 100 creates the Interreality Majority Conditionality Capture Register, `MCR1`.

Each successful Build 99 redemption with:
- `crossedMajority99 === true`;
- final status `majority-restored`;

creates one Build 100 `MCP#` capture position.

The capture identifies:
- the creditor reality whose Build 99 redemption restored control;
- the other reality as the potential borrower target;
- the source `GAR#`;
- the currently eligible stabilization program;
- current Build 59 surveillance evidence;
- any real Build 59 motion later sponsored from that position.

A single GAR can create at most one MCP.

## Current majority must still exist

Historical success is not enough.

Before Build 100 can sponsor a motion:
- the live Build 59 board must still name the GAR creditor as `dominant`;
- that creditor's current director weight must still meet the live board threshold.

If later state removes the majority before a motion is created, the MCP remains historical but sits at `majority-not-live`.

Build 100 does not recreate the majority.

## Existing borrower program

The target is the opposite reality.

Build 100 selects the newest real Build 58 stabilization program for that target whose status is:
- `active`;
- `off-track`;
- `funding-shortfall`.

If no such program exists, the MCP remains `awaiting-program`.

Build 100 never creates a stabilization program merely to create a governance target.

## Existing surveillance only

Build 100 does not manufacture the evidence needed for the old board's tightening preference.

It requires an already-existing Build 59 surveillance report for the borrower.

The newest report is used.

If no report exists:
- status = `awaiting-surveillance`;
- no motion is created.

If the latest report has risk below 0.45:
- status = `risk-below-tightening`;
- no motion is created.

That 0.45 boundary is the exact old Build 59 vote-preference boundary for `tighten-conditionality`.

Build 100 therefore sponsors a motion only when the non-borrower director would already vote yes under the original rule.

## Real Build 59 motion

When all conditions are satisfied, Build 100 creates one actual entry in `S.fundMotions59`.

It uses the old Build 59 serial:
- increments `fundMotionSerial59`;
- assigns the next ordinary `MOT#`.

The motion is structurally a normal Build 59 motion:
- `type: tighten-conditionality`;
- `label: tighten program conditions`;
- target program = real Build 58 program;
- target reality = borrower;
- threshold = live Build 59 board majority;
- borrower appears in `recused`;
- status begins `pending`;
- yes/no weights begin at zero.

Build 100 adds provenance:
- `sourceBuild100: conditionality-capture`;
- linked `MCP#`;
- linked source `GAR#`;
- restored-majority creditor reality.

The old Build 59 UI sees this as an ordinary pending motion.

## Build 100 does not vote

Build 100 does not:
- call a parallel vote formula;
- set `yesWeight`;
- set `noWeight`;
- mark the motion passed;
- change the monetary-tightening target;
- change package tax rates;
- suspend a program;
- release a tranche;
- assign director votes.

The user can open the ordinary Build 59 board and call the vote through the old motion UI.

The exact old `voteMotion` then:
1. recalculates current director weights;
2. recuses the borrower;
3. evaluates the remaining creditor's vote from old surveillance;
4. compares yes weight with the motion threshold;
5. applies the old Build 59 motion only if it passes.

## Captured tightening consequence

If the creditor still holds at least the live threshold and surveillance risk remains compatible with tightening, the old Build 59 vote can pass with:
- borrower = recused;
- creditor = yes;
- yes weight = restored-majority vote share.

The old `applyMotion` then remains authoritative.

For `tighten-conditionality`, old Build 59 can:
- raise the program's monetary-tightening condition by 0.03, capped at 0.30;
- raise live package-treasury tax rates in the borrower reality by 0.10, subject to the existing bounds;
- increment `boardTightened59`;
- increment `boardConditionalityChanges59`;
- write the existing Build 59 trust/history events.

Build 100 only observes those results.

## Majority can disappear before the vote

Creating the motion does not freeze voting power.

The old Build 59 vote recalculates directors when the vote is actually called.

If market/state changes remove the creditor majority after Build 100 created the motion:
- Build 100 does not repair the vote;
- the old motion can deadlock or fail;
- the MCP records the old motion's eventual status.

This preserves the distinction between:
- acquiring a policy opportunity;
- successfully exercising that opportunity.

## Existing open tightening motions block duplication

Build 100 does not stack a second tightening motion onto a program that already has a pending or deadlocked Build 59 `tighten-conditionality` motion.

The MCP sits at `existing-tightening-open`.

Once that older motion is no longer open, the position can be reconsidered if all other requirements still hold.

## Observation states

Before a motion exists, an MCP can be:
- `observing-majority`;
- `majority-not-live`;
- `awaiting-program`;
- `existing-tightening-open`;
- `missing-monetary-condition`;
- `awaiting-surveillance`;
- `risk-below-tightening`.

After Build 100 creates a real motion:
- `motion-pending`;
- `motion-deadlocked`;
- `motion-rejected`;
- `capture-passed`.

Build 100 also records the linked motion's current:
- yes weight;
- no weight;
- threshold;
- monetary condition before/after;
- target-reality tax snapshot before/after.

Those are observations, not a second source of authority.

## Historical finality

Build 100 does not erase:
- the Build 96 recapitalization;
- Build 97 preferred repayment;
- Build 98 RDR restitution;
- Build 99 governance-arbitrage redemption;
- the Build 99 majority-restoration event;
- the Build 59 motion or vote that later follows.

A full path can now truthfully show:
1. one reality's pooled reserve asset recapitalized the other reality;
2. the recapitalized authority repaid the fund;
3. the reserve-loss bearer received RDR restitution;
4. that creditor redeemed enough RDR to restore a board majority;
5. the restored majority sponsored a real borrower-recused tightening motion;
6. the old Build 59 board voted;
7. the old Build 59 conditionality machinery applied any policy change.

## Mutation boundary

Build 100 directly mutates only:
- its own v100 state;
- `fundMotionSerial59`;
- `fundMotions59` by adding one structurally normal pending motion;
- durable provenance markers on the source GAR, target program, linked motion, and board.

Build 100 does not directly mutate:
- Build 59 director votes;
- motion yes/no weights after creation;
- motion passage/rejection;
- board majority threshold;
- Build 58 RDR;
- poolRA or poolRB;
- Build 56 foreign reserves;
- Build 58 quota or contribution history;
- program monetary condition;
- package tax rates;
- monetary base;
- outstanding credit;
- Build 55 authority capital;
- Builds 91–99 economic history.

## Recovery

MCP snapshots are mirrored onto:
- source Build 99 GAR;
- target Build 58 stabilization program;
- linked real Build 59 motion;
- Build 59 board.

If isolated v100 state disappears while those older objects survive, Build 100 reconstructs the same MCP records and serial counters.

Recovery is non-economic and non-governance.

It does not:
- create another MOT;
- increment `fundMotionSerial59` again;
- cast a vote;
- tighten a condition;
- change taxes;
- replay Build 99 governance arbitrage.

The linked real Build 59 motion is the authoritative no-duplication record.

## Validation targets

Exact-blob validation covers:
- successful GAR + live majority + eligible program + risk >= 0.45 creates exactly one real pending Build 59 MOT;
- repeated reconciliation is idempotent;
- historical GAR without current majority creates no motion;
- missing program creates no motion;
- missing surveillance creates no motion;
- risk below 0.45 creates no motion;
- an already-open tightening motion blocks duplication;
- mirror creditor/borrower direction works;
- isolated v100 recovery rebuilds MCP without creating another MOT.

Exact old Build 59 integration additionally proves:
- the Build 100 motion appears in the old Build 59 ledger;
- exact old `voteMotion` recuses the borrower;
- restored-majority creditor votes yes from old surveillance;
- the old threshold is reached;
- exact old `applyMotion` raises the real monetary condition and borrower package tax rates;
- Build 100 itself contains zero direct vote/condition/tax assignments.

## Persistence and UI

Build 100 persists through `nothing-state-v100`.

It wraps the current save/render chain.

It loads after `governance_arbitrage.js`.

It extends forget-through-v100.

The UI adds:
- `MCR1` Majority Conditionality Capture Register;
- `MCP#` capture nodes;
- linked GAR/program/surveillance/motion;
- current capture status;
- observed condition before/after;
- observed vote weights/threshold;
- a direct route to the ordinary Build 59 board where the real MOT can be voted.

New places include `recovered creditor majority writing the other reality's rescue conditions` and `liquidity restitution returning as a policy veto over the borrower`.
