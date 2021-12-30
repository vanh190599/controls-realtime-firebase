// FIREBASE ========

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
    var data = [];
    chat.forEach(doc => {
        data.push(doc.data());
        console.log(doc.data())
    });

    // bắt thay đổi
    if (data.length > 0) {
        $.each(data, function (key, value) {
            var event = value.clicked;
            var full_name = value.full_name;

            if (event === 1) {
                showNoty(full_name);
            }
        });
    }
})

function showNoty(message) {
    Swal.fire({
        title: message + ' - đã ký!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
    }).then((result) => {
        // reset (batch update clicked = 0)
        reset('user_1');
        reset('user_2');
    })
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