# Build 79

Sterilization acquired a carry trade. Build 78 recreates domestic settlement liquidity after Build 77 has already transferred foreign reserves out of the issuing reality and moved the exchange rate. That replacement liquidity lands on real Build 55 borrowers. Build 79 lets those borrowers deploy most of the temporary central-bank money into the same FX direction that produced the sterilization in the first place.

The Interreality Sterilization Carry Desk can open one carry position against each active Build 78 sterilization facility. A facility must still be active, retain positive principal, and remain linked to its source Build 77 reserve-rebalancing trade.

The carry limit is 90% of both current facility principal and original Build 78 issued principal, capped at 4.5 domestic units and by the borrower's actual current cash. Opening the trade removes that domestic cash from the real Build 55 borrower. It does not leave the sterilization reserves sitting in both the borrower and the carry ledger.

Direction follows the issuer. A Reality B sterilization facility is RB funding. Build 79 spends RB to buy RA. A Reality A facility spends RA to buy RB. The foreign asset is held in a Build 79 position and marked continuously against the actual Build 56 `RA/RB` market.

The exchange rate convention remains the old Build 56 convention: `RA/RB` is RB per RA. A B-side position therefore receives `domestic RB / rate` RA. An A-side position receives `domestic RA × rate` RB. Mark-to-market converts the foreign asset back into the borrower's domestic currency using the current live rate.

Opening the carry moves the actual Build 56 market further in the same direction as the Build 77/78 policy sequence. B borrowing RB and buying RA pushes `RA/RB` higher. A borrowing RA and buying RB pushes it lower. The desk updates the real market's previous rate, rate, pressure, turnover, and last-move timestamp.

Closing the carry reverses the transaction. The foreign position is sold back into the borrower's domestic currency, actual borrower cash increases by current marked value, and the Build 56 market receives an opposite-direction impulse. Build 79 records realized profit or loss but does not repay the Build 55 facility itself. The old Build 55 lifecycle remains authoritative over repayment.

The canonical B-side harness begins immediately after the exact Build 77→78 chain. Build 78 has left Reality B monetary base at 19, outstanding credit at 4, the dealer at 14 capital, and `RA/RB` at 1.0286006837. Build 79 deploys 3.6 RB, reducing dealer capital 14→10.4 and acquiring 3.4999004543 RA. The carry's own demand moves `RA/RB` to 1.0336561099. Immediate marked value is 3.6176934885 RB, an unrealized gain of about 0.0176934885 or 0.49%.

The mirrored A-side harness starts at `RA/RB=0.9710`. The borrower deploys 3.6 RA and acquires 3.4956 RB. The carry pushes the rate lower to 0.9662988537. Immediate domestic marked value is 3.6175143813 RA, again positive because the funded trade amplified its own entry direction.

A favorable-close harness opens the normal B carry and then marks the market at 1.10 before unwind. The position returns 3.8498904997 RB against 3.6 deployed, realizes about +0.2498904997, raises borrower cash from 10.4 to 14.2498904997, and the closing FX sale pushes the rate back down to 1.0943190640.

An adverse open-position harness marks the B carry at 0.82. Domestic value falls to 2.8699183725, unrealized P/L becomes -0.7300816275, and return is about -20.28%. Build 79 records a loss event once an open carry loses at least 15%.

The near-maturity rollover harness uses a solvent dealer with 5 domestic cash after Build 78. Opening a 3.6 carry leaves only 1.4. With 4.0 facility principal and maturity inside 15 seconds, Build 79 marks the position `rollover-risk` because cash is below 75% of facility principal.

The exact old Build 55 maturity harness then takes that same state. The facility has 4.0 principal, dealer cash is 1.4, and maturity has arrived. Exact committed Build 55 `accrue()` sees cash below the 75% repayment threshold, keeps the facility `active`, extends maturity by another minute, accrues roughly 0.008 interest, reduces monetary-authority independence from 0.82 to 0.81, and credibility from 0.76 to 0.752. Build 79 therefore does not fake rollover risk: the old lender-of-last-resort code actually evergreens the carry-funded sterilization loan.

If old Build 55 later monetizes the funding facility while the carry remains open, Build 79 changes the position to `open-permanent-money` and records a crisis. The currency bet is then funded by money that began as temporary sterilization credit but became a permanent monetary holding. If Build 55 repays the facility from other cash while the FX position remains open, Build 79 labels the position `open-unlevered` rather than deleting the historical carry.

The full exact Build 77→78→79 harness is one continuous policy loop. Build 77 changes the stabilization fund from 5 RA / 15 RB to 10 / 10, drains B foreign reserves 12→7, retires B monetary base 20→15, and moves `RA/RB` 1.0000→1.0225. Build 78 issues 4.0 collateralized sterilization credit, restoring base to 19, outstanding credit to 4, dealer capital to 14, and moving `RA/RB` to 1.0286006837. Build 79 then deploys 3.6 of that newly issued liquidity into RA, reduces dealer cash to 10.4, holds 3.4999004543 RA, and moves `RA/RB` again to 1.0336561099. The central bank's monetary offset therefore becomes private funding for the same exchange-rate move it was reacting to.

Build 79 uses the Build 55 facility itself as the durable recovery marker. The facility stores carry ID, deployed domestic cash, foreign units, entry rate, FX impulse, status, and recorded rollover/permanent-money/loss flags. If isolated v79 state is missing while the older Build 55/56/78 state survives, Build 79 reconstructs the position and aggregate counters from those markers without subtracting borrower cash or moving FX again. The recovery harness preserves borrower cash at 1.4 and `RA/RB` at 1.0336561099 while rebuilding the open rollover-risk position and its FX-impulse total.

Build 79 persists through `nothing-state-v79`, wraps the existing save/render chain, loads after `monetary_sterilization.js`, and extends forget-through-v79. It reads and selectively updates real Build 55 borrower cash/facility markers and the real Build 56 market, while keeping Build 77 reserve transfers and Build 78 facility issuance historically intact.

New places include `borrowed sterilization reserves chasing the exchange-rate move that created them`, `temporary central-bank money becoming a currency bet before repayment`, `borrower using central-bank sterilization money to chase the central bank FX move`, and `collateralized lender-of-last-resort credit becoming carry-trade funding`. `sterilization_carry.js` passes V8 syntax validation. Exact committed-function tests cover B/A carry directions, profitable unwind, adverse mark, rollover risk, permanent-money carry, durable marker reconstruction, the full Build 77→78→79 chain, and exact old Build 55 evergreen behavior.
