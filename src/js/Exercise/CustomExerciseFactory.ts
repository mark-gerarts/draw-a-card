import { Exercise } from "./Exercise";
import { ExerciseRepository } from "./ExerciseRepository";

export class CustomExerciseFactory {

    private exerciseRepository: ExerciseRepository;

    constructor(exerciseRepository: ExerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    create (title: string, imageLink: string) {
        var id = this.exerciseRepository.getNextCustomId();

        return new Exercise(id, title, 'Custom Exercise', '', imageLink, true);
    }
}
