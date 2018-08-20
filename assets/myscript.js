$(document).ready(function(){
    var current = 0,current_step,next_step,steps;//1
	steps = $("fieldset").length - 1;
	var animating;
	
	$(".next").click(function(){
		//ADD VALIDATION
		
		var form = $(".surveyForm");

		
		form.validate({
			rules:{
				q1:{required: true, minlength:1},
				q2:{required: true, minlength:1},
				q3:{required: true, minlength:1},
				q4:{required: true, minlength:1},
				q5:{required: true, minlength:1},
				q6:{required: true, minlength:1},
				q7:{required: true, minlength:1},
				q8:{required: true, minlength:1}
			},
			messages:{
				q1:{required: "Please choose one"},
				q2:{required: "Please add 1 - 3 greenspaces"},
				q3:{required: "Please check at lease one"},
				q4:{required: "Please check at lease one"},
				q5:{required: "Please click on marker to add house location"},
				q6:{required: "Please choose one"},
				q7:{required: "Please choose one"},
				q8:{required: "Please choose one"}
			},
			errorElement : 'span',
			errorLabelContainer: '.errorTxt'
		});
		
		if((!form.valid())){
			return false;
		}
		
		current_step = $(this).parent();
		next_step = $(this).parent().next();
		
		next_step.show();
		setProgressBar(++current);	
		
		current_step.hide();
			

	});
	
	$(".previous").click(function(){
		current_step = $(this).parent();
		next_step = $(this).parent().prev();
		next_step.show();
		current_step.hide();
		setProgressBar(--current);
	});
	setProgressBar(current);
	// PROGRESS BAR
	function setProgressBar(curStep){
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width",percent+"%")
			.html(percent+"%");		
	}
	
	//collect data with PHP
	$( "#surveyForm" ).submit(function(event) {
		event.preventDefault();//stop the form submission
		submitForm();
	  
	});
	
	$('#previousMap').click(function(e){
		map.invalidateSize();
	});
	
});

$("#get_mapGS").click(function(){
	$("#get_mapGS").empty();
	$.getScript("map2/mapGreenSpaces.js");

});

$("#showMapHome").click(function(){
  $.getScript("map2/mapHome.js");
});

var num =0;
var gsNameId;
$("#btnAddGS").click(function(){
	num++;
	$.getScript("map2/questions.js");
});

function submitForm(){
	// Initiate Variables With Form Content
	// $('form').serialize() doesn't collect all data
	var q1 = $('input[name="q1"]:checked').val();

	//q2
	var q2_1=$('#q2_1').val();
	var q2_1a = $("#q2_1a option:selected" ).val();
	var q2_1b = $("#q2_1b option:selected" ).val();
	var q2_1c = $("#q2_1c option:selected" ).val();
	var q2_1d = $("#q2_1d option:selected" ).val();
	
	var q2_2=$('#q2_2').val();
	var q2_2a = $("#q2_2a option:selected" ).val();
	var q2_2b = $("#q2_2b option:selected" ).val();
	var q2_2c = $("#q2_2c option:selected" ).val();
	var q2_2d = $("#q2_2d option:selected" ).val();

	var q2_3=$('#q2_3').val();
	var q2_3a = $("#q2_3a option:selected" ).val();
	var q2_3b = $("#q2_3b option:selected" ).val();
	var q2_3c = $("#q2_3c option:selected" ).val();
	var q2_3d = $("#q2_3d option:selected" ).val();

	//q3
	var chkArray = [];
	/* look for all checkboxes that have a class 'q3'  check if it was checked */
	$(".q3:checked").each(function() {
		chkArray.push($(this).val());
	});
	/* join the array separated by the comma */
	var q3 = chkArray.join(',') ;
	var q4 = $('#q4').val();
	//Q5
	var q5 = $('input[name="q5"]:checked').val();
	//Q6
	var q6 = $('input[name="q6"]:checked').val();
	//Q7
	var q7 = $('input[name="q7"]:checked').val();
	//Q8
	var q8 = $('input[name="q8"]:checked').val();
	$.ajax({
		type: 'POST',
		url: 'assets/surveyData.php',
		data: {Q1:q1,Q2_1:q2_1,Q2_1a:q2_1a,Q2_1b:q2_1b,Q2_1c:q2_1c,Q2_1d:q2_1d,Q2_2:q2_2,Q2_2a:q2_2a,Q2_2b:q2_2b,Q2_2c:q2_2c,Q2_2d:q2_2d,Q2_3:q2_3,Q2_3a:q2_3a,Q2_3b:q2_3b,Q2_3c:q2_3c,Q2_3d:q2_3d,Q3:q3,Q4:q4,Q5:q5,Q6:q6,Q7:q7,Q8:q8},
		error: function(e){
			alert(e.status);
		},
		success: function () {
		  //alert('Form was submitted');
			setTimeout(function(){
			$(".container").html('<h2>Thank you!</h2><p>Thank you for your participation! Your answers have been submitted successfully.</p>');
			},
			$('form')[0].reset(),
			500);
		}
	  });
}