function calculateBillTotals() {
    var totalCost = 0;
    function getWarningLevel() {
        return 20;
    }

    function getCriticalLevel() {
        return 30;
    }

    function makeCall() {
        totalCost += 2.75;
    }

    function getTotalCost() {
        return totalCost;
    }

    function sendSms() {
        totalCost += 0.75
    }

    function totalPhoneBill(lstBills) {
        totalCost = 0;
        var bill = lstBills.split(",");

        for (var i = 0; i < bill.length; i++) {
            var billType = bill[i].trim();
            if (billType == "sms") {
                makeCall();
            }
            else if (billType == "call") {
                sendSms();
            }
        }
    }

    function hasReachedCriticaLevel() {
        return getTotalCost() >= getCriticalLevel() && getTotalCost() > 0;
    }
    function totalClassName() {

        if (hasReachedCriticaLevel()) {
            return "danger";
        }
        if (getTotalCost() >= getWarningLevel()) {
            return "warning";
        }
    }

    return {
        getWarningLevel,
        getCriticalLevel,
        makeCall,
        getTotalCost,
        sendSms,
        totalClassName,
        totalPhoneBill
    }
}