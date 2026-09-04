# Build 77

Reserve mismatch acquired an FX rebalancing desk. Build 76 can restore stabilization-fund capital in the wrong currency: a Reality A bailout may consume RA from `poolRA`, while the later compulsory assessment on Reality A is paid with the RB foreign reserves Reality A actually owns, increasing `poolRB`. Build 77 turns that mismatch into a real Build 56 foreign-exchange operation through the Interreality Stabilization Reserve Rebalancing Desk.

The desk marks the Build 58 reserve pools in RB terms using the live Build 56 `RA/RB` rate. `poolRA` is worth `poolRA × rate` RB; `poolRB` is already in RB. The live mismatch is the absolute value gap divided by total marked pool value. The desk considers the reserve mix balanced inside an 8% band.

A rebalance attempts to close half of the current marked-value gap per trade, capped at 6 RB-value and further capped by the old balance sheets that must actually settle the exchange. The desk never creates RA or RB.

If RB is overweight, the fund sells RB and buys RA. Reality B is the issuer of RB and holds RA as its Build 56 foreign reserve asset. The fund therefore returns RB to Reality B's monetary authority, retires the same amount of B's Build 55 monetary base, and receives RA out of B's actual foreign reserves. `poolRB` falls and `poolRA` rises.

If RA is overweight, the operation mirrors. The fund returns RA to Reality A's monetary authority, retires A monetary base, and receives RB out of A's actual Build 56 foreign reserves.

The executable notional is therefore capped by four things: half the pool-value gap, a 6 RB-value trade limit, the overweight pool itself, the issuing reality's available foreign reserves, and the issuing monetary authority's redeemable monetary base. A trade below the requested half-gap becomes `partial-liquidity`. If neither reserve nor monetary-base capacity is available, no trade occurs.

Every successful Build 77 trade creates a real Build 56 `FLOW#` record marked as a stabilization reserve rebalance. The returned settlement reserve also increments the existing Build 55 reserves-extinguished total. Build 77 separately tracks which native monetary base was retired and which reserve asset was drained.

Build 77 also moves the actual Build 56 market. The trade notional is translated into a deterministic price impact using current pool value as a liquidity denominator. Selling RB to buy RA raises `RA/RB`; selling RA to buy RB lowers it. The live Build 56 market's previous rate, rate, pressure, turnover, and last-move timestamp are all updated rather than shadowed in a parallel FX object.

The canonical RB-overweight harness starts with `poolRA=5`, `poolRB=15`, and `RA/RB=1.0000`. The marked mismatch is 50%. Reality B holds 12 RA of foreign reserves and has 20 RB of monetary base. Build 77 sells 5 RB for 5 RA. The fund ends at `poolRA=10`, `poolRB=10`; B foreign reserves fall 12→7; B monetary base falls 20→15; Build 55 reserves extinguished increase by 5; and `RA/RB` moves 1.0000→1.0225. Because the rate itself moved, the post-trade value mismatch is not exactly zero but falls to 1.1124845488%, well inside the 8% band.

The mirror harness starts from `poolRA=15`, `poolRB=5`. Build 77 sells 5 RA for 5 RB, drains Reality A's RB foreign reserves 12→7, retires A monetary base 20→15, and moves `RA/RB` 1.0000→0.9775. The post-trade mismatch is 1.1378002528%.

Issuer liquidity can stop the desk before the pool is balanced. With the 5/15 mismatch but only 2 RA of Reality B foreign reserves, Build 77 can sell only 2 RB and buy 2 RA. The pools become RA 7 / RB 13, the trade is `partial-liquidity`, B foreign reserves fall to zero, and 29.5917858745% mismatch remains. A separate monetary-base cap of only 1 RB lets the desk trade only 1 RB even when foreign reserves are plentiful.

Build 77 also connects the pool trade back to old FX institutions. If the new market rate moves more than 75% of a declared Build 56 peg band away from the peg, Build 77 records peg stress and opens a crisis without directly rewriting the old peg. The Build 56 autonomous layer remains responsible for its own eventual peg defense or break. The peg harness moved the market to 1.0225 against a 1.0000 peg with a 1% band and recorded one peg-stress event.

Foreign-reserve drainage also recomputes the old Build 56 reserve shares. In the reserve-currency harness, the rebalancing trade drained Reality B's RA reserve stock enough to change the market's reserve-currency designation from none to RB. Build 77 updates the actual Build 56 designation and adoption counter rather than keeping a private reserve-currency label.

The live Build 76→77 harness executes the exact committed modules together. Reality B begins with the loss-born voting majority, and Build 76 forces Reality A to pay a 10 RB replenishment assessment. That leaves the stabilization fund at RA 5 / RB 15, with A's RB foreign reserves exhausted. Build 77 then sells 5 of the newly received RB back to Reality B and takes 5 RA from B's reserve account. Final pools are RA 10 / RB 10, Reality B's foreign reserves fall 12→7, B monetary base falls 20→15, and `RA/RB` rises to 1.0225. The creditor that gained control by absorbing the first bailout therefore loses foreign reserves again when the institution converts the compulsory repayment into the currency it originally lacked.

Build 77 uses durable markers inside the Build 56 `FLOW#` record. If isolated v77 state is missing while older Build 56/58/76 state survives, the desk reconstructs its `SRX#` ledger, serial, traded-notional totals, base-retirement totals, reserve-drain totals, peg-stress count, and reserve-currency-flip count from the flow marker without rerunning the exchange. If a valid v77 trade array exists, marker recovery is disabled so an intentionally stored v77 ledger is never silently replaced.

Build 77 persists through `nothing-state-v77`, wraps the existing save/render chain, loads after `replenishment.js`, and extends forget-through-v77. It reads and selectively updates Build 55 monetary base and reserves-extinguished totals, Build 56 FX currencies/market/flows/reserve-currency state, Build 58 reserve pools, and the Build 76 institutional prerequisite. It does not reverse Build 76 assessment history, refill a reserve pool without a counterparty, or create a second FX market.

New places include `stabilization fund selling the currency it was just forced to receive`, `bailout reserve mismatch returning to the issuing central bank through the FX market`, `stabilization fund returning reserve money to its issuer for the currency it actually needed`, and `wrong-currency bailout replenishment becoming an exchange-rate trade`. `reserve_rebalance.js` passes V8 syntax validation. The exact committed-function harness covers both trade directions, reserve and monetary-base liquidity caps, peg stress, reserve-currency changes, marker reconstruction, and the live Build 76→77 sequence.
