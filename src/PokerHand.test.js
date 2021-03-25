import PokerHand, { Result, Errors } from './PokerHand.js'

describe('PokerHand', () => {

	describe('formatting and hand size', () => {

		it('cards can be any case', () => {
			let err

			try { new PokerHand('aC 4S 5S 8c ah') }
			catch (error) { err = error }

			expect(err).toBe(undefined)
		})

		it('cards must be of correct format', () => {
			let err1, err2, err3

			try { new PokerHand('AC 4S 5S 8C AHearts') }
			catch (error) { err1 = error }

			try { new PokerHand('AC 4S5S 8C AH') }
			catch (error) { err2 = error }

			try { new PokerHand('!D po 45 @£ ZQ') }
			catch (error) { err3 = error }

			expect(err1).toBe(Errors.INVALID_HAND)
			expect(err2).toBe(Errors.INVALID_HAND)
			expect(err3).toBe(Errors.INVALID_HAND)
		})

		it('hand must have 5 cards', () => {
			let err1, err2

			try { new PokerHand('AC 4S 5S 8C') }
			catch (error) { err1 = error }

			try { new PokerHand('AC 4S 5S 8C AH 2D') }
			catch (error) { err2 = error }

			expect(err1).toBe(Errors.INVALID_HAND)
			expect(err2).toBe(Errors.INVALID_HAND)
		})
	})

	describe('compareWith()', () => {

		it('ties', () => {
			const hand1 = new PokerHand('AC 4S 5S 8C AH')
			const hand2 = new PokerHand('4S 5S 8C AS AD')

			expect(hand1.compareWith(hand2)).toBe(Result.TIE)
		})
	})
})
