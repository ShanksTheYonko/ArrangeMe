function GameBoard(rows, cols){
	var cellsNumber = rows * cols;
	var rows = rows;
	var cols = cols;
	var empty = cellsNumber;


	this.initCells = function(cellsNumber){
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
		}
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

	this.cells = new this.initCells(cellsNumber);
};


function GameConfig(version, tableHeight, tableWidth){
	this.version = version;
	var fileType = "";
	var baseFolder = "";
	var tableHeight = tableHeight;
	var tableWidth = tableWidth;
	var imgHeight = 0;
	var imgWidth = 0;
	this.initConfig = function(){
		sizes = {"3x3" : 3.0};
		size = sizes[version];
		imgHeight = tableHeight / size;
		imgWidth = tableWidth / size;
		baseFolder = version + "/";
		fileType = ".png";
	}
	this.getImgHeight = function(){
		return imgHeight;
	};
	this.getImgWidth = function(){
		return imgWidth;
	};
	this.getBaseFolder = function(){
		return baseFolder;
	}
	this.getPathOf = function(index){
		return baseFolder + index + fileType;
	};
	this.initConfig();
}


var example = new GameBoard(3,3);

