"use strict";

//flagがtrueのとき、マルのターン,falseのとき
let flag = true;

//ターン数をカウント
let counter = 9;

//square取得
const squares = document.querySelectorAll(".square");
const squaresArray = [].slice.call(squares);


//message取得
const messages = document.querySelectorAll('.message-list li');
const messagesArray = [].slice.call(messages);

function setMessage(id) {
  messagesArray.forEach(function (message) {
    if (message.id === id) {
      message.classList.remove('js-hidden');
    } else {
      message.classList.add('js-hidden');
    }
  }); 
}

//マス判定
function filterById(targetArray, idArray) {
  return targetArray.filter(function(e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  });
}

const line1 = filterById(squaresArray, ['1-1', '1-2', '1-3']);
const line2 = filterById(squaresArray, ['2-1', '2-2', '2-3']);
const line3 = filterById(squaresArray, ['3-1', '3-2', '3-3']);
const line4 = filterById(squaresArray, ['1-1', '2-1', '3-1']);
const line5 = filterById(squaresArray, ['1-2', '2-2', '3-2']);
const line6 = filterById(squaresArray, ['1-3', '2-3', '3-3']);
const line7 = filterById(squaresArray, ['1-1', '2-2', '3-3']);
const line8 = filterById(squaresArray, ['1-3', '2-2', '3-1']);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

// ウィニングライン(勝ったときに入れるハイライト)を入れる変数
let winningLine = null;

// 勝敗判定
function isWinner(symbol) { 
  const result = lineArray.some(function (line) {
    const subResult = line.every(function (square) {
      if (symbol === 'maru') {
        return square.classList.contains('js-maru-checked');
      } else 
      if (symbol === 'batsu') {
        return square.classList.contains('js-batsu-checked');
      }
    });

    // trueを返したlineをwinningLineに代入
    if (subResult) { winningLine = line }

    return subResult;
  });
  return result;
}


// ゲーム終了時の関数
function gameOver() {
  // 全てのマスをクリックできないようにする
  squaresArray.forEach(function (square) {
    square.classList.add('js-unclickable');
  });

  // 勝ったときのマス目をハイライトする
  if (winningLine) {
    winningLine.forEach(function (square) {
      square.classList.add('js-highLight');
    });
  }
}


//クリック時の関数
squaresArray.forEach(function(square) {
  square.addEventListener("click", function() {
    if (flag === true) {
      square.classList.add("js-maru-checked");
      square.classList.add("js-unclickable");
      document.getElementById("turn-cross").classList.add("active");
      document.getElementById("turn-circle").classList.remove("active");

      // マル勝利判定
      if (isWinner('maru')) {
        setMessage('maru-win');
        gameOver();
        return;
      }

      flag = false;
    } else {
      square.classList.add("js-batsu-checked");
      square.classList.add("js-unclickable");
      document.getElementById("turn-circle").classList.add("active");
      document.getElementById("turn-cross").classList.remove("active");

      // バツ勝利判定
      if (isWinner('batsu')) {
        setMessage('batsu-win');
        gameOver();
        return;
      }

      flag = true;
    }

    counter--;
    //引き分け時
    if (counter === 0) {
      setMessage('draw');
      gameOver();
    }
  });
});


// リセットボタン取得
const resetBtn = document.getElementById('reset-btn');


// リセットボタンでゲーム初期化
function initGame() {
  flag = false;
  counter = 9;
  winningLine = null;
  squaresArray.forEach(function (square) {
    square.classList.remove('js-maru-checked');
    square.classList.remove('js-batsu-checked');
    square.classList.remove('js-unclickable');
    square.classList.remove('js-highLight');
  });
  setMessage('starting');
}

resetBtn.addEventListener('click', function () {
  initGame();
});