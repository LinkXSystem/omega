import Svg from '../../src/lib/svg';

describe('SVG', () => {
  it('Function Test Of getCubicBezier', () => {
    const path = Svg.getCubicBezier(0, 0, 100, 100);

    expect(path).toEqual(
      'M 0, 0 C 66.66666666666667, 0 33.33333333333333, 100 100, 100',
    );
  });
});
