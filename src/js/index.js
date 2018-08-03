import { createStore } from 'redux'
import { chat } from './reducers'
import { addChatToStore } from './actions'

const store = createStore(chat)

// Log the initial state
console.log(store.getState())

// get Elements
const btnSubmit = document.getElementById('submit');
var ref = firebase.database().ref().child('messages');

// Get a reference to the database service
var database = firebase.database();

btnSubmit.addEventListener('click', evt => {
    const message = document.querySelector('#messageInput').value;
    const currentDateTime = Date.now();
    //const id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    let userDisplayName = 'Anil Kumar';
    firebase.database().ref('messages').push({
        messageText: message,
        date: currentDateTime,
        sentBy: userDisplayName
    });

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName));
});

database.ref().child('messages').on('child_added', function (dataSnapshot) {
    console.log("DataSnapshot", dataSnapshot.val());
    const paraElement = document.createElement('p');
    paraElement.innerHTML = `<strong>${dataSnapshot.val().sentBy}</strong> - ${dataSnapshot.val().date}<br>
                                ${dataSnapshot.val().messageText}`;
    document.getElementById('messageHistory').appendChild(paraElement);
})

store.subscribe(() => {
    console.log(store.getState());
    console.log('in subscribe method');

    // const paraElement = document.createElement('p');
    // paraElement.innerHTML = `<strong>${store.getState()[0].sentBy}</strong> - ${store.getState()[0].date}<br>
    //                             ${store.getState()[0].messageText}`;
    // document.getElementById('messageHistory').appendChild(paraElement);
});

 // function writeUserData(userId, name, email, imageUrl) {
 //     // to Write the data
 //     firebase.database().ref('users/' + userId).set({
 //         username: name,
 //         email: email,
 //         profile_picture: imageUrl
 //     });
 // }

 //read the data
 // database.ref('/users/' + 2).once('value', (snapshot) => {
 //     const { username, email, profile_picture } = snapshot.val();
 //     //console.log("User", snapshot.val());
 //     console.log(username);

 //     console.log(`user object ${username}, ${email}, ${profile_picture}`);
 // })
// writeUserData("2", "Prathap", "prathap@gmail.com", "https://myimage1.png");