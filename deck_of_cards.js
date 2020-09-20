/*
 * Deck of Cards Classic
 *
 * I did this a few years ago while I was practicing
 * searching, sorting, and shuffling of arrays.
 *
 * The code style is a bit different than I do today.
 * It's object oriented with a lot of 'this' but no class.
 * All the functions are proper ones not arrows.
 *
 * I was oddly writing snake_case variables at this time.
 * I tried to follow the style of Douglas Crockford in his
 * classic book JavaScript: The Good Parts.
 *
 * Michael J Salo
 * 20 Sept 2020
 */

// Establish a closure
var make_deck = function () {

    // Make sure strict mode of JS
    'use strict';

    // Set private variables
    var  suits_array = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    var values_array = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    var   deck_array = [];

    // Construct a new deck of cards
    suits_array.forEach(function (suit_name, index) {
        values_array.forEach(function (value_name, index) {
            deck_array.push(value_name + " of " + suit_name);
        });
    });

    return {
        // Return a deck object that has methods

        // Display a deck of cards in current order
        display_deck: function () {
            var this_deck = this;

            console.log(deck_array.length + " CARDS:");
            deck_array.forEach(function (card_name, index) {
                var sort_value = this_deck.compute_sort_value(card_name);
                console.log(index + ": " + sort_value + " " + card_name);
            });
            console.log("\n");
            return;
        },

        // Shuffle a deck of cards in place
        shuffle_deck: function () {
            for (var card_index = 0; card_index < deck_array.length; card_index += 1) {
                // For each card in deck

                // Choose a random card not yet chosen
                var random_index = card_index + (Math.floor(Math.random() * (deck_array.length - card_index)));

                // Swap card with the random card
                var random_value = deck_array[random_index];
                deck_array[random_index] = deck_array[card_index];
                deck_array[card_index] = random_value;
            }
            return;
        },

        // Take a card string and return object describing the card
        identify_card: function (card_string) {
            if (!card_string) {
                throw "identify_card expects a card_string";
            }
            var card_value = card_string.slice(0, card_string.indexOf(' of '));
            var card_suit  = card_string.slice(card_string.indexOf(' of ') + 4);
            var card_object =  {
                card_value: card_value,
                card_suit:  card_suit
            };
            return card_object;
        },

        // Compute an alphabetical sort value for a given card
        // Example: AA for Ace of Hearts
        compute_sort_value: function (card_string) {
            var card_object = this.identify_card(card_string);

            var card_sort = String.fromCharCode(suits_array.indexOf(card_object['card_suit']) + 65);
            card_sort += String.fromCharCode(values_array.indexOf(card_object['card_value']) + 65);

            return card_sort;
        },

        // Bubble sort
        // Compare neighboring pairs of items
        bubble_sort: function () {
            var isSorted = false;

            // Bubble sort takes multiple passes though entire array
            while (!isSorted) {
                var swapCount = 0;

                // For every neighboring pair of items
                for (var leftIndex = 0; leftIndex < deck_array.length - 1; leftIndex += 1) {
                    var rightIndex = leftIndex + 1;

                    var leftValue  = deck_array[leftIndex];
                    var rightValue = deck_array[rightIndex];

                    var leftSort  = this.compute_sort_value(leftValue);
                    var rightSort = this.compute_sort_value(rightValue);

                    // Swap to correct order
                    if (leftSort > rightSort) {
                        var swapValue = leftValue;
                        deck_array[leftIndex]  = rightValue;
                        deck_array[rightIndex] = swapValue;
                        swapCount += 1;
                    }
                }

                // If a complete pass makes no swaps, we're done
                if (swapCount === 0) {
                    isSorted = true;
                }
            }
        },

        // Selection sort
        // Find the minimum item and swap it to first position
        selection_sort: function (start_index = 0) {
            
            // Base case
            // Last card in deck
            // We are finished sorting
            if (start_index === deck_array.length-1) {
                return;
            }

            // Recursive case
            // There are more cards to sort

            // Establish the starting point
            // This is where we begin looking for a minimum
            var start_string = deck_array[start_index];
            var start_sort_value  = this.compute_sort_value(start_string);

            // Assume the start index is the minimum card            
            var minimum_index = start_index;
            var minimum_string = start_string;
            var minimum_sort_value = start_sort_value;

            // Go forward through rest of deck looking for a new minimum
            for (var this_index = minimum_index + 1; this_index < deck_array.length; this_index += 1) {
                var this_string = deck_array[this_index];
                var this_sort_value = this.compute_sort_value(this_string);

                if (this_sort_value < minimum_sort_value) {
                    // If we found a new minimum
                    minimum_index = this_index;
                    minimum_string = this_string;
                    minimum_sort_value = this_sort_value;
                }
            }

            if (minimum_sort_value < start_sort_value) {
                // If there is a new minimum
                // Swap the minimum and the start
                deck_array[minimum_index] = start_string;
                deck_array[start_index] = minimum_string;
            }

            // Increment start_index and recurse
            start_index += 1;
            this.selection_sort(start_index);
            return;
        },

        // Insertion sort
        // Look at each item and move it backwards into position
        insertion_sort: function (start_index = 0) {
            
            // Base case
            // Last card in deck
            // We are finished sorting
            if (start_index === deck_array.length) {
                return;
            }

            // Recursive case
            // There are more cards to sort

            // Establish the starting point
            // This is the item we are moving backward
            var start_string = deck_array[start_index];
            var start_sort_value  = this.compute_sort_value(start_string);

            // Move backward through deck until we find right position for this card
            insertion_loop:
            for (var this_index = start_index - 1; this_index >= 0; this_index -= 1) {
                var this_string = deck_array[this_index];
                var this_sort_value = this.compute_sort_value(this_string);

                if (start_sort_value < this_sort_value) {
                    // If we can proceed backward
                    // Swap two values
                    deck_array[this_index]   = start_string;
                    deck_array[this_index+1] = this_string;

                } else {
                    // If we went too far backward
                    // Do nothing and exit loop
                    break insertion_loop;
                }
            }

            // Increment start_index and recurse
            start_index += 1;
            this.insertion_sort(start_index);
            return;
        },

        // Quick sort
        // Divide array in half in place and sort each half
        quick_sort: function (lo_index = 0, hi_index = deck_array.length-1) {
            
            // Base case
            // Only one card
            // We're finished sorting here, return
            if (hi_index - lo_index <= 1) {
                return;
            }

            // Recursive case
            // There are cards to sort

            // Choose a pivot at median
            var pivot_index = Math.floor(lo_index + ((hi_index - lo_index) / 2));
            var pivot_string = deck_array[pivot_index];
            var pivot_sort_value = this.compute_sort_value(pivot_string);

            // Go through every card in range
            var this_string;
            var this_sort_value;
            var this_recheck = false;
            for (var this_index = lo_index; this_index <= hi_index; this_recheck || (this_index += 1)) {

                // Examine this card
                this_string = deck_array[this_index];
                this_sort_value = this.compute_sort_value(this_string);
                this_recheck = false;

                if (this_sort_value < pivot_sort_value) {
                    // If sort value is less than pivot
                    // Make sure it's before pivot

                    var move_index = this_index;
                    var move_string;
                    while (move_index > pivot_index) {
                        // While we are after the pivot
                        // Move over by swapping one by one
                        move_index -= 1;
                        move_string = deck_array[move_index];
                        deck_array[move_index] = this_string;
                        deck_array[move_index+1] = move_string;

                        // If we moved items, have to iterate over this_index again
                        this_recheck = true;

                        if (move_index === pivot_index) {
                            // If we moved over the pivot, adjust pivot index
                            pivot_index += 1;
                        }
                    }

                } else if (this_sort_value > pivot_sort_value) {
                    // If sort value is more than pivot
                    // Make sure it's after pivot

                    var move_index = this_index;
                    var move_string;
                    while (move_index < pivot_index) {
                        // While we are before the pivot
                        // Move over by swapping one by one
                        move_index += 1;
                        move_string = deck_array[move_index];
                        deck_array[move_index] = this_string;
                        deck_array[move_index-1] = move_string;

                        // If we moved items, have to iterate over this_index again
                        this_recheck = true;

                        if (move_index === pivot_index) {
                            // If we moved over the pivot, adjust pivot index
                            pivot_index -= 1;
                        }
                    }
                }
            }

            // Recurse lo and hi arrays
            this.quick_sort(lo_index, pivot_index-1);
            this.quick_sort(pivot_index+1, hi_index);
            return;
        },

        // Compare two cards for use of built in sort method
        compare_cards: function (card_a_string, card_b_string) {

            var card_a_sort = this.compute_sort_value(card_a_string).bind(this);
            var card_b_sort = this.compute_sort_value(card_b_string).bind(this);

            // Sort by sort order value in alphabetical order
            if (card_a_sort < card_b_sort) {
                return -1;
            } else if (card_a_sort > card_b_sort) {
                return 1;
            } else {
                return 0;
            }
        },

        // Sort the deck in place back to original order
        sort_deck: function (sort_method) {

            switch (sort_method) {

            // Bubble sort
            // Compare neighboring pairs of items
            case 'bubble':
                this.bubble_sort();
                break;

            // Selection sort
            // Find the lowest item and swap it to first position
            case 'selection':
                this.selection_sort();
                break;

            // Insertion sort
            // Look at each item and move it backwards into position
            case 'insertion':
                this.insertion_sort();
                break;

            // Quick sort
            // Divide array in half in place and sort each half
            case 'quick':
                this.quick_sort();
                break;

            // Default to built in array sort method
            default:
                deck_array.sort(this.compare_cards.bind(this));
                break;
            }

            return;
        },

        // Find a card in the deck
        // This is a straightforward linear search
        // Could do a binary search if it were sorted first
        find_card: function (target_string) {
            // Filter input
            target_string = target_string.toLowerCase().trim();

            for (var deck_index = 0; deck_index < deck_array.length; deck_index += 1) {
                // For each card in deck

                // Match this card against target
                var card_string = deck_array[deck_index].toLowerCase().trim();
                if (card_string === target_string) {
                    // If found return the index
                    return deck_index;
                }
            }

            // If not found return negative
            return -1;
        },

        // Draw cards from the top of deck
        draw_cards: function (n = 1) {
            // Filter input
            n = parseInt(n, 10);
            for (var i = 0; i < n; i += 1) {
                // Repeat n times
                // Draw top card
                console.log("Card " + (i+1) + ": " + deck_array[i]);
            }

            return;
        }
    }
};


var deck1 = make_deck();
deck1.display_deck();
console.log("Ace of Spades found at card number " + deck1.find_card("Ace of Spades"));

deck1.shuffle_deck();
deck1.display_deck();
console.log("Ace of Spades found at card number " + deck1.find_card("Ace of Spades"));

deck1.sort_deck('quick');
deck1.display_deck();
console.log("Ace of Spades found at card number " + deck1.find_card("Ace of Spades"));
