import { CardRepository } from "./CardRepository";
import { ExerciseRepository } from "../Exercise/ExerciseRepository";
import { Card } from "./Card";

export class CardInitializer {
    private cardRepository: CardRepository;
    private exerciseRepository: ExerciseRepository;

    constructor(cardRepository: CardRepository, exerciseRepository: ExerciseRepository) {
        this.cardRepository = cardRepository;
        this.exerciseRepository = exerciseRepository;
    }

    initialize() {
        var defaultCards = this.getAllDefaultCards();

        // Check if we need to add new exercises.
        defaultCards.forEach(card => {
            if (!this.cardRepository.exists(card.exercise.id)) {
                this.cardRepository.persist(card);
            }
        });
    }

    private getAllDefaultCards() {
        const defaultLevel = 1;
        const defaultStatus = true;
        const allExercises = this.exerciseRepository.findAll();

        return allExercises.map(exercise => {
            return new Card(exercise, defaultLevel, defaultStatus);
        });
    }
}
