const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Sasha',
            room: 'Room 911'
        }, {
            id: '2',
            name: 'Petya',
            room: 'Room Panama'
        }, {
            id: '3',
            name: 'Masha',
            room: 'Room 911'
        }];
    });



    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: "Sasha",
            room: "room1"
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        var user = users.removeUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Sasha',
            room: 'Room 911'
        });
        expect(users.users.length).toEqual(2);
    });

    it('should not remove user', () => {
        var user = users.removeUser('100');
        expect(user).toEqual(undefined);
        expect(users.users.length).toEqual(3);
    });

    it('should find user', () => {
        var user = users.getUser('3');
        expect(user).toEqual({
            id: '3',
            name: 'Masha',
            room: 'Room 911'
        });
    });

    it('should not find user', () => {
        var user = users.getUser('100');
        expect(user).toEqual(undefined);
    });

    it('should return names array from Room 911', () => {
        var userList = users.getUserList('Room 911');

        expect(userList).toEqual(['Sasha', 'Masha']);
    });

    it('should return names array from Room Panama', () => {
        var userList = users.getUserList('Room Panama');

        expect(userList).toEqual(['Petya']);
    });

});