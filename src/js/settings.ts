import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import data from "./data.json";
import Vue from "vue";
import { Card } from "./Card/Card";
import { CardInitializer } from "./Card/CardInitializer";
import { SettingsManager } from "./Settings/SettingsManager";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);
var settingsManager = new SettingsManager(cardInitializer, cardRepository);

cardInitializer.initialize();

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
        },

        resetAll: function() {
            var confirmed = window.confirm('This will reset all settings, are you sure you want to continue?');
            if (!confirmed) {
                return;
            }

            settingsManager.resetAll();
            this.cards = cardRepository.findAll();
            this.$forceUpdate();
        }
    },

    computed: {
        areAllCardsEnabled: {
            get: function() {
                return this.cards.every(card => card.enabled);
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
