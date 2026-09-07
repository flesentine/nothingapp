# UX 2 — Selection + Right Inspector

UX 2 builds on the merged UX 1 Human Overview.

The simulation remains frozen at Build 100.

UX 2 does not create new simulation authority.

Its job is to make every existing selectable object feel like part of one coherent interface.

## Core rule

**Overview uses one right-side inspector. God View keeps the original legacy panel.**

The app already has a common interaction contract:

`panel(title, body, metadata, actions)`

Nearly every historical module ultimately uses that contract when an object is opened.

UX 2 wraps that global contract after all Build 100 and UX 1 scripts have loaded.

No historical module is rewritten merely to support the new inspector.

## Overview behavior

When the body is in `ux-overview` mode:

- calls to `panel(...)` open `#uxInspector`;
- the old bottom `#panel` is visually suppressed;
- the selected canvas marker receives a subtle highlight;
- the Overview summary card fades away while the inspector is open;
- Escape closes the inspector;
- the inspector close button uses the ordinary global `closePanel()` path.

## God View behavior

When the body is in `ux-god` mode:

- the wrapped `panel(...)` delegates directly to the exact original panel function;
- the original bottom panel remains the expert/debug interaction surface;
- the UX 2 inspector stays hidden.

Switching between modes closes the currently incompatible surface rather than showing both at once.

## Inspector information architecture

The inspector presents the existing panel payload as:

### Type / ID

The panel title is parsed for known accumulated object IDs such as:

- MCP
- GAR / GAP
- RRA / RRR
- RRP / RCP
- SRC / SRT
- MOT
- PRG
- SURV
- RDR
- COND
- ISF
- FB / DIR
- MA
- FX

The ID is visually secondary.

The human object type/name is primary.

### Status

Short status-like panel bodies are rendered as a compact state pill.

Statuses with current risk or failure semantics receive an attention treatment. Prefix-style states such as `pool-empty` and `no-rdr` remain status tokens rather than being misread as prose.

Healthy/active/passed states receive an active treatment.

### Summary

If the original panel body is prose rather than a status token, it becomes the inspector Summary.

### Why?

UX 2 adds a presentation-only explanation for the major Build 58–100 financial/governance entities.

Examples:

- MCP explains why restored board control can create a borrower-recused tightening opportunity.
- GAR/GAP explains the RDR-versus-reserves Build 59 score asymmetry.
- RRA explains reserve restitution.
- MOT explains that the old Build 59 board remains authoritative for the vote.
- ISF explains the shared reserve institution.
- monetary authority and FX objects explain their balance-sheet role.

Unknown/older objects receive a conservative fallback:

"This object is part of the accumulated 100-build simulation. Its facts and actions still come from the original module that created it; the inspector only presents them consistently."

The Why text never changes simulation state or authority.

### Important facts

The original panel metadata string is preserved verbatim as the inspector's facts section.

### Related

Known object IDs found in the title/body/metadata/action labels are shown as related chips.

UX 2 does not make those chips navigable yet.

Navigation/focus belongs to UX 3.

### What can happen next

The original action array is used directly.

UX 2 creates new visual buttons and assigns each historical callback directly as the button's `onclick`, matching the original panel contract. It does not wrap the callback, so browser event and `this` semantics are preserved.

No action semantics are reimplemented.

## Selection highlight

Before an object click reaches its old handler, UX 2 remembers the clicked marker.

If that interaction subsequently opens an inspector, the marker receives `ux-selected`.

The highlight is DOM-only.

Closing the inspector removes it.

An object that does not open a panel does not become a persistent inspector selection.

## Close semantics

The global `closePanel` is wrapped.

Closing an Overview inspector:

1. closes the UX inspector;
2. removes presentation selection state;
3. then calls the original `closePanel`.

That preserves the original `S.current = null` behavior.

UX 2 itself does not directly assign `S.current`.

## Read-only presentation boundary

UX 2 must not directly mutate:

- any `nothing-state-vN` key;
- simulation arrays;
- serial counters;
- balances;
- votes;
- conditions;
- incidents;
- crises;
- historical objects.

The only old functions it wraps are:

- `panel`;
- `closePanel`.

Original action callbacks remain authoritative.

## Responsive behavior

Desktop:
- inspector is a fixed right rail;
- the Overview card hides while the inspector is open.

Small screens:
- the same inspector becomes a bottom sheet;
- the Overview viewport receives extra bottom space while inspecting.

## Validation targets

1. Exact UX 2 JS parses.
2. UX 2 contains no direct `S.*` assignments or `nothing-state-vN` writes.
3. Overview calls to `panel` open the right inspector and do not open the legacy panel.
4. God View calls to `panel` use the exact legacy bottom panel.
5. Switching modes never leaves both surfaces open.
6. Original action callback identity/behavior is preserved.
7. `closePanel` still clears the old `S.current` through the original function.
8. Current Build 100 MCP/MOT panels render readable Type, Status, Why, Important facts, Related, and actions.
9. A major visible Overview marker receives/removes selection highlight correctly, and a click that never opens a panel cannot leak stale selection into a later inspector.
10. Escape closes the inspector.
11. Mobile layout becomes a usable bottom sheet.
12. UX 1 Overview/God View behavior remains green.
