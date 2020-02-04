import { ExerciseRepository } from "./Exercise/ExerciseRepository";
import { CardRepository } from "./Card/CardRepository";
import data from "./data.json";
import Vue from "vue";
import { Card } from "./Card/Card";
import { CardInitializer } from "./Card/CardInitializer";
import { SettingsManager } from "./Settings/SettingsManager";
import { CustomExerciseFactory } from "./Exercise/CustomExerciseFactory";

var exerciseRepository = new ExerciseRepository();
var cardRepository = new CardRepository(exerciseRepository);
var cardInitializer = new CardInitializer(cardRepository, exerciseRepository);
var settingsManager = new SettingsManager(cardInitializer, cardRepository, exerciseRepository);
var customExerciseFactory = new CustomExerciseFactory(exerciseRepository);

cardInitializer.initialize();

new Vue({
    el: '#app',

    data: {
        cards: cardRepository.findAll(),
        maxLevel: data.maximumLevel,
        showExerciseForm: false,
        exercise: customExerciseFactory.create('', '')
    },

    created() {
        var self = this;
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                self.closeExerciseForm();
            }
        });
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
            var confirmed = window.confirm('This will reset all settings, and remove all your custom exercises. Are you sure you want to continue?');
            if (!confirmed) {
                return;
            }

            settingsManager.resetAll();
            this.cards = cardRepository.findAll();
            this.$forceUpdate();
        },

        persistCustomExercise() {
            exerciseRepository.persist(this.exercise);
            cardInitializer.initialize();
            this.cards = cardRepository.findAll();
            this.closeExerciseForm();
        },

        deleteCustomExercise(card: Card) {
            var confirmed = window.confirm('Delete "' + card.exercise.title + '" ?');
            if (!confirmed) {
                return;
            }

            cardRepository.delete(card);
            exerciseRepository.delete(card.exercise);
            this.cards = cardRepository.findAll();
        },

        editCustomExercise(card: Card) {
            this.exercise = card.exercise;
            this.showExerciseForm = true;
        },

        closeExerciseForm() {
            this.showExerciseForm = false;
            this.exercise = customExerciseFactory.create('', '');
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
        },

        customExerciseCards: function () {
            return this.cards.filter(card => card.exercise.isCustom);
        },

        regularExerciseCards: function () {
            return this.cards.filter(card => !card.exercise.isCustom);
        }
    }
});
