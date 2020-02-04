import { CardInitializer } from "../Card/CardInitializer";
import { CardRepository } from "../Card/CardRepository";

export class SettingsManager {
    private cardInitializer: CardInitializer;
    private cardRepository: CardRepository;

    constructor(cardInitializer: CardInitializer, cardRepository: CardRepository) {
        this.cardInitializer = cardInitializer;
        this.cardRepository = cardRepository;
    }

    resetAll() {
        this.cardRepository.deleteAll();
        this.cardInitializer.initialize();
    }
}
