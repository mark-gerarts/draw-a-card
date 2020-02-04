import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import { CardInitializer } from "./Card/CardInitializer";
import Vue from "vue";
import { CardSelector } from "./Card/CardSelector";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);
var cardSelector = new CardSelector(cardRepository);

cardInitializer.initialize();

new Vue({
    el: '#app',

    data: {
        finished: false,
        currentCard: cardSelector.getNextCard()
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
            this.currentCard = cardSelector.getNextCard();
        },

        skipExercise: function() {
            this.currentCard = cardSelector.getNextCard();
        }
    }
});
