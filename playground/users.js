var users = [{
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

function filterUsers (usersArr, room) {
    return usersArr.filter((user) => user.room === room);
}
function filterUsersNames (usersArr, room) {
    var filteredArr =   usersArr.filter((user) => user.room === room);
    return filteredArr.map((user) => user.name);
}
var filteredUsers = filterUsersNames(users, 'Room Panama' );

console.log(filteredUsers);