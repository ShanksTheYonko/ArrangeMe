function GameBoard(rows, cols){
	var cellsNumber = rows * cols;
	var cells= [];
	var empty = cellsNumber;
	var RANDOM_LEVAL = 100;

	this.initCells = function(){
		for (var i = 1; i <= cellsNumber; i++){
			cells[i] = i;
		}
		empty = cellsNumber;
	};

	this.shuffle = function(){
		var currIndex = 0;
		while (currIndex < RANDOM_LEVAL){
			var searching = true;
			var randomNumber = -1;
			while (searching) {
				randomNumber = getRandomNumber(cellsNumber);
				searching = !isLegal(randomNumber);
			}
			movePart(randomNumber);
			currIndex++;
		}
	};
	this.movePuzzlePart = function(index){
		return movePart(index);
	};

	var movePart = function(index){
		if (empty != parseInt(index)){
			console.log("Moving " + index + " to" + empty);
			var temp = cells[empty];
			cells[empty] = cells[index];
			cells[index] = temp;
			var indexTemp = empty;
			empty = index;
			return indexTemp;
		} else {
			alert("Strange");
		}
		return index;
	};

	this.getPuzzlePartAt = function(index){
		return cells[index];
	};

	this.isLegalMove = function(index)
	{
		return isLegal(index);
	};

	var isLegal = function(index){
		if (index == empty){
			return false;
		}
		var current = getLocationTuple(index);
		var newLoc = getLocationTuple(empty);
		var rowDistance = Math.abs(current[0] - newLoc[0]);
		var colDistance = Math.abs(current[1] - newLoc[1]);
		return 1 == (rowDistance + colDistance);
	};

	var getLocationTuple = function(index){
		var tempIndex = index - 1;
		return [Math.floor(tempIndex / cols), tempIndex % cols];
	};

	this.check = function(){
		for (cell in cells){
			if (cell != cells[cell]){
				return false;
			}
		}
		return true;
	};

	var getRandomNumber = function(rangeMax){
		return Math.floor((Math.random() * rangeMax) + 1);
	};
	this.initCells();
	this.shuffle();
};


function GameConfig(rows, cols, tableHeight, tableWidth){
	var fileType = "";
	var baseFolder = "";
	var tableHeight = tableHeight;
	var tableWidth = tableWidth;
	var cellHeight = 0;
	var cellWidth = 0;
	this.initConfig = function(){
		imgHeight = tableHeight / rows;
		imgWidth = tableWidth / cols;
		fileType = ".png";
	}
	this.getCellHeight = function(){
		return imgHeight;
	};
	this.getCellWidth = function(){
		return imgWidth;
	};
	this.getRows = function(){
		return rows;
	};
	this.getCols = function(){
		return cols;
	};
	this.getPathOf = function(index){
		return baseFolder + index + fileType;
	};
	this.initConfig();
	
}


function Game(config){
	var config = config;
	var board = new GameBoard(config.getRows(), config.getCols());
	var tableID = "Puzzle";

	var movePuzzlePart = function(elem){
		var check = function(){
			var result = board.check();
			if (result){
				alert("Win");
			}
		};
		var oldID = parseInt(elem.currentTarget.id);
		if (board.isLegalMove(oldID)){
			var newID = board.movePuzzlePart(oldID);
			var oldCell = document.getElementById(oldID);
			var tempHtml = oldCell.innerHTML;
			document.getElementById(oldID).innerHTML = document.getElementById(newID).innerHTML;
			document.getElementById(newID).innerHTML = tempHtml;
		}
		check();
	};
	
	this.resetGame = function(){
		document.body.removeChild(document.getElementById(tableID));
		board.initCells();
	}

	this.initilize = function(){
		var rows = config.getRows();
		var cols = config.getCols();
		var cells = rows * cols;
		var puzzlePart = 1;
		var table = document.createElement("table");
		table.id = tableID;
		table.border = 1;
		document.body.appendChild(table);
		for (var rowIndex = 1; rowIndex <= rows; rowIndex++){
			var row = document.createElement("tr");
			row.height = config.getCellHeight();
			row.id = "row" + rowIndex;
			document.getElementById(tableID).appendChild(row);
			for (var colIndex = 1 ; colIndex <= cols; colIndex++){
				var imgIndex = board.getPuzzlePartAt(puzzlePart);
				var col = document.createElement("td");
				var currentCell = document.createElement("p");
				col.width = config.getCellWidth();
				col.id = puzzlePart;
				col.align = "center";
				if (imgIndex != cells){
					currentCell.innerHTML = imgIndex;
				}
				col.onclick = movePuzzlePart;
				col.appendChild(currentCell);
				row.appendChild(col);
				puzzlePart++;
			}
		}
	};
};




function startGame(){
	config = new GameConfig(3,3, window.innerHeight , window.innerWidth);
	game = new Game(config);
	game.initilize();
};


function resetGame(){
	game.resetGame();
	game.initilize();
}



var config = 0;
var game = 0;