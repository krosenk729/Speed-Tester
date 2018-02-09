// import * as TESTFACTORY from './test.js';
// import * as YOURCODE from './your-code.js';

$(document).ready(function(){
	$('button').click(function(){
		let t,
		numRuns = $('#numruns').val().trim(),
		testRun = ($(this).parent().attr('id') === '1') 
			? new SPEEDTEST(YOURCODE.testThisCode, YOURCODE.paramsFor1, numRuns) 
			: new SPEEDTEST(YOURCODE.testOtherCode, YOURCODE.paramsFor2, numRuns);

		switch($(this).data('type')){
			case "quick":
			default:
				t = testRun.runQuick();
				break;
			case "avg":
				t = testRun.runTotalTest();
				break;
			case "detail":
				t = testRun.runAvgTest();
				break;
		}

		$(this).parent().find('.test-results').html(t);
	});

	$('#instructions, #closemodal').click(function(){
		$('.modal-screen').toggleClass('hideme');
		$('.speed-test').toggleClass('trimme');
	});

});

