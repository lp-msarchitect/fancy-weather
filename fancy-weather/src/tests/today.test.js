import Today from '../js/components/today';

describe('Today component', () => {
  describe('component api', () => {
    it('element getter should return HTMLElement', () => {
      //Arrange
      const today = new Today(document);
      //Act
      const element = today.element;
      //Assert
      expect(element).any(HTMLElement);
    });
  });
});
