//get a reference to the add button
const textradioBillAddBtn = document.querySelector(".radioBillAddBtn");
//fdf
const callsTotalElement = document.querySelector(".callTotalTwo");
const smsTotalElement = document.querySelector(".smsTotalTwo");
const totalCostElement = document.querySelector(".totalTwo");
//Link the factory function
var billTotals = RadioBillTotal();
//add an event listener for when the add button is pressed
function radiBillTotal() {
    // get a reference to the sms or call radio buttons
    var checkedRadioBtn = document.querySelector("input[name='billItemType']:checked");
    // get the value entered in the billType radiobtn checked
    if (checkedRadioBtn) {
        var billTypeEntered = checkedRadioBtn.value;
        // update the correct total
        if (billTypeEntered === "call") {
            billTotals.makeCall();
        }
        else if (billTypeEntered === "sms") {
            billTotals.sendSms();
        }
    }
    //update the totals that is displayed on the screen.
    callsTotalElement.innerHTML =  billTotals.getTotalCallCost().toFixed(2);
    smsTotalElement.innerHTML =  billTotals.getTotalSmsCost().toFixed(2);
    totalCostElement.innerHTML =  billTotals.getTotalCost().toFixed(2);

    totalCostElement.classList.remove("danger");
    totalCostElement.classList.remove("warning");

    //color the total based on the criteria
    totalCostElement.classList.add(billTotals.totalClassName())
}
textradioBillAddBtn.addEventListener('click', radiBillTotal);
//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen