const paymentAmount = document.getElementById('input-dollar-number'),
    tipSelect = document.getElementsByClassName('select-tip-box'),
    tipInput = document.getElementsByClassName('input-tip')[0],
    numPeople = document.getElementById('input-person-number'),
    tipAmountElement = document.getElementById('tip-result'),
    totalAmountElement = document.getElementById('total-result'),
    btnReset = document.getElementById('btn-reset'),
    tipError = document.getElementById('tip-error'),
    billError = document.getElementById('bill-error'),
    peopleError = document.getElementById('people-error'),
    inputBoxAmount = document.getElementById('input-box-amount'),
    inputBoxPeople = document.getElementById('input-box-people');

let amount = "",
    tipPercent = "",
    totalPeople = 0;

    // to get the data from amount input
paymentAmount.addEventListener("input", function () {

    if (this.value != 0 && this.value != "") {
        billError.innerHTML = "";
        inputBoxAmount.classList.remove('valid-error');
        amount = parseFloat(this.value);  
    }
    else {
        billError.innerHTML = "Can't be zero or less!";
        inputBoxAmount.classList.add('valid-error');
    }
    createAmount();

});

// to get the data of tip select box
for (var i = 0; i < tipSelect.length; i++) {
    tipSelect[i].addEventListener("click", function () {
    tipError.innerHTML = "";
    var active = document.getElementsByClassName('active')[0];
        if(active){
            active.classList.remove("active");
        }
            this.classList.add("active");
            tipPercent = parseFloat(this.innerHTML);
            createAmount();

    }, false);
};

// to get the data of tip from input box 
tipInput.addEventListener("input", function () {
    if (this.value != 0 && this.value != "") {
        if (this.value >= 0 && this.value <= 80) {
            tipError.innerHTML = "";
            tipPercent = parseFloat(this.value);
        }
        else {
            tipError.innerHTML = "Tip percent cannot over 80%";
            tipInput.value = "";
            this.value = "";
        }
    }
    else {
        this.value = "";
            tipPercent = 0;
    }
    createAmount();
});

numPeople.addEventListener("input", function () {
    if (this.value != 0) {
        peopleError.innerHTML = "";
        inputBoxPeople.classList.remove('valid-error');
        totalPeople = parseInt(this.value);            
    } else {
        this.value = "";
        peopleError.innerHTML = "Can't be zero or less!";
        inputBoxPeople.classList.add('valid-error');
    }
    createAmount();
});

function createAmount() {
    if (totalPeople === 0 || tipPercent == "" || isNaN(tipPercent) || amount == "" ) {
        tipAmountElement.innerHTML = "0.00";
        totalAmountElement.innerHTML = "0.00";
        return;
    }

    console.log(`This is tipPercent ${tipPercent}`);

    let tipResult = amount * (tipPercent / 100);
    let totalResult = amount + tipPercent;

    let tipAmountPerson = tipResult / totalPeople;
    let totalAmountPerson = totalResult / totalPeople;

    tipAmountElement.innerHTML = tipAmountPerson.toFixed(2);
    totalAmountElement.innerHTML = totalAmountPerson.toFixed(2);
}

btnReset.addEventListener('click', function () {
    paymentAmount.value = "";
    for (var i = 0; i < tipSelect.length; i++) {
        var active = document.getElementsByClassName('active')[0];
        if(active){
            active.classList.remove("active");
        }
    };
    tipInput.value = "";
    numPeople.value = "";
    tipAmountElement.innerHTML = "0.00";
    totalAmountElement.innerHTML = "0.00";
    amount = "";
    tipPercent = "";
    totalPeople = 0;
});