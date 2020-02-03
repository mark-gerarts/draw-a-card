import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import { CardInitializer } from "./Card/CardInitializer";
import Vue from "vue";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);

cardInitializer.initialize();

new Vue({
    el: '#app',

    data: {
        finished: false,
        currentCard: cardRepository.findRandom()
    },

    methods: {
        evaluateCard: function (rating: number) {
            if (!this.currentCard) {
                return;
            }

            this.currentCard.evaluate(rating);
            cardRepository.persist(this.currentCard);
            this.finished = true;
        },

        reset: function() {
            this.finished = false;
            this.currentCard = cardRepository.findRandom();
        }
    }
});
