/**
 * Created by cr on 7/13/17.
 */
'use strict';

describe('pos', () => {

    it('when number is times of 3,5,7,should return the tag', () => {
        let number = 21;
        const actualResult=getTag(number);

        let expectResult = 'fizzwizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number contain 3,should return the tag_3', () => {
        let number = 35;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 'fizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 3,5,7 and does not contain 3,should return the tag', () => {
        let number = 15;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 'fizzbuzz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is not times of 3,5,7 and does not contain 3,should return the number', () => {
        let number = 8;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 8;

        expect(actualResult).toEqual(expectResult);
    });
});
