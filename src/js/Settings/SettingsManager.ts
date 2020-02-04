import { CardInitializer } from "../Card/CardInitializer";
import { CardRepository } from "../Card/CardRepository";
import { ExerciseRepository } from "../Exercise/ExerciseRepository";

export class SettingsManager {
    private cardInitializer: CardInitializer;
    private cardRepository: CardRepository;
    private exerciseRepository: ExerciseRepository;

    constructor(
        cardInitializer: CardInitializer,
        cardRepository: CardRepository,
        exerciseRepository: ExerciseRepository
    ) {
        this.cardInitializer = cardInitializer;
        this.cardRepository = cardRepository;
        this.exerciseRepository = exerciseRepository;
    }

    resetAll() {
        this.cardRepository.deleteAll();
        this.exerciseRepository.deleteAll();
        this.cardInitializer.initialize();
    }
}
