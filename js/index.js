$(document).ready(function () {
  let PIXELSIZE = 2;
  let REPEATSX = 5;
  let REPEATSY = 5;
  let DIMENSION = 50;
  let canvas = $("#mycanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = DIMENSION * REPEATSX * PIXELSIZE;
  let canvasHeight = DIMENSION * REPEATSY * PIXELSIZE;
  let selectedBox = null;
  canvas.attr('width', canvasWidth);
  canvas.attr('height', canvasHeight);
 
 
// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyAZrxTHYL9JuylokfejRzymZw_VxDM8ITM",
    authDomain: "mycookingmenu-wenyu.firebaseapp.com",
    databaseURL: "https://mycookingmenu-wenyu.firebaseio.com",
    projectId: "mycookingmenu-wenyu",
    storageBucket: "mycookingmenu-wenyu.appspot.com",
    messagingSenderId: "833883603063",
    appId: "1:833883603063:web:e57e8ef5ee8ce888c70672"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

db.collection('app').onSnapshot(function (grid) {
  for(let change of grid.docChanges()) {
    if (!change.doc) continue;
    let key = change.doc.id;
    console.log(key);
    let data = change.doc.data().data;
    if (key == 'grid') continue;

    let coord = key.split(",");
    let json = data;
    // let pixelData = JSON.parse(json);
    console.log(json);
  }
});



  // Draw grid.
  ctx.strokeStyle = '#cccccc';
  for (let i = 0; i < DIMENSION * REPEATSX; ++i) {
    if (i % DIMENSION != 0) { continue; }
    x = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Canvas Behaviors.
  canvas.click(function (e) {
    selectBox(e);
  });
  canvas.mousemove(function (e) {
    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    console.log(pixel);
    if (pixel[0] < 0 || pixel[1] < 0 ||
      pixel[0] >= REPEATSX || pixel[1] >= REPEATSY) {
      return;
    }
    if (!selectedBox) {
      selectedBox = $("<div id=selectedBox></div");
      selectedBox.css({ width: DIMENSION * PIXELSIZE - 2, height: DIMENSION * PIXELSIZE - 2 });
      $("#mycanvasWrapper").prepend(selectedBox);
    }
    selectedBox.css({
      left: pixel[0] * PIXELSIZE * DIMENSION + 1,
      top: pixel[1] * PIXELSIZE * DIMENSION
    });
  });

  let SELECTED = 0;
  function selectBox(e) {
    if (SELECTED) return;
    SELECTED = 1;

    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    window.location = "write.php?x=" + pixel[0] + "&y=" + pixel[1];
  }



});