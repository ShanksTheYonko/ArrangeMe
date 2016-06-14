function GameBoard(rows, cols){
	var cellsNumber = rows * cols;
	var cells= [];
	var empty = cellsNumber;
	var RANDOM_LEVAL = 100;

	this.initCells = function(){
		for (var i = 1; i <= cellsNumber; i++){
			cells[i] = i;
		}
	};

	this.shuffle = function(){
		var currIndex = 0;
		while (currIndex < RANDOM_LEVAL){
			var searching = true;
			var randomNumber = -1;
			while (searching) {
				randomNumber = getRandomNumber(cellsNumber);
				searching = !isLegal(randomNumber);
				console.log("Random:" + randomNumber + "islegal: " + searching);
			}
			movePart(randomNumber);
			currIndex++;
		}
		console.log(cells);
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
			console.log(cells);
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
		console.log(cells);
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


function GameConfig(version, tableHeight, tableWidth){
	this.version = version;
	var fileType = "";
	var baseFolder = "";
	var tableHeight = tableHeight;
	var tableWidth = tableWidth;
	var imgHeight = 0;
	var imgWidth = 0;
	var rows = 0;
	var cols = 0;
	this.initConfig = function(){
		sizes = {"3x3" : 3};
		size = sizes[version];
		imgHeight = tableHeight / size;
		imgWidth = tableWidth / size;
		baseFolder = version + "/";
		fileType = ".png";
		rows = size;
		cols = size;
	}
	this.getImgHeight = function(){
		return imgHeight;
	};
	this.getImgWidth = function(){
		return imgWidth;
	};
	this.getBaseFolder = function(){
		return baseFolder;
	};
	this.getRows = function(){
		return rows;
	}
	this.getCols = function(){
		return cols;
	}
	this.getPathOf = function(index){
		return baseFolder + index + fileType;
	};
	this.initConfig();
	
}


function Game(config){
	var config = config;
	var board = new GameBoard(config.getRows(), config.getCols());
	

	var movePuzzlePart = function(elem){
		var check = function(){
			var result = board.check();
			if (result){
				alert("Win");
			}
		};
		var id = parseInt(elem.currentTarget.id);
		if (board.isLegalMove(id)){
			var newLocation = board.movePuzzlePart(id);
			var oldID = id;
			var newID = newLocation;
			var temp = document.getElementById(oldID).src;
			document.getElementById(oldID).src = "3x3/9.png"; // TODO :change this
			document.getElementById(newID).src = temp;
		}
		check();
	};
	
	this.initilize = function(objName){
		var rows = config.getRows();
		var cols = config.getCols();
		var cells = rows * cols;
		var puzzlePart = 1;
		tableID = "Puzzle";
			var table = document.createElement("TABLE");
			table.id = tableID;
		for (var rowIndex = 1; rowIndex <= rows; rowIndex++){
			document.body.appendChild(table);
			var row = document.createElement("TR");
			row.id = "row" + rowIndex;
			document.getElementById(tableID).appendChild(row);
			for (var colIndex = 1 ; colIndex <= cols; colIndex++){
				var imgIndex = board.getPuzzlePartAt(puzzlePart);
				var col = document.createElement("TD");
				var img = document.createElement("IMG");
				col.setAttribute("id","col"+colIndex);
				col.id = "cell"+ rowIndex + "," + colIndex;
				img.id = puzzlePart;
				img.src = config.getPathOf(imgIndex);
				img.onclick = movePuzzlePart;
				col.appendChild(img);
				row.appendChild(col);
				puzzlePart++;
			}
		}
	};
};




function startGame(){
	config = new GameConfig("3x3", 400, 400);
	game = new Game(config);
	game.initilize();
};




var config = 0;
var game = 0;