import { ExerciseRepository } from "./Repository/ExerciseRepository";
import { CardRepository } from "./Repository/CardRepository";
import { CardInitializer } from "./CardInitializer";
import Vue from "vue";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);

cardInitializer.initialize();

var app = new Vue({
    el: '#app',
    data: {
        currentCard: cardRepository.findRandom()
    }
});
