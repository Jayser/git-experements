/*GET /user
    [{
    "id": 1,
    "name": "User1",
    "balance": 100
}, {
    "id": 2,
    "name": "User2",
    "balance": 10
}]

POST /user/:id
{
    "name": "User1",
    "balance": 50
}*/

/*1. Get all users
2. Set balance = balance - 50 where user balance > 50
3. Update users on backend*/

function getUsers() {
    return $http.get('/user');
}

function updateUser(id, data) {
    return $http.post('/user/' + id, data);
}

function decreaseUsersBalance() {
    return getUsers().then((res) => {
        return res.filter((item) => {
            let isCondition = item.balance > 50;

            if (isCondition) {
                item.balance =- 50;
            }

            return isCondition;
        });
    }).then((res) => {
        return new Promise.all(res.map(item => updateUser(item.id, item)));
    });
}

decreaseUsersBalance().then(function() {
    alert('Done');
});