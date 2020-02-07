import { Exercise } from "../Exercise/Exercise";
import data from "../data.json";

export class Card {
    exercise: Exercise;
    level: number;
    enabled: boolean;

    constructor(exercise: Exercise, level: number, enabled: boolean) {
        this.exercise = exercise;
        this.level = level;
        this.enabled = enabled;
    }

    evaluate(rating: number) {
        this.level += rating;
        if (this.level < 1) {
            this.level = 1;
        }
        if (this.level > data.maximumLevel) {
            this.level = data.maximumLevel;
        }
    }
}
