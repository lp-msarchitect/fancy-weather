import { getCityNameByCoords } from '../js/utils/clientApi';

describe('clientApi', () => {
  describe('getCityNameByCoords', () => {
    it('when request "51.952659,7.632473" should resolve status ok', async () => {
      const query = `51.952659,7.632473`;
      return getCityNameByCoords(query).then((result) => {
        expect(result.status.message).toMatch('OK');
      });
    });
  });
});
