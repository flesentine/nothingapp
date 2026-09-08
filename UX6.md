# UX 6 — Action Palette

UX 6 builds on Human Overview, Right Inspector, Focus + Navigation, Semantic Zoom, and Recent Changes.

The simulation remains frozen at Build 100.

The remaining interaction problem is procedural:

**What can I do now?**

Overview intentionally hides the accumulated raw `#app > .controls` button wall. UX 2 already exposes actions for a selected object, but there is no human-sized entry point for the many original global/module controls.

UX 6 adds one.

## Core rule

**The palette never reimplements an action.**

It discovers the existing buttons under:

`#app > .controls > button`

and creates presentation-only proxy buttons.

Choosing a proxy calls the original button's native `.click()` path.

That means the historical module remains authoritative for:
- validation;
- state mutations;
- serial allocation;
- persistence;
- rendering;
- panels;
- follow-up actions.

## Entry points

Overview adds an **Actions** button to the existing UX mode bar.

Keyboard shortcut:
- macOS: Command-K;
- Windows/Linux: Ctrl-K.

The shortcut is intercepted only while Overview is active. God View keeps normal browser behavior.

## Search

The palette contains one search field.

Search matches:
- original action text;
- original button ID;
- presentation category.

No simulation index is created and no state is copied.

## Grouping

Actions are grouped heuristically from their existing button ID/text into:
- Stabilization & governance;
- Monetary supervision;
- External economy & markets;
- Institutions & civic stack;
- System.

Grouping is presentation-only.

Classifier precedence is intentionally conservative: generic `funding` / `novation` / collateral-chain controls belong to Monetary Supervision, while stabilization remains keyed by explicit stabilization/board/quota/governance concepts. This avoids treating controls such as funding novation or funding cross-default as stabilization merely because their label contains the letters `fund`.

When a UX 3 Focus is active, the matching category sorts first and is marked **current focus**. The palette does not hide actions outside the focus.

## Availability

An original disabled button produces a disabled proxy.

Buttons that are explicitly `hidden`, have inline `display:none`, or have no text are not mirrored.

The fact that the parent controls container is hidden by Overview is intentionally ignored; that is the raw button wall UX 6 is replacing.

## Destructive action guard

The existing **make it forget** control remains authoritative.

UX 6 does not call storage or state APIs itself.

Because the action is destructive, its proxy requires a second deliberate click:
1. choose the action;
2. choose **Confirm · make it forget**.

The second click dispatches the original button.

## Keyboard and modal focus

Actions is a true modal presentation surface while open.

- the closed palette is `aria-hidden=true` and `inert`, so its search/actions cannot remain in the tab order;
- opening removes `inert`, clears `aria-hidden`, and focuses search;
- Tab and Shift-Tab are trapped inside the open palette;
- Escape closes Actions before lower Focus navigation receives the key;
- a user-initiated close restores focus to the Actions toggle when focus was inside the palette;
- a source-action or original-panel handoff first blurs palette focus, closes without restoring the toggle, then lets the original UI path own focus.

## Surface hierarchy

Opening Actions:
- closes Recent Changes if open;
- closes the Inspector if open;
- leaves Focus and Semantic Zoom unchanged.

Opening an original object panel closes Actions first.

Opening Recent Changes while Actions is open also closes Actions.

Escape closes Actions before lower navigation layers receive the key.

## Refresh model

The palette does not scan the hidden button wall on ordinary closed-state `renderAll()` calls.

While open:
- a wrapped `renderAll()` schedules a lightweight proxy refresh;
- mutations to the original controls container schedule a refresh;
- Focus/detail changes update context/group ordering.

## God View

Actions is an Overview tool.

Entering God View:
- closes the palette;
- hides the Actions control;
- leaves the raw historical God View interface unchanged.

## Read-only authority boundary

UX 6 directly mutates only transient DOM/UI state:
- palette open/closed;
- search text;
- pending destructive confirmation;
- proxy DOM.

UX 6 has:
- zero direct `S.*` assignments;
- zero `nothing-state-vN` writes;
- zero `localStorage` writes.

It wraps:
- `renderAll`;
- `panel`;

and delegates to the exact previous functions with `apply(this,args)`.

## Validation targets

1. Exact UX 6 JS parses.
2. UX 6 has zero direct simulation/localStorage writes.
3. Actions is available in Overview and hidden in God View.
4. Command/Ctrl-K opens/closes only in Overview.
5. Palette discovers existing direct child controls dynamically.
6. Search matches labels, IDs, and categories.
7. Focus category sorts first without filtering other actions.
8. Disabled source controls create disabled proxies.
9. Ordinary proxy action dispatches exactly one click to the original control.
10. Destructive reset requires two proxy clicks and then dispatches exactly one original click.
11. Opening Actions closes Recent and Inspector without changing Focus/zoom.
12. Opening an original panel closes Actions.
13. Escape closes Actions without also exiting Focus.
14. Closed palette adds no full control scan to ordinary `renderAll()`.
15. Added/disabled original controls refresh while the palette is open.
16. Mobile palette remains inside the viewport.
17. Console/page errors remain zero.


## Pre-PR qualification

Exact current artifacts:
- `action_palette.js` Git blob: `48bde35934dc20821fbd789d5d1ee17a5f11d234`;
- `action_palette.css` Git blob: `2f998a4d87efd84eadfb664e43ff6fb6359d7251`.

Code audit:
- JavaScript syntax: PASS;
- direct `S.*` assignments: 0;
- `nothing-state-vN` references/writes: 0;
- `localStorage.setItem` writes: 0;
- source execution remains one native `source.click()` path;
- `renderAll` and `panel` delegate with `apply(this,args)`;
- closed `renderAll()` scheduling returns before action collection.

Fresh Chromium qualification executed the exact hash-verified JS/CSS above in a production-shaped UX 1–5 DOM/control fixture.

Verified:
- closed dialog is hidden + inert;
- opening closes Recent and Inspector exactly once;
- search receives focus;
- hidden source buttons are excluded;
- disabled source controls remain disabled;
- active Monetary Supervision Focus category sorts first;
- search filters labels/IDs/categories;
- a normal proxy dispatches the original source exactly once;
- destructive reset dispatches zero source clicks on first selection and exactly one after confirmation;
- Ctrl/Cmd-K is intercepted in Overview and left untouched in God View;
- Escape closes Actions only and restores toggle focus;
- repeated Tab / Shift-Tab remains inside the modal;
- programmatic/original-panel handoff closes without leaving hidden palette focus;
- 100 closed-palette `renderAll()` calls perform zero source-control scans and preserve the wrapped return value;
- newly added source controls appear while open;
- source disabled-state changes propagate while open;
- God View closes/hides Actions;
- 390×844 mobile palette stays inside the viewport;
- desktop→mobile responsive transition no longer introduces horizontal overflow;
- console errors: 0;
- page errors: 0.

Environment qualification:
- repository network/file navigation is blocked from the local Chromium sandbox;
- therefore this is not represented as a live branch URL run;
- the UX 6 JS and CSS were fetched from GitHub, independently Git-blob-hash verified, then executed unchanged in Chromium against the production-shaped fixture.
