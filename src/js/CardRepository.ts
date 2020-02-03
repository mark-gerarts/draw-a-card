import { Card } from "./Card";
import { ExerciseRepository } from "./ExerciseRepository";

export class CardRepository {
    private exerciseRepository: ExerciseRepository;
    private cards: { [exerciseId: string]: Card; };

    constructor(exerciseRepository: ExerciseRepository) {
        this.exerciseRepository = exerciseRepository;
        this.init();
    }

    persist(card: Card) {
        this.cards[card.exercise.id] = card;
        var serializedCards = Object.values(this.cards).map(card => this.normalize(card));
        localStorage.setItem('cards', JSON.stringify(serializedCards));
    }

    findByExerciseId(exerciseId: string): Card|null {
        return this.cards[exerciseId] || null;
    }

    private init() {
        this.cards = {};
        var cardData = localStorage.getItem('cards') || "[]";
        var cards = JSON.parse(cardData);
        cards = cards.map(card => this.denormalize(card));
        cards.forEach(card => {
            this.cards[card.exercise.id] = card;
        });
    }

    private normalize(card: Card): Object {
        return {
            exerciseId: card.exercise.id,
            enabled: card.enabled,
            level: card.level
        };
    }

    private denormalize(data: Object): Card {
        var exercise = this.exerciseRepository.findById(data.exerciseId);

        return new Card(exercise, data.level, data.enabled);
    }
}
