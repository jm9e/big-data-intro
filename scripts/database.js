var db = {};

db.itemTypes = [ 
	'Milch', 
	'Butter', 
	'Käse', 
	'Kekse', 
	'Gummibärchen', 
	'Schokolade', 
	'Kartoffelchips', 
	'Kola', 
	'Limonade', 
	'Bier'
];

db.purchases = [];
db.purchaseFormId = 0;

db.Purchase = function() {
	this.numbers = [];
	this.itemIds = [];

	this.addItem = function(number, itemId) {
		this.numbers.push(number);
		this.itemIds.push(itemId);
	}

	this.toString = function() {
		var str = '';

		for (var i = 0; i < this.numbers.length; i++) {
			if (i > 0) {
				str += ', ';
			}

			str += this.numbers[i] + ' ' + db.itemTypes[this.itemIds[i]];
		}

		return str;
	}
};

db.addItemForm = function() {
	db.purchaseFormId++;

	var itemSelect = $('<select name="itemTypes"></select>');

	for (var i = 0; i < db.itemTypes.length; i++) {
		itemSelect.append('<option value="'+i+'">'+db.itemTypes[i]+'</option>');
	}

	var numberInput = $('<input size="2" name="numbers" value="1"></input>');
	var removeButton = $('<button onclick="db.removeItemForm('+db.purchaseFormId+')">entfernen</button>');

	$('<div id="form-'+db.purchaseFormId+'"></div>')
		.append(numberInput)
		.append(' ')
		.append(itemSelect)
		.append(' ')
		.append(removeButton)
		.appendTo($('#new-data'));
};

db.removeItemForm = function(i) {
	$('#form-'+i).remove();
};

db.addPurchase = function() {
	var numbers = $('[name="numbers"]');
	var itemTypes = $('[name="itemTypes"]');

	var purchase = new db.Purchase();
	var valid = true;

	for (var i = 0; i < numbers.length; i++) {
		if (numbers[i].value < 1) {
			valid = false;
		}

		if (numbers[i].value != Math.round(numbers[i].value)) {
			valid = false;
		}

		for (var j = 0; j < i; j++) {
			if (itemTypes[i].value == itemTypes[j].value) {
				valid = false;
			}
		}

		purchase.addItem(numbers[i].value, itemTypes[i].value);
	}

	if (valid) {
		$('#new-data').empty();
		db.addItemForm();

		db.purchases.push(purchase);

		$('#data-container')
			.append('<div>'+purchase.toString()+'</div>');
	} else {
		alert('Irgend etwas stimmt nicht. Entweder kommt ein Artikel doppelt vor oder eine Anzahl ist keine positive Ganzzahl größer 0.');
	}
};