describe('A apingDefaultSettings Service', function(){

    var apingDefaultSettings;

    beforeEach(module('jtt_aping'));

    beforeEach(inject(function(_apingDefaultSettings_){
        apingDefaultSettings = _apingDefaultSettings_;
    }));


    it('should provide a apingApiKeys object', function(){
        expect(apingDefaultSettings.apingApiKeys).toBeDefined();
        expect(apingDefaultSettings.apingApiKeys).toEqual(jasmine.any(Object))
    })

});