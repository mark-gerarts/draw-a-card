import { Exercise } from "./Exercise";

export class Card {
    exercise: Exercise;
    level: number;
    enabled: boolean;

    constructor(exercise: Exercise, level: number, enabled: boolean) {
        this.exercise = exercise;
        this.level = level;
        this.enabled = enabled;
    }
}
