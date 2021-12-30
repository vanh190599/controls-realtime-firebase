// config data
const firebaseConfig = {
    apiKey: "AIzaSyBLtOM8m07F2LBxKMBcVRhAUMNap1eTMuQ",
    authDomain: "vanh-1081a.firebaseapp.com",
    databaseURL: "https://vanh-1081a.firebaseio.com",
    projectId: "vanh-1081a",
    storageBucket: "vanh-1081a.appspot.com",
    messagingSenderId: "326573363898",
    appId: "1:326573363898:web:72bdab747c50330a82a883",
    measurementId: "G-PPNMP864RS"
};

// init
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var dbTest = db.collection("test");

dbTest.onSnapshot(chat => {
    chat.forEach(doc => {
        console.log(doc.data())
    });
})

// BEGIN: EVENT =====================

$('#button1').on('click', function () {
    clicked('user_1');
    reset('user_2');
});

$('#button2').on('click', function () {
    clicked('user_2');
    reset('user_1');
});

$('#reset').on('click', function () {
    reset('user_1');
    reset('user_2');
});

// END: EVENT =====================

function clicked(name) {
    dbTest.where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var id = doc.id;
                // do update this: click = 1
                updateClicked(id);
            });
        });
}

function reset(name) {
    dbTest.where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // do update this: click = 0
                resetClick(doc.id);
            });
        });
}

function resetClick(id) {
    dbTest.doc(id).update({
        clicked: 0,
    });
}

function updateClicked(id) {
    dbTest.doc(id).update({
        clicked: 1,
    });
}

