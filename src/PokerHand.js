export class PokerHand {

	constructor(hand) {
		const cards = hand.split(' ')
		if (cards.length !== 5) throw Errors.INVALID_HAND

		const faceChars = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
		const faceCharsLowerCase = faceChars.map(char => char.toLowerCase())
		const suitChars = ['s', 'h', 'd', 'c']
		let formattingError = false
		cards.forEach(card => {
			if (card.length !== 2) formattingError = true
			if (!faceCharsLowerCase.includes(card[0].toLowerCase())) formattingError = true
			if (!suitChars.includes(card[1].toLowerCase())) formattingError = true
		})
		if (formattingError) throw Errors.INVALID_HAND

		this.cards = cards

		this.printHand()
	}

	printHand() {
		console.log({
			cards: this.cards
		})
	}

	compareWith() {
		return Result.TIE
	}

}

export const Errors = {
	INVALID_HAND: 'Invalid hand'
}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
}

export default PokerHand
