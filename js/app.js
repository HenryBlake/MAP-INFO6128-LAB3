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
$("#addBtn").click(()=>{
  console.log("hello")
});
// }
addBtn.addEventListener("click",function(){
  console.log("hello")
})
function emptyVal() {
  var titleContent = $("#title").html();
  console.log(titleContent);
}
