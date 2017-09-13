/** 
 * @title: Unit Testing
 * @project: Browsengine
 * @license: MIT
 */


describe("Browsengine: basic testing", function() {

			var body;

			beforeEach(function(){

				body = document.body;

			});

			afterEach(function() {

				body = null;

			});
     
			
			it("will produce the desired behaviour", function() {
			
				   expect(String(window.webpage)).toEqual("[object Object]");
				
				   expect(body.hasAttribute("aria-touch-capable")).toEqual(true);
				
				   expect(body.hasAttribute("aria-os-data")).toEqual(true);
				   
				   expect(body.hasAttribute("aria-view-mode")).toEqual(true);
				
            });

	
});
    
