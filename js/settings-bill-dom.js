// get refences to all the settings fields
const callsTotalSet = document.querySelector(".callTotalSettings");
const smsTotalSet = document.querySelector(".smsTotalSettings");

//get a reference to the add button
const radioSetAddBtn = document.querySelector(".radioSetAddBtn");
//get a reference to the 'Update settings' button
const updateSettings = document.querySelector(".updateSettings")

//add an event listener for when the 'Update settings' button is pressed
var billWithSetting = BillWithSettings();

function fillTamplateData2(){
    // get a reference to the template script tag
    var templateSource = document.querySelector(".userTemplate2").innerHTML;

    // compile the template
    var userTemplate = Handlebars.compile(templateSource);

    // get a reference to tableBody where users is to be displayed
    var userDataElem = document.querySelector(".userData2");

    Handlebars.registerHelper("setbold", function (total) {
        var result = '<span class="totalSettings">' + Handlebars.escapeExpression(total) + '</span>';
        return new Handlebars.SafeString(result);
    });
    // use the compiled the template
    var userDataHTML = userTemplate({
        calltotal:  billWithSetting.getTotalCallCost().toFixed(2),
        smstotal:  billWithSetting.getTotalSmsCost().toFixed(2),
        total:   billWithSetting.getTotalCost().toFixed(2)
    });
    userDataElem.innerHTML = userDataHTML;
}

function updateCosts() {
    const callCostSetting = document.querySelector(".callCostSetting");
    const smsCostSetting = document.querySelector(".smsCostSetting");
    const warningLevelSetting = document.querySelector(".warningLevelSetting");
    const criticalLevelSetting = document.querySelector(".criticalLevelSetting");
    fillTamplateData2();
    const totalCostSet = document.querySelector(".totalSettings");
    if (smsCostSetting.value !== "")
        billWithSetting.setSmsCost(parseFloat(smsCostSetting.value));
    if (callCostSetting.value !== "")
        billWithSetting.setCallCost(parseFloat(callCostSetting.value));
    if (warningLevelSetting.value !== "") {
        if ( billWithSetting.getWarningLevel() !== warningLevelSetting.value) {
            if ( billWithSetting.getTotalCost() == warningLevelSetting.value) {
                if(totalCostSet.classList.contains("danger"));
                    totalCostSet.classList.add("warning");
            }
            else {
                totalCostSet.classList.remove("danger");
                totalCostSet.classList.remove("warning");
            }

        }
        billWithSetting.setWarningLevel(warningLevelSetting.value);
    }
    if (criticalLevelSetting.value !== "") {
        if (criticalLevelSetting.value >  billWithSetting.getCriticalLevel() && billWithSetting.getCriticalLevel() !== 0) {
            if (totalCostSet.classList.contains("danger"))
                totalCostSet.classList.add("warning");
        }
        billWithSetting.setCriticalLevel(criticalLevelSetting.value); 
    }
}
updateSettings.addEventListener('click', updateCosts);
//add an event listener for when the add button is pressed
function setBillTotal() {
    // get a reference to the sms or call radio buttons
    var checkedRadBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
    // get the value entered in the billType radiobtn checked
    if (checkedRadBtn) {
        var setbillTypeEntered = checkedRadBtn.value;
        // update the correct total
        if (setbillTypeEntered === "call") {
            billWithSetting.makeCall();
        }
        else if (setbillTypeEntered === "sms") {
            billWithSetting.sendSms();
        }
    }
    //update the totals that is displayed on the screen.
    fillTamplateData2();
    const totalCostSet = document.querySelector(".totalSettings");
    //color the total based on the criteria
    totalCostSet.classList.remove("danger");
    totalCostSet.classList.remove("warning");

    totalCostSet.classList.add(billWithSetting.totalClassName());
}
radioSetAddBtn.addEventListener('click', setBillTotal);

document.addEventListener('DOMContentLoaded', function () {
    fillTamplateData2();
});
//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the call / sms total
// * add the appropriate value to the overall total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen.
// * check the value thresholds and display the total value in the right color.