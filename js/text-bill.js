function textBillTotals() {
    var callCostTotal = 0;
    var smsCostTotal = 0;

    function getCallCost() {
        return 2.75;
    }

    function getSmsCost() {
        return 0.75;
    }

    function getWarningLevel() {
        return 30;
    }

    function getCriticalLevel() {
        return 50;
    }

    function makeCall() {
        callCostTotal += 2.75;
    }

    function getTotalCost() {
        return callCostTotal + smsCostTotal;
    }

    function getTotalCallCost() {
        return callCostTotal;
    }

    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function sendSms() {
        smsCostTotal += 0.75
    }

    function hasReachedCriticaLevel() {
        return getTotalCost() >= getCriticalLevel() && getTotalCost() > 0;
    }
    function hasReachedWarningLevel(){
        return getTotalCost() >= getWarningLevel();
    }
    function totalClassName() {

        if (hasReachedCriticaLevel()) {
            return "danger";
        }
        if (hasReachedWarningLevel()) {
            return "warning";
        }

    }

    return {
        getCallCost,
        getSmsCost,
        getWarningLevel,
        getCriticalLevel,
        makeCall,
        getCallCost,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
        totalClassName
    }
}