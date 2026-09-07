# UX 3 — Focus + Navigation

UX 3 builds on the merged UX 1 Human Overview and UX 2 Right Inspector.

The simulation remains frozen at Build 100.

UX 3 adds spatial/navigation context without changing simulation state.

## Focus model

A selected inspector object can expose one presentation-only action:

`Focus <system>`

Current focus systems are:

### Stabilization System

Includes the existing Build 58/59 roots and the Build 96→100 consequence chain:

- monetary authority context;
- FX;
- stabilization fund;
- stabilization board;
- supervisory recapitalization;
- preferred recoupment;
- reserve restitution;
- governance arbitrage;
- conditionality capture.

Representative IDs:
- ISF / ISFB / FB / DIR;
- PRG / COND / SURV / MOT;
- SRC / SRT;
- RCP / RRP / RPO;
- RRA / RRR / RDR;
- GAP / GAR / GAD;
- MCP / MCR.

### Monetary Supervision

Includes:

- monetary authority;
- Build 90 remediation;
- Build 91 emergency exceptions;
- Build 92 capital requirement;
- Build 93 restoration;
- Build 94 surcharge;
- Build 95 recidivism;
- Build 96 recapitalization;
- stabilization-fund context.

Representative IDs:
- MAA / MAB / MA;
- CRO;
- RSO;
- supervisory/restoration/surcharge objects inferred by human title.

### External Economy

Includes:

- trade;
- FX;
- stabilization reserve pool;
- reserve restitution;
- governance arbitrage.

Representative IDs:
- FX;
- trade/external-economy objects inferred by human title.

## What focus does

Focus changes only DOM presentation.

It:
- adds `ux-focused` to the body;
- adds `data-ux-focus="<system>"`;
- hides unrelated build layers;
- reveals the related historical layers and their original markers;
- dims the core beings/stage anchors rather than deleting them;
- hides the Overview summary card;
- keeps the right inspector available;
- shows a small focus hint.

The related objects remain the original DOM nodes with their original click handlers.

## Navigation bar

UX 3 adds a compact navigation bar when:
- an inspector is open; or
- a subsystem focus is active.

The breadcrumb can read:

`Overview › Stabilization System › MCP1`

Object IDs remain secondary navigation context.

The bar includes:
- Back;
- Forward;
- Overview/home.

Focus history is transient and in-memory.

It is intentionally not written to localStorage or any `nothing-state-vN` key.

## Back / Forward

The navigation history records focus changes only.

Examples:

`Overview → Stabilization System → Monetary Supervision`

Back returns to Stabilization System.

Forward returns to Monetary Supervision.

Changing navigation focus closes an open inspector first so selection never points at a hidden/unrelated subsystem.

## Escape semantics

Escape is hierarchical.

If an Overview inspector is open:
1. UX 2 closes the inspector through the original close path.
2. Focus remains.

A second Escape while no inspector is open:
1. exits the focused subsystem;
2. returns to Overview.

UX 3 checks `event.defaultPrevented` so the same Escape that UX 2 used to close an inspector cannot also collapse focus.

## Double-click shortcut

Double-clicking a selectable focused/Overview marker can enter the inferred subsystem after the object's original click path has opened its inspector.

The ordinary explicit `Focus <system>` inspector action remains the primary discoverable path.

## God View

God View remains untouched.

Entering God View:
- removes active focus;
- resets transient focus history;
- hides the focus navigation UI;
- preserves the legacy God View panel behavior from UX 2.

Returning to Overview starts at the root Overview level rather than silently restoring hidden focus state.

## Read-only authority boundary

UX 3 must not directly mutate:

- `S.*` simulation fields;
- any `nothing-state-vN`;
- localStorage;
- serial counters;
- economics;
- votes;
- conditions;
- incidents;
- crises;
- historical records.

It wraps only the already-wrapped presentation functions:
- `panel`;
- `closePanel`;

and delegates directly.

## Validation targets

1. Exact UX 3 JS parses.
2. UX 3 contains zero direct simulation/localStorage writes.
3. Stabilization focus reveals exactly its related Build 58/59 + 96–100 layers while unrelated layers remain hidden.
4. Monetary Supervision focus reveals the Build 90–96 supervisory chain.
5. External Economy focus reveals trade/FX/reserve/restitution/governance layers.
6. Original markers in revealed layers remain clickable.
7. Inspector Focus button infers the correct system from MCP, ISFB, MA, and FX examples.
8. Breadcrumb reflects Overview / focus / selected object.
9. Back/Forward restore focus history deterministically.
10. Home returns to Overview.
11. First Escape closes inspector only.
12. Second Escape exits focus.
13. God View clears focus and preserves the exact UX 2 legacy-panel path.
14. Returning from God View starts at Overview.
15. Double-click focus shortcut does not bypass original object interaction.
16. Mobile navigation remains inside the viewport.
