const expect = require('expect');
const {isRealString} = require('./validation');


describe('checking function isRealString', () => {
    it('should reject non-string values', () => {
        var str = 3;
        var result = isRealString(str);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var str = '     ';
        var result = isRealString(str);
        expect(result).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var str = '  Sasha     ';
        var result = isRealString(str);
        expect(result).toBe(true);
    });

})