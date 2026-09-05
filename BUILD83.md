# Build 83

Margin refinancing acquired funding novation. Build 82 can replace an original Build 78 sterilization loan with a stack of short-dated Build 55 margin-refinance facilities. Before Build 83, the live Build 79 carry still pointed only at the original sterilization facility. That creates a false end-of-leverage condition: once the original loan is repaid, exact Build 80 sees the linked facility as `repaid` and can release segregated margin even while active Build 82 refinancing facilities still fund the same carry.

Build 83 creates the Interreality Carry Funding Novation Office and makes the funding anchor transferable.

A live Build 79 carry is eligible for novation when its currently linked facility is missing or no longer active/monetized and at least one Build 82 margin-refinance facility for the same position remains active or monetized. Closed and already-unlevered carries are not novated.

The successor is the oldest surviving active Build 82 refinancing facility for the position. If no active refinancing facility survives but a monetized Build 82 facility does, the monetized facility can become the anchor instead. Active credit is preferred to permanent-money holdings.

Novation changes the live funding link; it does not rewrite the historical loan chain. The Build 79 position's `facilityId55` moves from the dead facility to the successor, while `fundingOriginFacility83` preserves the original anchor and each `FNV#` record preserves the exact from/to pair.

The durable Build 79 carry marker moves with the legal funding anchor. Any older facility holding `carryPosition79` for the same carry has that live recovery marker removed and preserved as `carryPosition79Novated83`. The successor receives `carryPosition79` plus the current carry basis, foreign units, entry rate, status, risk flags, currency codes, and original Build 77/78 source identifiers. This guarantees that isolated v79 recovery reconstructs the carry from the current funding anchor rather than creating duplicate positions from every historical loan in the stack.

Build 83 intentionally reconciles before invoking the prior render chain. This reverses the usual newest-layer render order for one narrow reason: if a Build 81 setoff repays the current anchor during an interaction, Build 83 must move the carry to the next funding facility before exact Build 80 reconciliation sees the dead facility and releases margin. The rest of the older render chain then executes against the already-novated link.

A forward-migration repair handles browser profiles where Build 80 had already released margin before Build 83 existed or during earlier page-load sequencing. If the carry is still economically live, a refinancing successor exists, `macroMarginReleased80` is true, and the current required margin is no longer posted, Build 83 recalls the released amount from actual borrower cash up to the smaller of the current requirement, the historically returned margin, and currently available cash.

The recall does not erase the historical Build 80 release. `macroMarginReturned80` remains as procedural history. Build 83 simply restores current posted margin and increments Build 80's cumulative posted-margin history for the newly reposted amount.

If the borrower no longer has enough cash to restore all required margin, Build 83 recalls what remains available and records the unrecalled difference as `marginRecallShortfall83`. The release flag is cleared so exact Build 80 can treat the remaining amount as a genuine new margin deficit rather than repeatedly releasing the same buffer.

The canonical novation harness begins with LF1 repaid, LF2 and LF3 active Build 82 refinancing facilities, a live `rollover-risk` carry still linked to LF1, 1.26 posted margin, and borrower cash 2.48. Exact committed Build 83 chooses the oldest active successor LF2.

After novation:
- carry funding link: `LF1 → LF2`;
- `fundingOriginFacility83 = LF1`;
- current funding anchor = LF2;
- LF1 no longer has the live `carryPosition79` marker;
- LF1 preserves `carryPosition79Novated83 = SCY1`;
- LF2 now has `carryPosition79 = SCY1`;
- posted margin remains 1.26;
- borrower cash remains 2.48;
- FX does not move;
- no public-money balance changes.

Exact Build 80 reconciliation was then run against that novated state. Because the carry now points to active LF2, Build 80 leaves the 1.26 segregated margin untouched, borrower cash remains 2.48, and `macroMarginReleased80` remains false. This is the core false-release bug Build 83 prevents.

The next exact cross-build chain proves that the loop continues after the original loan is dead. Build 81 seizes the 1.26 margin from LF2. LF2 becomes `repaid`, posted margin falls to zero, monetary base falls 17.52→16.26, and outstanding credit falls 2.52→1.26. Build 83 then immediately novates the carry again, `LF2 → LF3`.

Exact Build 80 creates the next margin call against LF3, not against the dead original facility. The call is `MCM2` for 1.26. Exact Build 82 refinances that call from LF3 and creates LF4 for 1.26. Posted margin returns to 1.26, monetary base returns 16.26→17.52, outstanding credit returns 1.26→2.52, and borrower cash remains 2.48. The Build 81→80→82 recycling mechanism therefore survives beyond the original Build 78 funding anchor.

The forward-migration release-repair harness begins with LF1 repaid, LF2 active, the carry still linked to LF1, posted margin zero, `macroMarginReleased80=true`, historical returned margin 1.26, and borrower cash 3.74. Build 83 novates to LF2 and recalls the full 1.26. Current posted margin becomes 1.26, borrower cash returns 3.74→2.48, the release flag is cleared, and historical returned margin remains 1.26.

The partial recall harness gives the same state only 0.50 borrower cash. Build 83 recalls 0.50, leaves borrower cash at zero, posts 0.50, and records a 0.76 recall shortfall. Exact Build 80 can subsequently issue a normal replacement margin call for the remaining deficit.

Build 83 also fixes cross-version recovery. After an LF1→LF2→LF3 funding chain, isolated v79 state was removed. Exact committed Build 79 reconstructed exactly one `SCY1` position from the current LF3 carry marker, linked it to LF3, restored the correct 3.6 domestic basis / 3.5 foreign units / `rollover-risk` status, and left borrower cash 2.48 and the FX rate 1.0336561099 unchanged. Historical LF1/LF2 facilities did not create duplicate positions because their live carry marker had been moved.

Isolated v83 loss is also idempotent. The successor facility stores the immutable `FNV#` snapshot. Reconstructing v83 restores the novation ledger, serial, continuation count, margin-recall totals, recall-shortfall totals, and marker-move count without moving the funding link, borrower cash, posted margin, or any Build 55 balance a second time.

Build 83 persists through `nothing-state-v83`, wraps the existing save/render chain, loads after `margin_refinance.js`, and extends forget-through-v83. It updates the actual Build 79 funding pointer and Build 55 facility recovery markers; it does not consolidate, refinance, repay, or shadow the actual Build 55 facilities themselves.

New places include `carry funding surviving by moving from a repaid sterilization loan into its refinancing descendants`, `the loan died but the leverage contract found another public balance sheet to inhabit`, `repaid public loan replaced as the legal funding anchor by its refinancing descendant`, and `carry leverage surviving the death of its original loan through funding novation`. `funding_novation.js` passes V8 syntax validation. Exact committed-function tests cover canonical LF1→LF2 novation, Build 80 release prevention, LF2→LF3 re-novation after exact Build 81 setoff, continued exact Build 80→82 refinancing from the novated anchor, full and partial legacy-margin recall, isolated v79 reconstruction from the current anchor, and idempotent v83 recovery.
