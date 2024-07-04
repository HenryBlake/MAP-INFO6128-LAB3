// const addBtn = document.getElementById("addBtn");
db.collection("lab3")
  .get()
  .then((querySnap) => {
    querySnap.forEach((doc) => {
      console.log(doc.data());
    });
  });
// $("#addBtn").click(emptyVal());
// if (addBtn != null) {
//   console.log("Btn found");
//   console.log(addBtn);
// } else {
//   console.log("failed to find btn");

// }
addBtn.addEventListener("click",function(){
  // console.log("hello")
  emptyVal()
})
function emptyVal() {
  var titleContent = $("#title").html();
  var artistContent=$("#artist").html();
  if(titleContent==""){
    alert("Please input title")
  }

  if(artistContent==""){
    alert("Please input artist")
  }
  // console.log(titleContent);
  
}
