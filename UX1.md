# UX 1 — Human Overview

Build 100 freezes the simulation at one hundred accumulated builds.

UX 1 changes only presentation.

The goal is to make the default screen understandable to a person without deleting, flattening, or rewriting the 100-build world.

## Default mode

The default mode is now **Overview**.

Overview:
- keeps the two core beings and the central stage visible;
- hides diagnostic statistics and long status lines from the canvas;
- hides the dense base memory/future/mail/order/law/warrant scatter;
- suppresses almost all fixed build layers;
- retains only a small set of major systems:
  - monetary authorities;
  - FX market;
  - stabilization fund;
  - stabilization board;
  - current Build 100 conditionality-capture office and live/current capture state;
- adds a compact human-readable "What matters now" card;
- shows board control, open crises, live stabilization programs, and active reality.

Nothing is removed from state.

Nothing stops running.

## God View

A persistent view switch offers:

- **Overview**
- **God View**

God View removes the presentation filters and restores the full accumulated 100-build visual system.

This preserves the original chaotic system map as an expert/debug/history view.

The user's view preference is stored separately under:

`nothing-ux-mode`

It is intentionally not part of any `nothing-state-vN` simulation record.

Using "make it forget" continues to clear simulation versions without treating a UI preference as simulation history.

A query parameter:

`?god=1`

also opens directly into God View.

## Read-only presentation contract

`human_overview.js` may read simulation state to summarize what matters now.

It must not mutate:
- simulation arrays;
- serial counters;
- economics;
- votes;
- conditions;
- crises;
- incidents;
- build state keys;
- historical records.

Its only persistent write is the separate UI preference `nothing-ux-mode`.

Its other effects are DOM-only:
- add Overview/God View controls;
- add the human summary card;
- add the overview legend;
- toggle body presentation classes;
- refresh human-readable text.

## Current-event summary

The Overview card prioritizes current Build 100 state.

Examples:
- pending conditionality motion;
- passed capture;
- deadlocked capture;
- majority no longer live;
- waiting for program/surveillance;
- surveillance below tightening threshold.

If Build 100 has no current capture, the summary falls back through:
- Build 99 governance arbitrage;
- Build 98 reserve restitution;
- Build 97 preferred recoupment;
- quiet-system fallback.

This is narrative prioritization only.

The underlying state remains authoritative.

## Major-system visibility

Overview deliberately does not attempt to reorganize all 100 build layers yet.

It uses progressive disclosure.

Visible major markers are drawn from existing layers:
- `monetaryLayer` → `.monetaryAuthority`;
- `fxLayer` → `.fxMarket`;
- `stabilizationLayer` → `.stabilizationFund`;
- `fundGovernanceLayer` → `.fundBoard`;
- `conditionalityCaptureLayer100` → office plus meaningful current capture states.

Subordinate facilities, contracts, motions, reports, historical markers, and older consequence layers remain alive but visually suppressed in Overview.

God View reveals them all.

## Existing controls remain authoritative

UX 1 does not replace object behavior.

When a visible major object is clicked, its original module click handler and original panel/action logic remain in use.

The old bottom panel remains intact for now.

A consistent right-side inspector is planned for UX 2.

## Responsive behavior

On wide screens:
- the human summary card sits at the upper right;
- the Overview/God View switch sits at the upper left;
- the central simulation remains unobstructed.

On narrower screens:
- the summary card moves to the bottom;
- the app gains bottom space so the card does not cover the stage;
- the stage scales down on small screens.

This is an initial responsive pass, not the final mobile UX.

## Validation targets

UX 1 should prove:

1. Overview is the default when no UX preference exists.
2. God View can restore the complete system without reload.
3. Switching back to Overview restores the calm presentation.
4. `?god=1` overrides the default.
5. Overview card reads live Build 100 state correctly.
6. Active Reality A/B highlighting follows `S.active`.
7. Simulation state is unchanged by mode switching.
8. Original visible-object click handlers remain callable.
9. Existing Build 100 state and action behavior still pass their exact deterministic harness.
10. CSS/JS load after Build 100 so presentation cannot alter earlier module authority.

## What UX 1 intentionally does not solve

UX 1 is the first reduction pass.

It does not yet add:
- a right-side inspector;
- subsystem focus/navigation;
- semantic zoom;
- event timeline;
- domain layers;
- search;
- causal explorer.

Those should build on top of the calmer default rather than be used to compensate for the original all-at-once rendering.
