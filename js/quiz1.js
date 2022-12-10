// 請問下列程式碼印出的順序為何？
function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  console.log(3);
  // return
}
console.log(4);
syncF();
console.log(5);

// 41352
