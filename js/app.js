printListAtFirst();
getDataOnRealTime();
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  emptyVal();
  $(".list").remove();
  printListAtFirst();
});
function getDataOnRealTime() {
  db.collection("lab3").onSnapshot((snapShot) => {
    snapShot.forEach((doc) => {
      songName = doc.data().title;
      artistName = doc.data().artist_name;
      likeNum = doc.data().likes;
      id = doc.id;
      var myId=document.getElementById(id)
      myId.querySelector(".likes_num").innerHTML=likeNum
    });
  });
}

function emptyVal() {
  var titleContent = $("#title").val();
  var artistContent = $("#artist").val();
  if (titleContent == "" || artistContent == "") {
    alert("Please input all infomations");
  } else {
    addData(artistContent, titleContent);
    console.log("add sucessed");
  }
}
function addList(title, artist, likes, id) {
  const listHTML = `<div class="list" id=${id}>
        <h1 class="title">${title}</h1>
        <p class="likes">likes: <p class="likes_num">${likes}</p></p>
        <p class="artist">${artist}</p>
        <button class="delete" id=${id}>delete</button>
        <button class="like" id=${id}>like</button>
    </div>`;
  $(listHTML).appendTo("#listContent");
}

//Initailize the list
function printListAtFirst() {
  const songRef = db.collection("lab3").doc();
  db.collection("lab3")
    .get()
    .then((querySnap) => {
      querySnap.forEach((doc) => {
        songName = doc.data().title;
        artistName = doc.data().artist_name;
        likeNum = doc.data().likes;
        id = doc.id;
        addList(songName, artistName, likeNum, id);
        var listDiv = document.getElementById(id);
        listDiv.querySelector(".like").addEventListener("click", () => {
          addLike(listDiv.id);
        });
        listDiv.querySelector(".delete").addEventListener("click", () => {
          console.log(listDiv.querySelector(".delete").id);
          deleteData(listDiv.id)
        });
      });
    });
}

function addData(artistContent, titleContent) {
  db.collection("lab3").add({
    artist_name: artistContent,
    title: titleContent,
    likes: 0,
  });
}
function deleteData(id) {
  const songRef = db.collection("lab3").doc(id);
  songRef.delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
$(`#${id}`).remove();
}
function addLike(id) {
  console.log(id);
  const songRef = db.collection("lab3").doc(id);
  return db
    .runTransaction((transaction) => {
      return transaction.get(songRef).then((songDoc) => {
        if (!songDoc.exists) {
          throw "Document does not exist!";
        }
        var newLikes = songDoc.data().likes + 1;
        transaction.update(songRef, { likes: newLikes });
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
    })
    .catch((error) => {
      console.log("Transaction failed: ", error);
    });
}
