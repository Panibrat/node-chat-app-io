class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    getUserList (room) {
        var filteredUsers = this.users.filter((user) => user.room === room);
        return filteredUsers.map((user) => user.name);
    }
    removeUser (id) {
        var resultUser = this.users.filter((user) => user.id === id);
        if(resultUser){
            var newList = this.users.filter((user) => user.id !== id);
            this.users = newList;
        }
        return resultUser[0];
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }
}

module.exports = {Users};