//get a reference to the add button
const textradioBillAddBtn = document.querySelector(".radioBillAddBtn");
//Link the factory function
var billTotals = RadioBillTotal();


function fillTamplateData1(){
     // get a reference to the template script tag
     var templateSource = document.querySelector(".userTemplate1").innerHTML;

     // compile the template
     var userTemplate = Handlebars.compile(templateSource);
 
     // get a reference to tableBody where users is to be displayed
     var userDataElem = document.querySelector(".userData1");
 
     Handlebars.registerHelper("bold", function (total) {
         var result = '<span class="totalTwo">' + Handlebars.escapeExpression(total) + '</span>';
         return new Handlebars.SafeString(result);
     });
     // use the compiled the template
     var userDataHTML = userTemplate({
         calltotal: billTotals.getTotalCallCost().toFixed(2),
         smstotal: billTotals.getTotalSmsCost().toFixed(2),
         total:  billTotals.getTotalCost().toFixed(2)
     });
     userDataElem.innerHTML = userDataHTML;
}
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
   
    fillTamplateData1();
    const totalCostElement = document.querySelector(".totalTwo");

    totalCostElement.classList.remove("danger");
    totalCostElement.classList.remove("warning");

    //color the total based on the criteria
    totalCostElement.classList.add(billTotals.totalClassName())
}
textradioBillAddBtn.addEventListener('click', radiBillTotal);

document.addEventListener('DOMContentLoaded', function () {
   fillTamplateData1();
});
//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen