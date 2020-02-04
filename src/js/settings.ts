import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import data from "./data.json";
import Vue from "vue";
import { Card } from "./Card/Card";
import { CardInitializer } from "./Card/CardInitializer";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);

cardInitializer.initialize();

new Vue({
    el: '#app',

    data: {
        cards: cardRepository.findAll(),
        maxLevel: data.maximumLevel,
        enableAllValue: false
    },

    methods: {
        setLevel: function(card: Card, level: number) {
            card.level = level;
            cardRepository.persist(card);
        },

        persist: function(card: Card) {
            cardRepository.persist(card);
        },

        selectAll: function() {

        }
    },

    computed: {
        areAllCardsEnabled: {
            get: function() {
                return cardRepository.findAll().every(card => card.enabled);
            },

            set: function (newValue: boolean) {
                var allCards = cardRepository.findAll();
                allCards.forEach(card => {
                    card.enabled = newValue;
                    cardRepository.persist(card);
                });
            }
        }
    }
});
