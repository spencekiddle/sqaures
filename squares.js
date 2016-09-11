document.addEventListener("DOMContentLoaded", function() {

	(function() {
	  // resize the canvas to fill browser window dynamically
	  window.addEventListener('resize', resizeCanvas, false);
		
		/** 
	  * The event handler for the link's onclick event. We give THIS as a
		* parameter (=the link element), ID of the canvas and a filename.
		*/
		document.getElementById('download').addEventListener('click', function() {
				downloadCanvas(this, 'squares', 'squares.png');
		}, false);
		
		// Variable declarations
		var canvas, colors, ctx;
		// Canvas
		canvas = document.getElementById('squares');
		// Colors
	  colors = [
	    "rgb(200,0,0)",
	    "rgb(255,140,0)",
	    "rgb(255,215,0)",
	    "rgb(0,128,0)",
	    "rgb(0,0,255)",
	    "rgb(75,0,130)",
	    "rgb(148,0,211)"
	  ];
		/**
		 * Creates the squares on the canvas, color codes them and lays them out in a 		 * grid based on the parameters passed to the method.
		 * @method
		 * @param Object opts Options object for passing parameters to the draw method
		 */
	  function draw(opts) {
			// Public
	    var 
				opts = opts || {},
				border = opts.border || 5,
				colorIdx = 0,
				column = opts.column || 0,
	      row = opts.row || 0,
	      squares = opts.squares || 100,
				squarePadding = opts.squarePadding || 2,
				squaresPerRow = opts.squaresPerRow || 100,
				squareSize = opts.squareSize || 10;

			// Private
			var
				canvasWidth = squaresPerRow*squareSize + border*2,
				canvasHeight = ( ( squares/squaresPerRow )*squareSize ) + border*2,
				rowMax = Math.floor(squaresPerRow*squareSize / squareSize),
				squareOffset = squareSize - squarePadding;
			
			
			resizeCanvas(canvasWidth, canvasHeight);
			
	    for (var i = 0; i < squares; i++) {
	      ctx.fillStyle = colors[colorIdx];
	      ctx.fillRect(border + (column * squareSize), border + (row * squareSize), squareOffset, squareOffset);
	      column++;
	      if (i % rowMax == rowMax - 1) {
	        row++;
	        column = 0;
	      }
	      if (i % squaresPerColor(squares) == squaresPerColor(squares) - 1) {
	        colorIdx++;
	      }
	    }
	  }
		
		/**
	 	 * This is the function that will take care of image extracting and
	 	 * setting proper filename for the download.
	 	 * IMPORTANT: Call it from within a onclick event.
		 * @method
		 * @param String link Anchor element used to trigger download
		 * @param String canvasId ID selector of the canvas element
		 * @param String filename Name of the file the is created for download
		 */
		function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
		}
		
		/**
		 * @todo This function needs to dynamically calculate the size of the 
		 * canvas based on the parameters passed to the draw method. Squares per row,
		 * square padding, border and total number of squares.
		 */
	  function resizeCanvas(width, height) {
	    canvas.height = height;
	    canvas.width = width;
	  }
		/**
		 * Based on the total number of colors provided and the total number of squares 	 * calculate the number of squares per color.
		 * @method
		 * @param Number squares Total number of squares
		 * @return Number Squares per color
		 */
	  function squaresPerColor(squares) {
	    var squares = squares || 100;
	    return Math.floor(squares / colors.length);
	  }

	  if (canvas.getContext) {
	    ctx = canvas.getContext('2d');
	    draw({
	      squares: 15300
	    });
	  } else {
	    // Fail
	  }
	})();
  
});