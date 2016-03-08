/**
 * Created by darry on 2/27/2016.
 */
describe('BaseClass', function() {

    describe ('Inheritance', function() {
        Work.inherits(SomeBaseClass);

        function SomeBaseClass(attributes)
        {
            var _constructor = this;
            var _prototype = _contstructor.prototype;

            _constructor.new = function(attributes)
            {
                var instance = new _constructor( attributes );
                return instance;
            }

            _prototype.$save = angular.noop();
        }

        it ('add methods to the child class', function()
        {
            expect(Work.new).toBeDefined();
        });

        it ('add methods to the child class', function()
        {
            var work = Work.new({});
            expect(work.$save).toBeDefined();
        });


    })
})