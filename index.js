const board = document.getElementById("board");

var c = 0;
for (var i = 0; i < 9; i++) {
  const nd = document.createElement("div");
  nd.className = `part-${i}`;

  for (var j = 0; j < 9; j++) {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.id = `cell-${c}`;
    inp.className = "cell";
    inp.value = "";
    inp.max = "9";
    inp.min = "1";
    inp.maxLength = "1";
    nd.appendChild(inp);
    c++;
  }
  board.appendChild(nd);
}

for (var i = 2; i < 81; i += 3) {
  var ele = document.getElementById(`cell-${i}`);
  ele.style["border-right"] = "5px solid #959595";
}

for (var i = 0; i < 9; i++) {
  var t = i;
  var b = 72 + i;
  var l = i * 9;
  var r = (i + 1) * 9 - 1;

  var et = document.getElementById(`cell-${t}`);
  var eb = document.getElementById(`cell-${b}`);
  var el = document.getElementById(`cell-${l}`);
  var er = document.getElementById(`cell-${r}`);

  et.style["border-top"] = "5px solid #959595";
  eb.style["border-bottom"] = "5px solid #959595";
  el.style["border-left"] = "5px solid #959595";
  er.style["border-right"] = "5px solid #959595";
}

var mat = new Array(9);

for (var i = 0; i < 9; i++) {
  mat[i] = new Array(9);
}

const solveBtn = document.getElementById("solve-btn");
const resetBtn = document.getElementById("reset-btn");

solveBtn.addEventListener("click", () => {
  for (var i = 0; i < 81; i++) {
    const ele = document.getElementById(`cell-${i}`);
    const valstr = ele.value;
    var x = Math.floor(i / 9);
    var y = i % 9;

    var val;
    if (valstr === "") val = -1;
    else val = parseInt(valstr);
    mat[x][y] = val;
  }

  if (!validSudoku() || !solveSudoku(0)) {
    fillMat(0);
    renderMat();
  } else {
    renderMat();
  }
});

function validSudoku() {
  var row = new Array(9);
  var col = new Array(9);
  var box = new Array(9);

  for (var i = 0; i < 9; i++) {
    row[i] = new Array(9);
    col[i] = new Array(9);
    box[i] = new Array(9);
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      row[i][j] = 0;
      col[i][j] = 0;
      box[i][j] = 0;
    }
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (isNaN(mat[i][j]) || mat[i][j] == 0) return false;
      if (mat[i][j] == -1) continue;
      var x = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      var val = mat[i][j] - 1;
      if (row[i][val] > 0 || col[j][val] > 0 || box[x][val] > 0) return false;
      row[i][val] += 1;
      col[j][val] += 1;
      box[x][val] += 1;
    }
  }

  return true;
}

function fillMat() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      mat[i][j] = 0;
    }
  }
}

function renderMat() {
  for (var i = 0; i < 81; i++) {
    const ele = document.getElementById(`cell-${i}`);
    var x = Math.floor(i / 9);
    var y = i % 9;

    ele.value = `${mat[x][y]}`;
  }
}

resetBtn.addEventListener("click", () => {
  for (var i = 0; i < 81; i++) {
    const ele = document.getElementById(`cell-${i}`);
    ele.value = "";
  }
});

function solveSudoku() {
  var i = 0,
    j = 0;

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (mat[i][j] == -1) break;
    }
    if (j < 9 && mat[i][j] == -1) break;
  }

  if (i == 9 && j == 9) return true;

  for (var x = 1; x <= 9; x++) {
    mat[i][j] = x;
    if (validSudoku() && solveSudoku()) return true;
    mat[i][j] = -1;
  }

  return false;
}
