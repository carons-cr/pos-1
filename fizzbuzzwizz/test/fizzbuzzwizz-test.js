/**
 * Created by cr on 7/14/17.
 */
/**
 * Created by cr on 7/13/17.
 */
'use strict';

describe('pos', () => {

    it('when number is times of 3,should return the tag', () => {
    let number = 6;
    const actualResult=getTag(number);

    let expectResult = 'fizz';

    expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 5,should return the tag', () => {
        let number = 10;
        const actualResult=getTag(number);

        let expectResult = 'wizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 7,should return the tag', () => {
        let number = 14;
        const actualResult=getTag(number);

        let expectResult = 'fizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 3,5,should return the tag', () => {
        let number = 15;
        const actualResult=getTag(number);

        let expectResult = 'fizzbuzz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 3,7,should return the tag', () => {
        let number = 21;
        const actualResult=getTag(number);

        let expectResult = 'fizzwizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 5,7,should return the tag', () => {
        let number = 70;
        const actualResult=getTag(number);

        let expectResult = 'buzzwizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number is times of 3,5,7,should return the tag', () => {
        let number = 105;
        const actualResult=getTag(number);

        let expectResult = 'fizzbuzzwizz';

        expect(actualResult).toEqual(expectResult);
    });

    it('when number contain 3,should return the tag_3', () => {
        let number = 35;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 'fizz';

        expect(actualResult).toEqual(expectResult);
        });

    it('when number does not contain 3 and is times of 3,5,7 ,should return the tag', () => {
        let number = 15;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 'fizzbuzz';

        expect(actualResult).toEqual(expectResult);
        });

    it('when number does not contain 3 and is not times of 3,5,7,should return the number', () => {
        let number = 8;

        const actualResult=fizzbuzzwizz(number);

        let expectResult = 8;

        expect(actualResult).toEqual(expectResult);
        });

});
