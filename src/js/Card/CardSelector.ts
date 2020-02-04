import { CardRepository } from "./CardRepository";
import { Card } from "./Card";
import data from "../data.json";
import { ArrayUtils } from "../Util/ArrayUtils";

export class CardSelector {
    private cardRepository: CardRepository;
    private seenExerciseIds: Array<String>;

    constructor(cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
        this.seenExerciseIds = [];
    }

    getNextCard(): Card|null {
        var allCards = this.cardRepository.findAllEnabled();
        if (allCards.length === 0) {
            return null;
        }

        // Filter out cards we already got this session to prevent duplicates.
        var unseenCards = allCards.filter(card => {
            return !this.seenExerciseIds.includes(card.exercise.id);
        });
        // If this results in an empty array, start over again.
        if (unseenCards.length === 0) {
            this.seenExerciseIds = [];
            unseenCards = allCards;
        }


        // We lazily create a weighted distribution based on the card's level,
        // and pick a random element from that.
        var maximumLevel = data.maximumLevel;
        var distribution = unseenCards.map(card => {
            var numberOfOccurences = maximumLevel - card.level + 1;
            return Array(numberOfOccurences).fill(card);
        });
        var flattenedDistribution = ArrayUtils.flatten<Card>(distribution);

        var selectedCard = ArrayUtils.randomElement<Card>(flattenedDistribution);
        this.seenExerciseIds.push(selectedCard.exercise.id);

        return selectedCard;
    }
}
