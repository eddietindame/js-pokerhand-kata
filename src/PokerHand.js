export class PokerHand {

	constructor(hand) {
		let cards = hand.split(' ')
		if (cards.length !== 5) throw Errors.INVALID_HAND
		cards = cards.map(card => card.toUpperCase())

		const validFaceChars = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
		const validSuitChars = ['S', 'H', 'D', 'C']
		let formattingError = false
		cards.forEach(card => {
			if (card.length !== 2) formattingError = true
			if (!validFaceChars.includes(card[0])) formattingError = true
			if (!validSuitChars.includes(card[1])) formattingError = true
		})
		if (formattingError) throw Errors.INVALID_HAND

		const order = validFaceChars.join('')
		// Turn the faces into alphabetical chars for easy comparison
		const faces = cards.map(card => String.fromCharCode([77 - order.indexOf(card[0])])).sort()
		const suits = cards.map(card => card[1]).sort()

		this.cards = cards
		this.faces = faces
		this.suits = suits
		this.order = order
		const { rank, value } = this.rankHand()
		this.rank = rank
		this.value = value

		this.printHand()
	}

	printHand() {
		console.log({
			cards: this.cards,
			faces: this.faces,
			suits: this.suits,
			rank: this.rank,
			value: this.value
		})
	}

	rankHand() {
		function count(c, a) {
			c[a] = (c[a] || 0) + 1
			return c
		}

		const flush = this.suits[0] === this.suits[4]
		const first = this.faces[0].charCodeAt(0)
		const straight = this.faces.every((face, index) => face.charCodeAt(0) - first === index)
		const counts = this.faces.reduce(count, {})
		const duplicates = Object.values(counts).reduce(count, {})
		const value = this.faces.sort((a, b) => {
			// Counts are in reverse order - bigger is better
			const countDiff = counts[b] - counts[a]
		
			if (countDiff) return countDiff
			// If counts don't match return
			return b > a ? -1 : b === a ? 0 : 1
		}).join('')

		const rank = (
			(flush && straight && 1) ||
			(duplicates[4] && 2) ||
			(duplicates[3] && duplicates[2] && 3) ||
			(flush && 4) ||
			(straight && 5) ||
			(duplicates[3] && 6) ||
			(duplicates[2] > 1 && 7) ||
			(duplicates[2] && 8) ||
			9
		)

		return { rank, value }
	}

	compareWith(hand) {
		const { rank, value } = hand
		if (this.rank === rank) {
			if (this.value < value) return Result.WIN
			else if (this.value > value) return Result.LOSS
			else return Result.TIE
		}
		if (this.rank < rank) return Result.WIN
		if (this.rank > rank) return Result.LOSS
	}
}

export const Errors = {
	INVALID_HAND: 'Invalid hand.'
}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
}

export default PokerHand
