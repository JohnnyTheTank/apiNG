describe('A apingDefaultSettings Service', function () {

    var $compile;
    var $rootScope;
    var $q;

    // Mocks & Stubs
    var templateRequestMock = function () {
        return $q.when('<div><pre>{{results | json}}</pre></div>')
    };

    beforeEach(module('jtt_aping', function ($provide) {
        // Mock apingDefaultSettings with what ever you want
        // Do the same for other services if needed
        $provide.value('apingDefaultSettings', {
            apingApiKeys: {}
        });
        $provide.value('$templateRequest', templateRequestMock)
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));


    it('should init scope.results with an empty array', function () {
        var html = '<aping></aping>';

        var element = $compile(html)($rootScope);

        // TODO: Try to Debug the element and look "inside"
        expect(element.isolateScope().results).toEqual([]);
    });


    it('should get an json file and merge it into results', function () {

        var jsonloaderRequest = "{'path':'https://github.com/JohnnyTheTank/apiNG/blob/master/package.json'}";

        var html = '<aping aping-jsonloader="['+jsonloaderRequest+']"></aping>';

        var element = $compile(html)($rootScope);

        waitFor(function () {
            expect(element.isolateScope().results.length === 1);
        }, "Results array length should be one", 5000);

    });


});
