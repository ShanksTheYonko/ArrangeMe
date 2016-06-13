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

	this.cells = new this.initCells(cellsNumber);
};