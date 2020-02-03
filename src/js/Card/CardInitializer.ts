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
        const defaultLevel = 1;
        const defaultStatus = true;
        const allExercises = this.exerciseRepository.findAll();

        allExercises.forEach(exercise => {
            var card = new Card(exercise, defaultLevel, defaultStatus);
            this.cardRepository.persist(card);
        });
    }
}
