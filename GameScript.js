function GameBoard(rows, cols){
	var cellsNumber = rows * cols;
	var rows = rows;
	var cols = cols;
	var empty = cellsNumber;


	this.initCells = function(){
		for (var i = 1; i <= cellsNumber - 1; i++){
			this[i] = i;
		}
		this[cellsNumber] = -1;
	};
	this.movePuzzlePart = function(index){
		if (empty != index){
			var temp = empty;
			this.cells[empty] = this.cells[index];
			this.cells[index] = -1;
			empty = index;
			return temp;
		}
		return index;
	};

	this.getPuzzlePartAt = function(index){
		return this.cells[index];
	};

	this.check = function(){
		for (cell in this.cells){
			if (cell != this.cells[cell]){
				if (cell != cellsNumber){
					return false;
				}
			}
		}
		return true;
	};

	this.cells = new this.initCells();
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
	this.check = function(){
		var result = board.check();
		if (result){
			alert("Win");
		} else {
			alert("Lose");
		}
	};

	var movePuzzlePart = function(index){
		oldID = "img" + index
		newID = "img" + index
		var newLocation = board.movePuzzlePart(index);
		var temp = document.getElementById(oldID).src;
		document.getElementById(oldID).src = "";
		document.getElementById(newID) = temp;
	};
	
	this.initilize = function(objName){
		board.initCells();
		var rows = config.getRows();
		var cols = config.getCols();
		var cells = rows * cols;
		for (var puzzlePart = 1; puzzlePart <= cells; puzzlePart++){
			var imgIndex = board.getPuzzlePartAt(puzzlePart);
			if (imgIndex != -1){
				var id = "img" + imgIndex;
				document.getElementById(id).src = config.getPathOf(imgIndex);
				document.getElementById(id).addEventListener( 'click', function(){movePuzzlePart(puzzlePart)}, false);
			}
		}
	};

	
};



var config = new GameConfig("3x3", 400, 400);
var game = new Game(config);