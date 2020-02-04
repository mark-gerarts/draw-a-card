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
        // We initialized before.
        if (this.cardRepository.findAll().length > 0) {
            return;
        }

        const defaultLevel = 1;
        const defaultStatus = true;
        const allExercises = this.exerciseRepository.findAll();

        allExercises.forEach(exercise => {
            var card = new Card(exercise, defaultLevel, defaultStatus);
            this.cardRepository.persist(card);
        });
    }
}
