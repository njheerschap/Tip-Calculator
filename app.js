function tipCalculator() {

    console.log(parseInt('50%'))

    const tipPercents = document.querySelectorAll('.percent');
    const bill = document.getElementById('bill');
    const custom = document.getElementById('custom');
    const customError = document.getElementById('tip-error');
    const guestError = document.getElementById('guest-error');
    const billError = document.getElementById('bill-error');
    const partySize = document.getElementById('people');
    const finalTip = document.getElementById('tip-dollars');
    const finalTotal = document.getElementById('total-dollars');

    // Active Percentage Styling 

    function stylePercents (e) {
            const percent = e.target;
            if (percent.classList.contains("percent") && !percent.classList.contains('custom-percent')) {
                percent.className += ' selected';
            } 
            if(percent.classList.contains("percent")) {
                percent.className += ' select'
            }
            for (let i = 0; i < tipPercents.length; i++) {
                if (tipPercents[i].classList.contains('selected') && tipPercents[i] !== percent) {
                    tipPercents[i].classList.remove('selected')
                    tipPercents[i].classList.remove('select')
                }
                if(tipPercents[i].classList.contains('select') && tipPercents[i] !== percent) {
                    tipPercents[i].classList.remove('select')
                }
            }
    }

    // Calculate Bill Total

    function getBillAmount() {
        const billAmount = bill.value
        return billAmount
    }

    function tipAmt() {
        for (let i = 0; i < tipPercents.length; i++) {
            if (tipPercents[i].classList.contains('select') && tipPercents[i].classList.contains('std')) {
                return tipPercents[i].value;
            } else if (tipPercents[i].classList.contains('select') && tipPercents[i].classList.contains('custom-percent')) {
                const customTipValue = parseInt(tipPercents[i].value)
                return customTipValue / 100;
            }
        }
    }

    function numberOfPeople() {
        const partyNumber = partySize.value;
        return partyNumber;
    }


    function calculateBill() {
        const billTotal = getBillAmount();
        const tip = tipAmt();
        const totalPeople = numberOfPeople();
        const tipPerPerson = billTotal * tip / totalPeople;
        const totalPerPerson = (billTotal / totalPeople) + tipPerPerson;
        if (isFinite(tipPerPerson) && isFinite(totalPerPerson) && !isNaN(tipPerPerson) && !isNaN(totalPerPerson)) {
            finalTip.innerText = '$' + tipPerPerson.toFixed(2);
            finalTotal.innerText = '$' + totalPerPerson.toFixed(2);
        }
        else {
            alert('Some fields are incorrect or blank.')
        }
    }

    function resetCalculator() {
        bill.value = 0;
        custom.value = 0;
        partySize.value = 0
        finalTip.innerText = '$0.00';
        finalTotal.innerText = '$0.00';
        for (let i = 0; i < tipPercents.length; i ++) {
            tipPercents[i].classList.remove('selected');
            tipPercents[i].classList.remove('select');
        }
    }

    // Form Validation 

    function validate(value, field, error, tag, e) {
        if (e.target.classList.contains(tag)) {
            if(!isNaN(value)) {
                error.style.display = 'none';
            } else if (field.value === '') {
                error.style.display = 'none';
            } else {
                error.style.display = 'block';
            }
        }
    }

    function validateCustomTip(e) {
            const customTip = e.target.value;
            const toPercent = (parseInt(customTip) / 100)
            validate(toPercent, custom, customError, 'custom-percent', e)
    }

    function validatePeople(e) {
        const guests = e.target.value;
        validate(guests, partySize, guestError, 'party', e)
    }

    function validateBill(e) {
        const billNumber = e.target.value;
        validate(billNumber, bill, billError, 'bill-amt', e)
    }


    function outputResults() {
        const percentages = document.querySelector('.percentages');
        bill.addEventListener('keyup', e => {
            validateBill(e);
        })

        percentages.addEventListener('click', e => {
            stylePercents(e);
        })

        percentages.addEventListener('keyup', e => {
            validateCustomTip(e);
        })
        
        partySize.addEventListener('keyup', e => {
            validatePeople(e);
        })
    
        document.addEventListener('click', e => {
            if( e.target.classList.contains('calculate')) {
                calculateBill();
            } else if (e.target.classList.contains('reset')) {
                resetCalculator();
            }
        })
    }

    outputResults()
}

tipCalculator();