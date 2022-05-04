describe("The bill with settings factory function", function(){
    it("should be able to set the call cost", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());

        settingsBill.setCallCost(2.75);
        assert.equal(2.75, settingsBill.getCallCost());
    });

    it("should be able to set the sms cost", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost());

        settingsBill.setSmsCost(0.75);
        assert.equal(0.75, settingsBill.getSmsCost());
    });

    it("should be able to set the sms and call cost", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.75);
        settingsBill.setSmsCost(0.85);

        assert.equal(0.85, settingsBill.getSmsCost());
        assert.equal(2.75, settingsBill.getCallCost());

        settingsBill.setCallCost(1.75);
        settingsBill.setSmsCost(0.65);
        
        assert.equal(0.65, settingsBill.getSmsCost());
        assert.equal(1.75, settingsBill.getCallCost());
    });

    it("should be able to set the warning level", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setWarningLevel(20);

        assert.equal(20, settingsBill.getWarningLevel());
    });

    it("should be able to set the warning level", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setWarningLevel(20);

        assert.equal(20, settingsBill.getWarningLevel());
    });

    it("should be able to set the warning and critical level", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setWarningLevel(15);
        settingsBill.setCriticalLevel(25);

        assert.equal(15, settingsBill.getWarningLevel());
        assert.equal(25, settingsBill.getCriticalLevel());
    });
});

describe("use values", function(){
    it("should be able to use the call cost set", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(6.75, settingsBill.getTotalCost());
        assert.equal(6.75, settingsBill.getTotalCallCost());
        assert.equal(0, settingsBill.getTotalSmsCost());

    });

    it("should be able to use the call cost set for 2 calls at 1.35 each", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(2.70, settingsBill.getTotalCost());
        assert.equal(2.70, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSmsCost());

    });

    it("should be able to use 2 sms's at 0.85 each", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.sendSms();
        settingsBill.sendSms();

        assert.equal(1.70, settingsBill.getTotalCost());
        assert.equal(0.00, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());

    });

    it("should be able to use 2 sms's at 0.85 each and make 1 call at 1.35", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());

    });
});
describe("warning and crital level", function(){
    it("it should return a class name of 'warning' if warning level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("warning", settingsBill.totalClassName());
    })
    it("it should return a class name of 'danger' if critical level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("danger", settingsBill.totalClassName());
    })

    it("it should stop the totaL call cost from increasing when critical level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.5);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("danger", settingsBill.totalClassName());
        assert(10,settingsBill.getTotalCallCost());
    })

    it("it should allow the total to increase after critical level has been updated to a new critical level", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.5);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(8);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("danger", settingsBill.totalClassName());
        assert(10,settingsBill.getTotalCallCost());

        settingsBill.setCriticalLevel(20);

        assert.equal("warning", settingsBill.totalClassName());
        settingsBill.makeCall();
        settingsBill.makeCall();
        assert(15,settingsBill.getTotalCallCost());
    })
});