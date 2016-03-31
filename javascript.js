/**
 * Event triggered when key is released on the input #credit_card.
 */
$('#credit_card').keyup(function() {

	var firstNumber = $(this).val()[0];
	var secondNumber = $(this).val()[1];
	var length = $(this).val().length;

	$('#result').html(validateCreditCard(firstNumber, secondNumber, length));		
});

/**
 * Validates the credit card number through a series of set rules:
 * - Visa cards start with 4.
 * - Mastercard cards start with 5.
 * - American Express cards start with 3. The 2nd digit is either 4 or 7.
 * - Visa cards are valid if they have 13 to 16 digits.
 * - Mastercard cards are valid if it has 16 digits.
 * - American Express cards are valid if it has 15 digits.
 * - Invalid message for credit card numbers that match the correct length of digits, but fails validation.
 */
var validateCreditCard = function(firstNumber, secondNumber, length) {

	// if length is 0 there is no need to continue
	if (length == 0) {
		return '';
	}

	if (firstNumber == 3) {
		if (secondNumber == 4 || secondNumber == 7) {
			if (length == 15) {
				return 'American Express <span class="glyphicon glyphicon-ok text-success"></span>';
			}
			return 'American Express';
		}
		// check if it has enough length to be considered invalid
		if (length >= 13 && length <= 16) {
			return '<span class="glyphicon glyphicon-remove text-danger"></span> Invalid';
		} 
		return '<span class="text-warning">?</span>';
	} 
	if (firstNumber == 4) {
		if (length >= 13 && length <= 16) {
			return 'Visa <span class="glyphicon glyphicon-ok text-success"></span>';
		}
		return 'Visa';
	} 
	if (firstNumber == 5) {
		if (length == 16) {
			return 'Mastercard <span class="glyphicon glyphicon-ok text-success"></span>';
		}
		return 'Mastercard';
	} 

	// validation for invalid
	if (length >= 13 && length <= 16) {
		return '<span class="glyphicon glyphicon-remove text-danger"></span> Invalid';
	} 

	// return ? if didnt fit into any validation
	return '<span class="text-warning">?</span>';
}

/**
 * BONUS
 * Event triggered when key is released on the input #credit_card_luhn.
 */
$('#credit_card_luhn').keyup(function() {
	$('#result_luhn').html(luhnChk($(this).val()));		
});

/**
 * BONUS
 * Luhn's validation method found online.
 */
var luhnChk = (function (arr) {
    return function (ccNum) {
        var 
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));