describe('A apingDefaultSettings Service', function(){

    var $compile;
    var $rootScope;
    var $q;

    // Mocks & Stubs
    var templateRequestMock = function(){
        return $q.when('<template>Test</template>')
    };

    beforeEach(module('jtt_aping', function($provide){
        // Mock apingDefaultSettings with what ever you want
        // Do the same for other services if needed
        $provide.value('apingDefaultSettings',{});
        $provide.value('$templateRequest',templateRequestMock)
    }));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$q_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));


    it('should init scope.results with an empty array', function(){
        var html = '<aping></aping>';

        var element = $compile(html)($rootScope);


        // TODO: Try to Debug the element and look "inside"
        expect(element.isolateScope().results).toEqual([]);
    });

});