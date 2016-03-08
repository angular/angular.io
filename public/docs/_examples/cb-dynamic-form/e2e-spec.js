describe('Dynamic Form', function () {

    beforeAll(function () {
        browser.get('');
    });

    it('should submit form', function () {
      
      var name = 'Lisa';
      var email = 'test@test.com';
      var emailElement;
      
      var firstNameElement = element.all(by.css('input[id=firstName]')).get(0);
      firstNameElement.sendKeys(name);
      expect(firstNameElement.getAttribute('value')).toEqual(name);
      
      emailElement = element.all(by.css('input[id=emailAddress]')).get(0);
      emailElement.sendKeys(email);
      expect(emailElement.getAttribute('value')).toEqual(email);   
      
      element(by.css('select option[value="usa"]')).click()
      
      var saveButton = element.all(by.css('button')).get(0);
      saveButton.click().then(function(){
        expect(element(by.xpath("//strong[contains(text(),'The form contains the following values')]")).isPresent()).toBe(true);
      });
      
  });

});
