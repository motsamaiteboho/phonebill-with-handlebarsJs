// get a reference to the textbox where the bill type is to be entered
const billTypeText = document.querySelector(".billTypeText");
//get a reference to the add button
const textTotalAddBtn = document.querySelector(".addToBillBtn");

//link the factory functions
var txtBillTotal = textBillTotals();
//add an event listener for when the add button is pressed

function fillTamplateData() {
    
    // get a reference to the template script tag
    var templateSource = document.querySelector(".userTemplate").innerHTML;

    // compile the template
    var userTemplate = Handlebars.compile(templateSource);

    // get a reference to tableBody where users is to be displayed
    var userDataElem = document.querySelector(".userData");

    Handlebars.registerHelper("bold", function (total) {
        var result = '<span class="totalOne">' + Handlebars.escapeExpression(total) + '</span>';
        return new Handlebars.SafeString(result);
    });
    // use the compiled the template
    var userDataHTML = userTemplate({
        calltotal: txtBillTotal.getTotalCallCost().toFixed(2),
        smstotal: txtBillTotal.getTotalSmsCost().toFixed(2),
        total: txtBillTotal.getTotalCost().toFixed(2)
    });
    userDataElem.innerHTML = userDataHTML;
}
function textBillTotal() {
    // get the value entered in the billType textfield
    var billTypeEntered = billTypeText.value.trim();
    // update the correct total
    if (billTypeEntered === "call") {
        txtBillTotal.makeCall();
    }
    else if (billTypeEntered === "sms") {
        txtBillTotal.sendSms();
    }

    fillTamplateData();
    const totalCostElem = document.querySelector(".totalOne");

    totalCostElem.classList.remove("danger");
    totalCostElem.classList.remove("danger");

    //color the total based on the criteria
    totalCostElem.classList.add(txtBillTotal.totalClassName());
}
textTotalAddBtn.addEventListener('click', textBillTotal);

document.addEventListener('DOMContentLoaded', function () {
    fillTamplateData();
});
//in the event listener check if the value in the bill type textbox is 'sms' or 'call'
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen