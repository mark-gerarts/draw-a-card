import { Exercise } from "../Model/Exercise";
import exercisesData from "../data.json";

export class ExerciseRepository {
    private exercises: Array<Exercise>;

    constructor() {
        this.exercises = exercisesData.exercises.map(data => this.parse(data));
    }

    findAll(): Array<Exercise> {
        return this.exercises;
    }

    findById(id: string): Exercise|null {
        return this.exercises.find(ex => ex.id === id) || null;
    }

    private parse(jsonInput: object): Exercise {
        return new Exercise(
            jsonInput.id,
            jsonInput.title,
            jsonInput.subtitle,
            jsonInput.detailsLink,
            jsonInput.exampleImage
        );
    }
}
