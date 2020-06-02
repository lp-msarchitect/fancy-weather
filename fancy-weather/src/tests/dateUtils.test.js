import { getDayOfWeek } from '../js/utils/dateUtils.js';

describe('Date utilities', () => {
  describe('getDayOfWeek function', () => {
    it('when get only date should return short weekday name', () => {
      // Arrange
      const date = new Date('Jun 1 2020');
      // Act
      const weekdayName = getDayOfWeek(date);
      // Assert
      expect(weekdayName).toMatch('Mon');
    });

    it('when get date and false flag should return long weekday name', () => {
      // Arrange
      const date = new Date('Jun 1 2020');
      // Act
      const weekdayName = getDayOfWeek(date, false);
      // Assert
      expect(weekdayName).toMatch('Monday');
    });
  });
});
