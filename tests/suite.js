;(function(){

	module('Browsengine Basics');

	test('', function(){

		ok(!!window.webpage, 'The [webpage] object is available');
		same({}, {}, '');
	});

}());