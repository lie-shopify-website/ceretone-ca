
  
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('result');

  if(myParam){
      $('.step').removeClass('current').removeClass('visible').hide();
      $('.step.final').addClass('current').addClass('visible').show();
     $('.main__form .inner .main__steps .step.final>.regular__block, .main__form .container>p').hide();
      fetch(`https://ceretone-quiz-production.up.railway.app/hearing-test/api/hearing-tests/?result=${myParam}`)
      .then((response) => {
          if (!response.ok) { // Don't forget this part!
              throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
      })
      .then((response) => {
          console.log(response);
        // Store results in localStorage to persist across page refreshes
				localStorage.setItem('hearingTestResults', JSON.stringify(response));
				
				// Update UI with results
				let selector_left = '.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .results__bar .active__bar span.green'
				let selector_right = '.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .results__bar .active__bar span.red'				
				let left_ear_category = response.result.left_ear_category;
				let right_ear_category = response.result.right_ear_category;
				let left_color = '#65bf73';
                let left_text = 'good hearing'
				if (left_ear_category == 'significant_loss') {
					left_color = '#e50a0a';
                    left_text = 'significant hearing loss'
				}else if (left_ear_category == 'loss') {
					left_color = '#f5a623';
                    left_text = 'hearing loss'
				}
				let right_color = '#65bf73';
                let right_text = 'good hearing'
				if (right_ear_category == 'significant_loss') {
					right_color = '#e50a0a';
                    right_text = 'significant hearing loss'
				}else if (right_ear_category == 'loss') {
					right_color = '#f5a623';
                    right_text = 'hearing loss'
				}	

        console.log($('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(0))
                console.log(left_text)
        console.log($('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(1))
                console.log(right_text)

                $('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(0).text(left_text)
                $('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(1).text(right_text)
				$('.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .pointer .inn').eq(0).css('left', response.result.left_ear_score+5 + '%')
				$('.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .pointer .inn').eq(1).css('left', response.result.right_ear_score+5 + '%')
                
				$(selector_left).css({
					'width': response.result.left_ear_score+10 + '%' ,
					'background-color': left_color
				})

				if(right_ear_category == 'good' && left_ear_category == 'good'){
					$('.main__form .inner .main__steps .step.final > .regular__block .hearing__box').eq(1).hide();
					$('.main__form .inner .main__steps .step.final > .regular__block .improve__box').hide();
				}

				$(selector_right).css({
					'width': response.result.right_ear_score+5 + '%',
					'background-color': right_color
				})

              $('.main__form .inner .main__steps .step.final>.regular__block').fadeIn();
      })
    .catch((r)=>{
      console.log(r);
      $('.step').eq(0).addClass('current').addClass('visible').show();
      $('.step.final').removeClass('current').removeClass('visible').hide();
     $('.main__form .inner .main__steps .step.final>.regular__block, .main__form .container>p').show();
    })
}

$(document).ready(function(){
  $('.main__form').css('opacity', 1)
	function validateEmail($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}

	// Hearing test data object to store all test information
let hearingTestData = {
    demographics: {
        gender: "No answer",
        ageCategory: "45-49"
    },
    puretone: {
        answers: {
            left: {
                '1000': { threshold: 0 },
                '2000': { threshold: 0 },
                '4000': { threshold: 0 },
                '6000': { threshold: 0 },
                'rainbow': { threshold: 0, mcl: 0 }
            },
            right: {
                '1000': { threshold: 0 },
                '2000': { threshold: 0 },
                '4000': { threshold: 0 },
                '6000': { threshold: 0, mcl: 0 },
                'rainbow': { threshold: 0, mcl: 0 }
            }
        }
		},
		questions: {
			answers: []
		},
		testId: Math.floor(Math.random() * 1000000).toString() // Unique ID for this test session
	};
	
	// Clear any existing data in localStorage
	localStorage.removeItem('hearingTestResults');

	// Function to submit hearing test data to backend
	function submitHearingTest(email) {
		let dataToSubmit = { ...hearingTestData };
		
		if (email) {
			dataToSubmit.email = email;
		}
		
		console.log("Submitting hearing test data:", dataToSubmit);
		$('.main__form .inner .main__steps .step.final>.regular__block').hide();
		// Submit data to backend
		$.ajax({
			type: "POST",
			url: "https://ceretone-quiz-production.up.railway.app/hearing-test/api/submit/",
			data: JSON.stringify(dataToSubmit),
			contentType: "application/json",
			headers: {
				"Accept": "application/json"
			},
			success: function(response) {
				console.log("HEARING TEST RESULTS RECEIVED:", response);
				
				// Store results in localStorage to persist across page refreshes
				localStorage.setItem('hearingTestResults', JSON.stringify(response));
				
				// Update UI with results
				let selector_left = '.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .results__bar .active__bar span.green'
				let selector_right = '.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .results__bar .active__bar span.red'				
				let left_ear_category = response.result.left_ear_category;
				let right_ear_category = response.result.right_ear_category;
				let left_color = '#65bf73';
				let left_text = 'good hearing'
				if (left_ear_category == 'significant_loss') {
					left_color = '#e50a0a';
                    left_text = 'significant hearing loss'
				}else if (left_ear_category == 'loss') {
					left_color = '#f5a623';
                    left_text = 'hearing loss'
				}
				let right_color = '#65bf73';
                let right_text = 'good hearing'
				if (right_ear_category == 'significant_loss') {
					right_color = '#e50a0a';
                    right_text = 'significant hearing loss'
				}else if (right_ear_category == 'loss') {
					right_color = '#f5a623';
                    right_text = 'hearing loss'
				}	

        console.log($('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(0))
                console.log(left_text)
        console.log($('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(1))
                console.log(right_text)

                $('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(0).text(left_text)
                $('.main__form .inner .main__steps .step.final>.regular__block .ears__results>.elem>.top>span span').eq(1).text(right_text)
				$('.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .pointer .inn').eq(0).css('left', response.result.left_ear_score+5 + '%')
				$('.main__form .inner .main__steps .step.final > .regular__block .ears__results > .elem .pointer .inn').eq(1).css('left', response.result.right_ear_score+5 + '%')
                
				$(selector_left).css({
					'width': response.result.left_ear_score+10 + '%' ,
					'background-color': left_color
				})

				$(selector_right).css({
					'width': response.result.right_ear_score+5 + '%',
					'background-color': right_color
				})

				if(right_ear_category == 'good' && left_ear_category == 'good'){
                    $('.main__form .inner .main__steps .regular__block>h2').eq(2).hide();
					$('.main__form .inner .main__steps .step.final > .regular__block .hearing__box').eq(1).hide();
					$('.main__form .inner .main__steps .step.final > .regular__block .improve__box').hide();
				}

				$(selector_right).css({
					'width': response.result.right_ear_score+5 + '%',
					'background-color': right_color
				})
              $('.main__form .inner .top__part').hide();
              $('.main__form .inner .main__steps .step.final>.regular__block').fadeIn();
				//displayResults(response);
			},
			error: function(error) {
				console.error("Error submitting hearing test:", error);
				alert("There was an error submitting your hearing test. Please try again.");
			}
		});
		
		return false; // Prevent form submission
	}
	
	// Function to display results on the page
	function displayResults(results) {
		if (!results || !results.testResult) {
			console.error("Invalid results format:", results);
			return;
		}
		
		// Access the final scores
		const finalScores = results.testResult.final.score;
		const finalCategories = results.testResult.final.category;
		
		console.log("Left ear score:", finalScores.left, finalCategories.left);
		console.log("Right ear score:", finalScores.right, finalCategories.right);
		
		// Find the results display elements
		const leftEarScore = $('.ears__results .elem:first-child .results__bar .active__bar span');
		const rightEarScore = $('.ears__results .elem:last-child .results__bar .active__bar span');
		
		// Update the width of the score bars based on results
		if (leftEarScore.length) {
			leftEarScore.css('width', finalScores.left + '%');
		}
		
		if (rightEarScore.length) {
			rightEarScore.css('width', finalScores.right + '%');
		}
		
		// Update the result text descriptions
		const leftEarText = $('.ears__results .elem:first-child .top span');
		const rightEarText = $('.ears__results .elem:last-child .top span');
		
		if (leftEarText.length) {
			leftEarText.html('May have <span>' + finalCategories.left.replace('_', ' ') + '</span>');
		}
		
		if (rightEarText.length) {
			rightEarText.html('May have <span>' + finalCategories.right.replace('_', ' ') + '</span>');
		}
		
		// Navigate to the final results page
		$('.step').removeClass('current visible').css('display', 'none');
		$('.step.final').addClass('current visible').css('display', 'block');
		
		// Update progress bar to 100%
		initProgress(100);
	}

	// Track current ear being tested
	let currentEar = "right"; // Start with right ear
	let currentFrequency = "rainbow"; // Default to speech test (rainbow)
	let testStage = ""; // mcl or threshold
	
	// Helper function to update hearing test data with volume values
	function updateHearingTestData(ear, freq, stage, value) {
		// Allow values starting from 0
		const normalizedValue = Math.max(value, 0);
		
		if (stage === "mcl") {
			hearingTestData.puretone.answers[ear][freq].mcl = normalizedValue * 100;
		} else {
			hearingTestData.puretone.answers[ear][freq].threshold = normalizedValue * 100;
		}
		console.log(`Updated ${ear} ear ${freq} ${stage} to ${normalizedValue * 100}%`);
		
		// Log the full data structure for debugging
		console.log("Current hearing test data:", JSON.stringify(hearingTestData));
	}
	
	// Update questionnaire data
	function updateQuestionnaireData(questionID, question, answerID, answer) {
		hearingTestData.questions.answers.push({
			question: {
				id: questionID,
				textValueLocalized: question
			},
			answer: {
				id: answerID,
				textValueLocalized: answer
			}
		});
		console.log(`Added question ${questionID}: "${question}" with answer "${answer}"`);
	}

	$('.email>input').on('input' ,function(){
		if ($(this).val().length == 0 ||  !validateEmail($(this).val())) {
			$(this).closest(".step").find(".btn>a").addClass('disabled');
		} else {
			$(this).closest(".step").find(".btn>a").removeClass('disabled');
		}
	});
	$('form').on('submit', function(e) {
		e.preventDefault();
	})

	// Handle email submission and test result submission
	$('.step .btn>a.regular-btn:not(.red-btn)').on('click', function(e) {
		e.preventDefault(); // Prevent default link behavior
		// If we're in the email submission step (final step)
		if ($(this).closest('.step').find('.email').length > 0) {
			let email = $(this).closest('.step').find('.email>input').val();
			if (email && validateEmail(email)) {
				submitHearingTest(email);
				return false; // Prevent further processing
			}
		}
		
		// If we're in the results step (submit without email)
		if ($(this).closest('.step').hasClass('final')) {
			// Submit without email if not already submitted
			if (!hearingTestData.submitted) {
				submitHearingTest();
				hearingTestData.submitted = true;
				return false; // Prevent further processing
			}
		}
		
		// Track hearing test stage based on the step heading
		let stepHeading = $(this).closest('.step').find('h2').text();
		let data_ear = $(this).closest('.step').data('ear');
		// Capture questionnaire responses
		if ($(this).closest('.step').find('.plates__').length > 0) {
			let questionElement = $(this).closest('.step').find('.question__title p');
			if (questionElement.length > 0) {
				let questionText = questionElement.text();
				let selectedAnswer = $(this).closest('.step').find('.plates__ .elem.current');
				
				if (selectedAnswer.length > 0) {
					let answerText = selectedAnswer.text().trim();
					let questionID = "Q" + (hearingTestData.questions.answers.length + 1);
					let answerID = questionID + "A";
					updateQuestionnaireData(questionID, questionText, answerID, answerText);
				}
			}
		}
		
		// Capture hearing test data for right ear
		if (data_ear && data_ear == "right") {
			currentEar = "right";
			
	// Determine which frequency we're testing
	let freqTitle = $(this).closest('.step').find('h2').text();
	let freqParagraph = $(this).closest('.step').find('p').text();
	let freqId = $(this).closest('.step').find('.audio__bar input').prop('id');

	// Check for frequency indicators in the heading or description
	if (freqId.includes("1000") || freqParagraph.includes("1000")) {
		currentFrequency = "1000";
	} else if (freqId.includes("2000") || freqParagraph.includes("2000")) {
		currentFrequency = "2000";
	} else if (freqId.includes("4000") || freqParagraph.includes("4000")) {
		currentFrequency = "4000";
	} else if (freqId.includes("6000") || freqParagraph.includes("6000")) {
		currentFrequency = "6000";
	} else if (freqTitle.includes("speech") || freqParagraph.includes("speech") || 
			   freqTitle.includes("rainbow") || freqParagraph.includes("rainbow") ||
			   freqTitle.includes("words") || freqParagraph.includes("words")) {
		currentFrequency = "rainbow"; // Speech test
	} else {
		// If no specific frequency is found, check for step index to determine test type
		let stepIndex = parseInt($(this).closest('.step').attr('data-value')) || 0;
		
		// Use step index as a fallback to determine frequency (Right ear: 56-64)
		if (stepIndex == 56 || stepIndex == 70) { // 1000Hz
			currentFrequency = "1000";
		} else if (stepIndex == 59 || stepIndex == 72) { // 2000Hz
			currentFrequency = "2000";
		} else if (stepIndex == 62 || stepIndex == 74) { // 4000Hz
			currentFrequency = "4000";
		} else if (stepIndex == 64 || stepIndex == 77) { // 6000Hz
			currentFrequency = "6000";
		} else {
			currentFrequency = "rainbow"; // Default to speech test
		}
	}
	
	console.log(`Detected frequency test: ${currentFrequency} for ${currentEar} ear`);
			
			// Determine what kind of test this is (mcl or threshold)
			let testDescription = $(this).closest('.step').find('p').text();
			if (testDescription.includes("LOUDEST") || testDescription.includes("comfortable")) {
				testStage = "mcl";
			} else if (testDescription.includes("barely hear")) {
				testStage = "threshold";
			} else if (testDescription.includes("just loud enough")) {
				testStage = "threshold"; // For speech recognition
			}
			
			// Get the current volume value
			let volumeValue = parseFloat($(this).closest('.step').find('.audio__bar>input').val());
			
			// Update our hearing test data
			if(volumeValue > 40){
				volumeValue = volumeValue - 10;
			}
			updateHearingTestData(currentEar, currentFrequency, testStage, volumeValue);
		}
		
		// Capture hearing test data for left ear
		if (data_ear && data_ear == "left"){
			currentEar = "left";
			
	// Determine which frequency we're testing
	let freqTitle = $(this).closest('.step').find('h2').text();
	let freqParagraph = $(this).closest('.step').find('p').text();
	let freqId = $(this).closest('.step').find('.audio__bar input').prop('id');

	// Check for frequency indicators in the heading or description
	if (freqId.includes("1000") || freqParagraph.includes("1000")) {
		currentFrequency = "1000";
	} else if (freqId.includes("2000") || freqParagraph.includes("2000")) {
		currentFrequency = "2000";
	} else if (freqId.includes("4000") || freqParagraph.includes("4000")) {
		currentFrequency = "4000";
	} else if (freqId.includes("6000") || freqParagraph.includes("6000")) {
		currentFrequency = "6000";
	} else if (freqTitle.includes("speech") || freqParagraph.includes("speech") || 
			   freqTitle.includes("rainbow") || freqParagraph.includes("rainbow") ||
			   freqTitle.includes("words") || freqParagraph.includes("words")) {
		currentFrequency = "rainbow"; // Speech test
	} else {
		// If no specific frequency is found, check for step index to determine test type
		let stepIndex = parseInt($(this).closest('.step').attr('data-value')) || 0;
		
		// Use step index as a fallback to determine frequency (Right ear: 56-64)
		if (stepIndex == 56 || stepIndex == 70) { // 1000Hz
			currentFrequency = "1000";
		} else if (stepIndex == 59 || stepIndex == 72) { // 2000Hz
			currentFrequency = "2000";
		} else if (stepIndex == 62 || stepIndex == 74) { // 4000Hz
			currentFrequency = "4000";
		} else if (stepIndex == 64 || stepIndex == 77) { // 6000Hz
			currentFrequency = "6000";
		} else {
			currentFrequency = "rainbow"; // Default to speech test
		}
	}
	
	console.log(`Detected frequency test: ${currentFrequency} for ${currentEar} ear`);
			
			// Determine what kind of test this is (mcl or threshold)
			let testDescription = $(this).closest('.step').find('p').text();
			if (testDescription.includes("LOUDEST") || testDescription.includes("comfortable")) {
				testStage = "mcl";
			} else if (testDescription.includes("barely hear")) {
				testStage = "threshold";
			} else if (testDescription.includes("just loud enough")) {
				testStage = "threshold"; // For speech recognition
			}
			
			// Get the current volume value
			let volumeValue = parseFloat($(this).closest('.step').find('.audio__bar>input').val());
			if(volumeValue > 40){
				volumeValue = volumeValue - 10;
			}
			// Update our hearing test data
			updateHearingTestData(currentEar, currentFrequency, testStage, volumeValue);
		}
	});


	$('.privacy__popup--btn').on('click' ,function(e){
		e.preventDefault();
		$('.privacy__popup').fadeIn(300);
		$("body,html").css("overflow-y" ,"hidden");
	});
	$('.privacy__popup .btn>a').on("click" ,function(e){
		e.preventDefault();
		$(this).closest('.privacy__popup').fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});


	$('.both__ears--btn').on('click' ,function(e){
		e.preventDefault();
		$('.both__ears--popup').fadeIn(300);
		$('body,html').css("overflow-y" ,"hidden");
	});

	$('.dont__hear--btn').on('click' ,function(e){
		e.preventDefault();
		$('.dont__hear--popup').fadeIn(300);
		$('body,html').css("overflow-y" ,"hidden");
	});


	$('.dont__hear--popup .try__again').on("click" ,function(e){
		e.preventDefault();
		location.reload();
	});


	$(".both__ears--popup .restart").on('click' ,function(e){
		e.preventDefault();
		location.reload();
	});

	$(".both__ears--popup .continue, .both__ears--popup .back ").on('click' ,function(e){
		e.preventDefault();
		$('.both__ears--popup').fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});

	$('.calculate__popup--btn').on("click" ,function(e){
		e.preventDefault();
		$('.calculate__popup').fadeIn(300);
		$('body,html').css("overflow-y" ,"hidden");
	});


	$('.calculate__popup .btn>a').on('click' ,function(e){
		e.preventDefault();
		$(this).closest('.calculate__popup').fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});


	$('.lower__btn').on('click' ,function(e){
		e.preventDefault();
		$('.popup__adjust').fadeIn(300);
		$('body,html').css("overflow-y"  ,"hidden");
	});

$('.audio__bar--controls>a:nth-child(1)').on('click' ,function(e){
	e.preventDefault();
	let currVal = $(this).closest(".step").find(".audio__bar>input").val()*100;
	if (currVal != 0) {
		currVal = +currVal - 5; // Changed from 10 to 5 for smaller steps
		currVal = Math.max(0, currVal); // Ensure it doesn't go below 0
	}
	$(this).closest('.step').find(".audio__bar svg stop").attr("offset" , currVal + "%");
	$(this).closest('.step').find("audio")[0].volume = currVal/100;
	$(this).closest(".step").find(".audio__bar>input").val(currVal/100);
	
	// Update the gradient in the SVG
	let gradientId = $(this).closest('.step').find(".audio__bar svg defs linearGradient").attr('id');
	if (gradientId) {
		$(this).closest('.step').find(".audio__bar svg defs linearGradient stop").attr("offset", currVal + "%");
	}
});
$('.audio__bar--controls>a:nth-child(2)').on('click' ,function(e){
	e.preventDefault();
	let currVal = $(this).closest(".step").find(".audio__bar>input").val()*100;
	if (currVal != 100) {
		currVal = +currVal + 5; // Changed from 10 to 5 for smaller steps
		currVal = Math.min(100, currVal); // Ensure it doesn't go above 100
	}
	$(this).closest('.step').find(".audio__bar svg stop").attr("offset" , currVal + "%");
	$(this).closest('.step').find("audio")[0].volume = currVal/100;
	$(this).closest(".step").find(".audio__bar>input").val(currVal/100);
	
	// Update the gradient in the SVG
	let gradientId = $(this).closest('.step').find(".audio__bar svg defs linearGradient").attr('id');
	if (gradientId) {
		$(this).closest('.step').find(".audio__bar svg defs linearGradient stop").attr("offset", currVal + "%");
	}
});


	$('.main__questions--form .fields .validate').on('input , change' ,function(){
		let errors = 0;
		$('.main__questions--form .validate').each(function(index,elem){
			if ($(elem).hasClass('regular')) {
				if ($(elem).val().length < 2) {
					errors++;
				}
			}
			if ($(elem).hasClass('email')) {
				if ($(elem).val().length == 0 ||  !validateEmail($(elem).val())) {
					errors++;
				}
			}

			if ($(elem).hasClass('checkbox')) {
				if ($(elem).prop("checked") == false) {
					errors++;
				}
			}
		});
		if (errors == 0) {
			$('.main__questions--form  .btn>a').removeClass('disabled');
		} else {
			$('.main__questions--form  .btn>a').addClass('disabled');
		}
	});


	$('.step .btn>a.regular-btn:not(.red-btn)').on('click' ,function(e){
		e.preventDefault();
		$('audio').each(function(index,elem){
			$(elem)[0].pause();
		});
		if (allowClick == true) {
			if ($('.step.current').next().length) {
				allowClick = false;
				$('.step.current').removeClass("visible");
				setTimeout(function(){
					$('.step.current').css('display' ,"none");
					$('.step.current').removeClass("current").next(".step").addClass('current').css("display" ,"block");
					setTimeout(function(){
						$('.step.current').addClass("visible");
						allowClick = true;
					}, 40);
					if ($('.step.current .start__play').length) {
						$('.step.current .start__play')[0].currentTime = 0;
						$('.step.current .start__play')[0].play();
                        $('.step.current .start__play')[0].loop = true;
						$('.step.current .start__play')[0].volume = 1;
					}
					if ($('.step.current .volume__switcher--audio').length) {
						$('.step.current .volume__switcher--audio')[0].currentTime = 0;
						$('.step.current .volume__switcher--audio')[0].play();
                        $('.step.current .volume__switcher--audio')[0].loop = true;
						$('.step.current .volume__switcher--audio')[0].volume = $('.step.current .audio__bar>input').val();
					}
					let imageId = $('.step.current').attr("data-image");
					$('.top__l').attr("src" , "img/prods/" + imageId + "_1.webp");
					$('.top__r').attr("src" , "img/prods/" + imageId + "_2.webp");
					$('.top__r2').attr("src" , "img/prods/" + imageId + "_3.webp");

					initProgress($('.step.current').attr("data-value"));
				}, 500);
			}
		}

	});
	let allowClick = true;
	$('.top__part>a , .back__btn>a').on('click' ,function(e){
		e.preventDefault();
         $('.main__form .inner .top__part').show();
        if($('.step.current.visible').data('value') < 10){
          window.location.href = '/'
        }
		if (allowClick == true) {
			if ($('.step.current').prev().length) {
				$('audio').each(function(index,elem){
					$(elem)[0].pause();
				});
				allowClick = false;
				$('.step.current').removeClass("visible")
				setTimeout(function(){
					$('.step.current').css('display' ,"none");
					$('.step.current').removeClass("current").prev(".step").addClass('current').css("display" ,"block");
					setTimeout(function(){
						$('.step.current').addClass("visible");
						allowClick = true;
					}, 40);
					if ($('.step.current .start__play').length) {
						$('.step.current .start__play')[0].currentTime = 0;
						$('.step.current .start__play')[0].play();
                        $('.step.current .start__play')[0].loop = true;
						$('.step.current .start__play')[0].volume = 1;
					}
					if ($('.step.current .volume__switcher--audio').length) {
						$('.step.current .volume__switcher--audio')[0].currentTime = 0;
						$('.step.current .volume__switcher--audio')[0].play();
                        $('.step.current .volume__switcher--audio')[0].loop = true;
						$('.step.current .volume__switcher--audio')[0].volume = $('.step.current .audio__bar>input').val();
					}
					let imageId = $('.step.current').attr("data-image");
					$('.top__l').attr("src" , "img/prods/" + imageId + "_1.webp");
					$('.top__r').attr("src" , "img/prods/" + imageId + "_2.webp");
					$('.top__r2').attr("src" , "img/prods/" + imageId + "_3.webp");
					initProgress($('.step.current').attr("data-value"));
				}, 500);
			}
		}
	});


function initProgress(value){
	// Ensure value is a number and between 0-100
	value = parseFloat(value) || 0;
	value = Math.max(0, Math.min(100, value));
	
	// Update the progress bar
	$('.top__part .bar .active').css("width", value + "%");
	if(value > 7){
		$('.main__form .container>p').addClass('hide');
	}else{
		$('.main__form .container>p').removeClass('hide');
	}
	// Log progress update for debugging
	console.log("Progress updated to: " + value + "%");
}


	$(".group__dropdown>a").on("click" ,function(e){
		e.preventDefault();
		if ($(this).hasClass("opened")) {
			$(this).removeClass("opened");
			$(this).closest('.group__dropdown').find(".drop").fadeOut(300);
		} else {
			$('.group__dropdown>a').removeClass('opened');
			$('.group__dropdown .drop').fadeOut(300);
			$(this).addClass("opened");
			$(this).closest('.group__dropdown').find(".drop").fadeIn(300);
		}
	});

	$(document).click(function(event) { 
	  var $target = $(event.target);
	  if(!$target.closest('.group__dropdown').length) {
	  	$('.group__dropdown>a').removeClass('opened');
	  	$('.group__dropdown .drop').fadeOut(300);
	  }        
	});

	$('.group__dropdown .drop ul li a').on('click' ,function(e){
		e.preventDefault();
		$(this).closest(".drop").fadeOut(300);
		$(this).closest('ul').find(".current").removeClass('current');
		$(this).addClass('current');
		$(this).closest('.group__dropdown').find(">input").val($(this).text());
		$(this).closest('.group__dropdown').find(">a").removeClass('opened');
		$(this).closest('.group__dropdown').find(">a>span").text($(this).text());
	});

	$('.plates__ .elem').on('click' ,function(e){
		e.preventDefault();
		if ($(this).hasClass('current')) {
			$(this).removeClass('current');
			$(this).closest('.plates__').find('input').val("");
		} else {
			$(this).closest('.plates__').find('.current').removeClass('current');
			$(this).addClass('current');
			$(this).closest('.plates__').find('input').val($(this).text().trim());
		}

		if ($(this).closest('.plates__').find('.current').length != 0) {
			$(this).closest('.step').find('.btn>a').removeClass('disabled');
		} else {
			$(this).closest('.step').find('.btn>a').addClass('disabled');			
		}
	});


	$('.popup__adjust ul li a').on('click' ,function(e){
		e.preventDefault();
		if (!$(this).hasClass('current')) {
			$(this).closest("ul").find(".current").removeClass('current');
			$(this).addClass('current');
			$('.picked__box .el').css('display' ,'none');
			$('.picked__box .el[data-el='+ $(this).attr("data-el") +']').fadeIn(300);
		}
	});


	$('.open__volume--popup').on("click" ,function(e){
		e.preventDefault();
		$('.popup__adjust').fadeIn(300);
		$('body,html').css("overflow-y"  ,"hidden");
	});

	$('.popup__adjust .btn>a').on('click' ,function(e){
		e.preventDefault();
		$('.popup__adjust').fadeOut(300);
		$('body,html').css("overflow-y"  ,"initial");
	});
});
