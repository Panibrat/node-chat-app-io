var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var text = 'Some text';
        var from = 'Alex';

        var message = generateMessage(from, text);
        //expect(message.text).toBe(text);
        //expect(message.from).toBe(from);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
})
describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'Gooogle';
        var latitude = 1;
        var longitude = 2;

        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url: 'https://google.com/maps?q=1,2'
        });
    });
});