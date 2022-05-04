// get refences to all the settings fields
const callsTotalSet = document.querySelector(".callTotalSettings");
const smsTotalSet = document.querySelector(".smsTotalSettings");
const totalCostSet = document.querySelector(".totalSettings");
//get a reference to the add button
const radioSetAddBtn = document.querySelector(".radioSetAddBtn");
//get a reference to the 'Update settings' button
const updateSettings = document.querySelector(".updateSettings")

//add an event listener for when the 'Update settings' button is pressed
var billWithSetting = BillWithSettings();
function updateCosts() {
    const callCostSetting = document.querySelector(".callCostSetting");
    const smsCostSetting = document.querySelector(".smsCostSetting");
    const warningLevelSetting = document.querySelector(".warningLevelSetting");
    const criticalLevelSetting = document.querySelector(".criticalLevelSetting");

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
    callsTotalSet.innerHTML = billWithSetting.getTotalCallCost().toFixed(2);
    smsTotalSet.innerHTML = billWithSetting.getTotalSmsCost().toFixed(2);
    totalCostSet.innerHTML = billWithSetting.getTotalCost().toFixed(2);

    //color the total based on the criteria
    totalCostSet.classList.remove("danger");
    totalCostSet.classList.remove("warning");

    totalCostSet.classList.add(billWithSetting.totalClassName());
}
radioSetAddBtn.addEventListener('click', setBillTotal);

//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the call / sms total
// * add the appropriate value to the overall total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen.
// * check the value thresholds and display the total value in the right color.