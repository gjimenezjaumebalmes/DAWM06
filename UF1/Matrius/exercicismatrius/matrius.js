let rows = document.querySelector("tbody").children
let matrix = []
for (var i = 0; i < rows.length; i++) {
    matrix.push(rows[i].children)
}
function paintAll() {
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            matrix[i][j].style.backgroundColor = "red";
        }
    }
}

function erase() {
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            matrix[i][j].style.backgroundColor = "white";
        }
    }
}


function paintLeftHalf() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        var laMeitat = trList.length / 2;
        for (let j = 0; j < trList.length; j++) {
            if (j < laMeitat) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
}

function paintRightHalf() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        var laMeitat = trList.length / 2;
        for (let j = 0; j < trList.length; j++) {
            if (j > laMeitat) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
}


function paintUpperHalf() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        var laMeitat = trList.length / 2;
        for (let j = 0; j < trList.length; j++) {
            if (i < laMeitat) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
}

function paintUpperTriangle () {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            if (j >= i) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }

}

function paintLowerTriangle() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            if (j < i) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
    /* matrix[1][0].style.backgroundColor = "red";
     matrix[1][1].style.backgroundColor = "red";
     matrix[2][0].style.backgroundColor = "red";
     matrix[2][1].style.backgroundColor = "red";
     matrix[2][2].style.backgroundColor = "red";*/
}



function paintPerimeter() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            // Columna size
            let maxBorderC = trList.length - 1;
            //Fila size
            let maxBorderF = rows.length - 1;
            matrix[0][j].style.backgroundColor = "red";
            matrix[i][0].style.backgroundColor = "red";
            matrix[i][maxBorderC].style.backgroundColor = "red";
            matrix[maxBorderF][j].style.backgroundColor = "red";
        }
    }

}

function paintCheckerboard() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            if (j % 2 != 0 && i % 2 != 0) {
                matrix[i][j].style.backgroundColor = "red";
            }
            if (j % 2 == 0 && i % 2 == 0) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
}

function paintCheckerboard2() {
    erase();
    for (let i = 0; i < rows.length; i++) {
        var trList = rows[i].children;
        for (let j = 0; j < trList.length; j++) {
            if (j % 2!= 0 && i % 2 == 0) {
                matrix[i][j].style.backgroundColor = "red";
            }
            if (j % 2 == 0 && i % 2 != 0) {
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }


    function paintNeighbours() {
        let inputX = document.getElementById("inputX").valueAsNumber;
        let inputY = document.getElementById("inputY").valueAsNumber;
        /*
        for () {
            for () {
         mes coses ...
        }
      }
        */
    }

    function countNeighbours(x,y) {
        let count = 0;
        /*
        for () {
            for () {
         mes coses ...
        }
        }
        */
        return count;
    }

    function paintAllNeighbours() {
        /*
        for () {
            for () {
            matrix[i][j].innerText = count;
        }
        }
        */
    }

}
