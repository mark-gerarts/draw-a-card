import { Exercise } from "./Exercise";
import exercisesData from "../data.json";

export class ExerciseRepository {
    private exercises: { [exerciseId: string]: Exercise; };

    constructor() {
        this.exercises = {};

        var exercises = exercisesData.exercises;

        var customExercisesData = localStorage.getItem('customExercises') || '[]';
        var customExercises = JSON.parse(customExercisesData);
        Array.prototype.push.apply(exercises, customExercises);

        exercises
            .map(data => this.denormalize(data))
            .forEach(exercise => {
                this.exercises[exercise.id] = exercise;
            });
    }

    findAll(): Array<Exercise> {
        return Object.values(this.exercises);
    }

    findById(id: string): Exercise|null {
        return this.exercises[id] || null;
    }

    findAllCustomExercises(): Array<Exercise> {
        return this.findAll().filter(exercise => exercise.isCustom);
    }

    getNextCustomId(): string {
        var allCustomIds = this.findAllCustomExercises()
            .map(exercise => parseInt(exercise.id));

        if (allCustomIds.length === 0) {
            return '1';
        }

        var nextId = Math.max.apply(Math, allCustomIds) + 1;

        return nextId.toString();
    }

    delete(exercise: Exercise) {
        if (!exercise.isCustom) {
            return;
        }

        delete this.exercises[exercise.id];
        this.persistAll();
    }

    deleteAll() {
        this.findAllCustomExercises().forEach(exercise => {
            this.delete(exercise);
        })
    }

    persist(exercise: Exercise) {
        // It only makes sense to persist custom exercises.
        if (!exercise.isCustom) {
            return;
        }

        this.exercises[exercise.id] = exercise;
        this.persistAll();
    }

    private persistAll() {
        var data = this.findAllCustomExercises().map(this.normalize);
        localStorage.setItem('customExercises', JSON.stringify(data));
    }

    private denormalize(jsonInput: object): Exercise {
        return new Exercise(
            jsonInput.id,
            jsonInput.title,
            jsonInput.subtitle,
            jsonInput.detailsLink,
            jsonInput.exampleImage,
            jsonInput.isCustom || false
        );
    }

    private normalize(exercise: Exercise): Object {
        return {
            id: exercise.id,
            title: exercise.title,
            subtitle: exercise.subtitle,
            exampleImage: exercise.image,
            isCustom: exercise.isCustom
        };
    }
}
