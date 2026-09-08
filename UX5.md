# UX 5 — Recent Changes Timeline

UX 5 builds on the merged Human Overview, Right Inspector, Focus + Navigation, and Semantic Zoom layers.

The simulation remains frozen at Build 100.

The remaining human-comprehension problem is temporal:

**What just happened?**

UX 5 answers that from the accumulated simulation's real records.

It does not create a separate event log.

## Source of truth

The timeline scans the live top-level `S` object for timestamped records.

Eligible array records must have:
- a string `id`;
- a numeric `created` or `started` timestamp.

Top-level institutional objects are included when their state key is an Office / Register / Desk / Window and they have an ID + timestamp.

Records are sorted newest first.

Existing `Date.now()` timestamps from Builds 55–100 remain authoritative.

## Important vs All activity

The timeline opens in **Important** mode.

Important includes the accumulated monetary / FX / trade / stabilization / supervisory / governance / conditionality record families.

Routine `TA#` trust-audit records are suppressed from Important.

Open / severe incidents remain important.

**All activity** exposes the broader timestamped state feed, still capped in the UI to prevent a giant panel.

Limits:
- Important: newest 30;
- All activity: newest 80.

No records are deleted or altered by the cap.

## Human event summaries

Known accumulated record families get concise summaries.

Examples:

- `MCP#` — creditor reality → target reality + capture status;
- `GAR#` — redeemed drawing-right amount into foreign reserves;
- `RRA#` — restored drawing rights to the burden reality;
- `RRP#` — preferred repayment returned to the stabilization pool;
- `RCP#` — preferred recapitalization claim;
- `SRC#` — supervisory recapitalization applied / requested;
- `SRT#` — reserve transfer into monetary capital;
- `MOT#` — board motion label + status;
- `SURV#` — reality risk + recommendation;
- `PRG#` — stabilization commitment + status;
- `REV#` — review status;
- `RDR#` — drawing-right allocation;
- `INC#` — incident title / severity / status.

Unknown records fall back conservatively to their name/title/label/status.

## Time display

Recent records use compact relative time:
- now;
- seconds;
- minutes;
- hours.

Older records use a locale-aware date/time.

The underlying record timestamp is never rewritten.

## Relationships

For each record, UX 5 scans first-level record fields for related accumulated IDs.

Examples may include:
- `MCP1 ↳ GAR1 · PRG1 · SURV1 · MOT11`;
- `RRA1 ↳ RRP1 · RCP1 · SRT1 · SRC1`.

This is a relationship hint, not yet a causal graph.

A dedicated causal explorer can build on this in a later UX pass.

## Timeline detail

Selecting a timeline row expands a small detail block with:
- status;
- reality / creditor / target / burden context;
- currency;
- selected amount/risk fields;
- source state collection.

This detail is read-only.

## Locate

If the original marker for a timeline record is currently visible and interactive at the active Overview / Focus / Semantic Zoom level:

**Locate** dispatches a normal click on that original marker.

That means:
- the original module's click handler runs;
- UX 2's inspector remains the authoritative detail/action surface;
- historical action callbacks are unchanged.

Locate does **not** secretly:
- increase semantic zoom;
- change Focus;
- switch modes;
- create a synthetic panel.

If the marker is hidden at the current presentation level, Locate is disabled and says so.

The user can explicitly change Focus/detail and then locate it.

## Mutual exclusivity with Inspector

Opening Recent Changes closes an open UX 2 inspector through the existing global `closePanel()` path.

Opening an original object panel while Recent Changes is open closes the timeline first.

This prevents competing left/right detail surfaces.

## Escape hierarchy

UX 5 handles Escape in capture phase when the timeline is open.

That matters because UX 3 also uses Escape for focus navigation.

Hierarchy becomes:

1. Recent Changes open → Escape closes Recent Changes only.
2. Inspector open → UX 2 closes inspector only.
3. Focus active with neither panel open → UX 3 exits focus.
4. Root Overview → no UX presentation action.

UX 5 stops propagation only for the first case.

## Focus and Semantic Zoom

The timeline remains chronological and global.

When a UX 3 subsystem Focus is active, the timeline subtitle names that focus but does not silently filter history.

Semantic Zoom does not remove timeline records.

Instead, it controls whether Locate is currently available for the original marker.

## Refresh model

UX 5 wraps the already-accumulated `renderAll` presentation chain.

After original rendering completes:
- timeline refresh is queued;
- no simulation state is mutated.

While the timeline is open, a lightweight 2.5-second refresh updates relative time/status/location availability.

UX 5 also refreshes on body mode/focus/semantic-level changes.

## God View

Recent Changes is an Overview tool.

Entering God View:
- closes the timeline;
- hides the Recent control;
- leaves God View's accumulated legacy presentation untouched.

Returning to Overview makes the control available again.

## Read-only authority boundary

UX 5 must not directly mutate:
- `S.*`;
- `nothing-state-vN`;
- simulation arrays;
- record fields;
- serial counters;
- balances;
- votes;
- conditions;
- incidents;
- crises.

It adds only transient DOM/UI state:
- timeline open/closed;
- Important/All filter;
- selected timeline row;
- temporary Locate pulse class.

It wraps:
- `renderAll`;
- `panel`;

and delegates to the exact previous functions with `apply(this,args)`.

## Validation targets

1. Exact UX 5 JS parses.
2. UX 5 has zero direct simulation/localStorage writes.
3. Real timestamped top-level records sort newest-first.
4. `TA#` is absent from Important but present in All activity.
5. open/severe incidents remain Important.
6. known Build 58–100 types receive correct human summaries.
7. related IDs are extracted without duplicating the current record ID.
8. selecting a row expands read-only facts.
9. Locate is enabled only for a currently visible/interactable original marker.
10. Locate executes the original marker click path.
11. Locate does not auto-change Focus/semantic zoom.
12. opening timeline closes inspector cleanly.
13. opening an object panel closes timeline cleanly.
14. Escape closes timeline without also exiting active Focus.
15. next Escape with no panel exits Focus normally.
16. renderAll refresh preserves original return behavior.
17. repeated live-record creation does not duplicate timeline entries.
18. God View closes/hides timeline.
19. mobile timeline becomes a bounded bottom sheet.
20. console/page errors remain zero.
