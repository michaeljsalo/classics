/*
 * This was a function to permutate string representations of a phone number.
 * I found this in an old Java textbook and adapted to JavaScript.
 * I wouldn't choose to write in this snake_case style anymore.
 * The test case is 1-800-FLOWERS
 * 
 * Michael J Salo
 * 4 Oct 2020
 */

var permutate_string = function (mystring) {

    var numbers_array = [
        null,             // 0
        null,             // 1
        ["A", "B", "C"],  // 2
        ["D", "E", "F"],  // 3
        ["G", "H", "I"],  // 4
        ["J", "K", "L"],  // 5
        ["M", "N", "O"],  // 6
        ["P", "R", "S"],  // 7
        ["T", "U", "V"],  // 8
        ["W", "X", "Y"]   // 9
    ];

    var permutate_chars = function (perm_prefix = "", perm_chars = "") {
        
        // Base case
        if (perm_chars.length === 0) {
            console.log(perm_prefix);
            return;
        }
        
        // Recursion case
        if (perm_chars.length > 0) {
            
            var this_digit = perm_chars.charAt(0);
            var next_digits = perm_chars.slice(1);

            if (this_digit < 2) {
                permutate_chars(perm_prefix + this_digit, next_digits);

            } else {
                var letters_array = numbers_array[this_digit];
                for (var i = 0; i < letters_array.length; i += 1) {
                    var this_letter = letters_array[i];

                    permutate_chars(perm_prefix + this_letter, next_digits);
                }
            }
            return;
        }
    };

    permutate_chars("", mystring);

    return;
};

permutate_string("18003569377");
