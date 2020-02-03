import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import data from "./data.json";
import Vue from "vue";
import { Card } from "./Card/Card";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);

new Vue({
    el: '#app',

    data: {
        cards: cardRepository.findAll(),
        maxLevel: data.maximumLevel
    },

    methods: {
        setLevel: function(card: Card, level: number) {
            card.level = level;
            cardRepository.persist(card);
        },

        persist: function(card: Card) {
            cardRepository.persist(card);
        }
    }
});
