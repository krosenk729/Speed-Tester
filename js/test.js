var SPEEDTEST = (function(){
	function SpeedTest(testCode, testParams, reps){
		this.testCode = testCode;
		this.testParams = testParams || '';
		this.reps = reps || 10;
		this.latesttime = 0;
	}

	SpeedTest.prototype = {
		runQuick: function(){
			if( this.checkIsBroke() ){ 
				return; 
			}
			console.time('quick-test');
			this.testCode( this.testParams );
			console.timeEnd('quick-test');
			return 'Only the console can tell';
		},
		runTotalTest: function(){
			if( this.checkIsBroke() ){ 
				return; 
			}

			let timeBegin, timeEnd, timeArray = [], x = this.reps;

			for(let i = 0; i < x ; i++){
				timeBegin = +new Date();
				this.testCode( this.testParams );
				timeEnd = +new Date();
				timeArray.push( timeEnd - timeBegin );
			}

			console.dir(`Results are: ${timeArray}`);
			timeArray.sort();
			console.dir(`Min: ${timeArray[0]} ms, Max: ${timeArray[x - 1]} ms`);
			this.latesttime = timeArray.reduce( (t, i) => t + i ) / x ; 
			console.dir(`Avg: ${this.latesttime} ms in ${x} runs` );
			return `Average of ${this.latesttime} in ${x} runs <br>Check the console for the rest!`;
		},
		runAvgTest: function(){
			if( this.checkIsBroke() ){ return; }

			let timeBegin, timeEnd, timeSum = 0, x = this.reps;


			for(let i = 0; i < x ; i++){
				timeBegin = +new Date();
				this.testCode( this.testParams );
				timeEnd = +new Date();
				timeSum += timeEnd - timeBegin ;
			}
			this.latesttime = timeSum / x ;
			console.dir(`Avg: ${this.latesttime} ms in ${x} runs`);
			return `Avgerage ${this.latesttime} ms in ${x} runs`;
		},
		checkIsBroke: function(){
			return (this.testCode(this.testParams) === false);
		}

	};

	return SpeedTest;

})();