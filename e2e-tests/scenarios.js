'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /portfolio when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/portfolio");
  });


  describe('portfolio', function() {

    beforeEach(function() {
      browser.get('index.html#/portfolio');
    });


    it('should render portfolio when user navigates to /portfolio', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('gallery', function() {

    beforeEach(function() {
      browser.get('index.html#/galleries');
    });


    it('should render galleries when user navigates to /galleries', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for galleries/);
    });

  });
});
