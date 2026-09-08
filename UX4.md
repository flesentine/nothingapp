# UX 4 — Semantic Zoom

UX 4 builds on the merged Human Overview, Right Inspector, and Focus + Navigation layers.

The simulation remains frozen at Build 100.

UX 4 attacks the remaining information-density problem directly.

It does not introduce a new geometric camera.

The accumulated app uses many independent fixed full-screen layers positioned in viewport percentages. Scaling those historical layers would risk changing their geometry and click relationships.

Instead, UX 4 implements **semantic zoom**: increasing detail reveals finer classes of existing objects while leaving their original positions untouched.

## Three levels

### Systems

The calmest level.

Visible semantic roots include:
- monetary authorities;
- FX market;
- trade account;
- stabilization fund;
- stabilization board;
- the currently consequential Build 100 capture state already surfaced by UX 1.

Most labels are suppressed.

Systems is the default root Overview level.

### Institutions

Reveals system roots plus institutional structure such as:
- currencies;
- liquidity facilities;
- stabilization programs;
- fund directors;
- Builds 90–100 office/register nodes.

Individual records remain hidden.

Entering a UX 3 subsystem Focus from Systems automatically advances to Institutions.

### Records

Reveals the individual accumulated records inside the currently relevant layers:
- calls;
- contracts;
- invoices;
- debt records;
- reviews;
- motions;
- surveillance reports;
- remediation/exception/capital/restoration/surcharge records;
- recapitalization;
- preferred-recoupment claims/payments;
- restitution;
- governance-arbitrage;
- conditionality-capture records.

Labels become available with deliberately lower opacity than system/institution labels.

## Classification

UX 4 classifies the existing marker DOM nodes.

It never changes old source modules.

Each direct layer marker receives one presentation-only attribute:

`data-ux-detail="system|institution|record"`

Classification comes from the existing class vocabulary.

### System classes

- `monetaryAuthority`
- `fxMarket`
- `tradeAccount`
- `stabilizationFund`
- `fundBoard`

### Institution classes

- `fxCurrency`
- `liquidityFacility`
- `stabilizationProgram`
- `fundDirector`
- any historical class ending in `Office<build-number>`

Anything else in the accumulated layer stack is a record.

## Dynamic re-render compatibility

Many historical modules clear and recreate marker nodes during their own render/timer cycles.

UX 4 therefore observes DOM child additions and classifies newly inserted markers.

The marker observer watches child-list changes, not presentation attributes UX 4 writes.

It ignores unrelated UI additions and schedules reclassification only when a historical `*Layer` or a direct marker inside one is added.

That avoids a self-triggering attribute loop and prevents inspector/navigation DOM churn from causing needless full marker scans.

A lightweight queued full classification pass then lets rebuilt layers settle into the correct tier.

## Root Overview

Root Overview stays intentionally bounded.

Increasing detail does **not** expose all 100 builds at once.

Institutions/Records at the root reveal only the current financial/governance family:
- monetary;
- FX;
- trade;
- stabilization;
- fund governance;
- Build 96 supervisory recapitalization;
- Build 97 preferred recoupment;
- Build 98 reserve restitution;
- Build 99 governance arbitrage;
- Build 100 conditionality capture.

Older supervisory detail remains available through UX 3 Monetary Supervision Focus.

God View remains the only all-build, all-layer view.

## Focus interaction

UX 3 decides which layers belong to a subsystem.

UX 4 decides how deep to look inside those already-selected layers.

Examples:

`Focus Stabilization System + Institutions`

shows the stabilization/fund/governance offices and institutional structure, but not every individual record.

`Focus Stabilization System + Records`

reveals the individual MOT / SURV / RRA / GAR / MCP records in those same related layers.

## Automatic focus depth

Root Overview begins at Systems.

If the user enters a subsystem Focus while still at Systems:
- UX 4 automatically moves to Institutions.

This prevents Focus from looking empty while still avoiding the full record explosion.

If the user is already at Records, changing focus preserves Records.

Leaving focus returns the root Overview to Systems.

Entering God View resets semantic zoom to Systems so returning to Overview is calm.

## Controls

UX 4 appends a compact detail control inside the existing UX mode bar:

`−  Systems/Institutions/Records  +`

No new toolbar is added.

Keyboard shortcuts:
- `[` = less detail;
- `]` = more detail.

The shortcuts are disabled while typing into form controls and ignore modified key combinations.


## Hit-testing safety

Semantic visibility and interaction must agree.

Older UX 1/UX 3 CSS contains ID-specific `!important` visibility rules, so UX 4 uses ID-specific `:is(...)` selectors rather than relying on generic layer selectors.

Every semantic marker is then covered by a default no-hit guard.

Explicit root/focus allowlists re-enable pointer events only for markers inside the layer family that is actually visible at the current semantic level.

This prevents opacity-zero historical layers from leaving invisible clickable children over the canvas.

## Labels

Label visibility follows semantic importance.

Systems:
- system labels only;
- current Build 100 consequence and selected-object labels remain visible.

Institutions:
- system labels stronger;
- institution labels quieter;
- record labels hidden.

Records:
- all labels can appear;
- record labels use the lowest opacity;
- the selected object label remains strongest.

## Read-only presentation boundary

UX 4 must not directly mutate:
- `S.*`;
- any `nothing-state-vN`;
- localStorage;
- serials;
- balances;
- votes;
- conditions;
- incidents;
- crises;
- historical records.

Its only state is:
- the transient in-memory semantic level;
- `body.dataset.uxZoom`;
- `data-ux-detail` attributes on marker DOM nodes.

## God View

God View ignores semantic zoom.

The detail control hides in God View.

All historical objects/labels remain governed by the original accumulated CSS and UX 2 God View behavior.

Returning to Overview starts at Systems.

## Validation targets

1. Exact UX 4 JS parses.
2. UX 4 has zero direct simulation/localStorage writes.
3. Existing major markers classify as System.
4. Offices/programs/directors/currencies/facilities classify as Institution.
5. MOT/GAR/RRA/MCP and other individual markers classify as Record.
6. Newly added/re-rendered markers are classified automatically.
7. Root Overview defaults to Systems.
8. Root Institutions exposes only current financial/governance layers, not the full 100-build stack.
9. Root Records exposes records only inside that same bounded family.
10. Entering Focus from Systems advances to Institutions.
11. Records level is preserved while changing between focused subsystems.
12. Leaving Focus returns to Systems.
13. God View resets semantic level to Systems and hides the detail control.
14. System/Institution/Record label opacity follows the semantic tier.
15. Selected/current consequential markers remain visible even at Systems. The active Build 100 capture also remains pinned through Institutions so increasing detail never makes the current important event disappear.
16. Original marker click handlers remain authoritative.
17. Keyboard detail shortcuts do not fire inside form controls.
18. Mobile mode-bar controls remain usable.
