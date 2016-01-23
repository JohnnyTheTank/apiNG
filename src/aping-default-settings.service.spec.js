describe('A apingDefaultSettings Service', function(){

    var apingDefaultSettings;

    beforeEach(module('jtt_aping'));

    beforeEach(inject(function(_apingDefaultSettings_){
        apingDefaultSettings = _apingDefaultSettings_;
    }));


    it('should provide a apingApiKeys object', function(){
        expect(apingDefaultSettings.apingApiKeys).toBeDefined();
        expect(apingDefaultSettings.apingApiKeys).toEqual(jasmine.any(Object))
    });

    describe('apingApiKeys object', function(){

        it('should contain a youtube configuration', function(){
            var youtubeApiKeyData = [
                {'apiKey': '<YOUR_YOUTUBE_API_KEY>'}
            ];

            expect(apingDefaultSettings.apingApiKeys.youtube).toBeDefined();
            expect(apingDefaultSettings.apingApiKeys.youtube).toEqual(jasmine.any(Object));
            //expect(apingDefaultSettings.apingApiKeys.youtube.apiKey).toBeDefined();
            //expect(apingDefaultSettings.apingApiKeys.youtube.apiKey).toEqual('<YOUR_YOUTUBE_API_KEY>');
            //expect(apingDefaultSettings.apingApiKeys.youtube).toEqual(youtubeApiKeyData);

          // TODO: Why are the API Keys in an array?
          expect(apingDefaultSettings.apingApiKeys.youtube[0].apiKey).toBeDefined();
          expect(apingDefaultSettings.apingApiKeys.youtube[0].apiKey).toEqual('<YOUR_YOUTUBE_API_KEY>');

          expect(apingDefaultSettings.apingApiKeys.youtube).toEqual(youtubeApiKeyData);
        })

    });

});