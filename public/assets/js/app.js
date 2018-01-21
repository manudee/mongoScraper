$(function() {

	// $("body").on("click","#scrape", function(event) {


	// 	$.ajax('/scrape',{
	// 		type: "GET",
	// 		success: function(result){

	// 			$("#myModal").modal("show");

	// 		}
			
	// 	})



	// });




	$('body').on('click', '.save', function(event){

		var id = $(this).attr('data-id');

		// $(this).hide();


		$.ajax('/articles/'+ id, {
			type: "PUT",
			data: 
			{
				saved: true
			}
		}).then(function(saved){

			console.log("article saved");
			// location.reload();
			
		});
		location.reload();
	});

	$('body').on('click', '.delete', function(event){

		var id = $(this).attr('data-id');
		// $(this).hide();
		
		$.ajax('/articles/'+ id, {
			type: "PUT",
			data: 
			{
				saved: false
			}
		}).then(function(saved){
			console.log("article deleted from saved");
			
		});
		location.reload();
	});


	

	$('body').on('click', '#savenote', function(savedNote){

		var id = $(this).attr('data-id');
		console.log(id);
		console.log($("#note"+id).val())

		$.ajax({
			method: "POST",
			url: "/articles/" + id,
			data: {

				body: $("#note"+id).val()
			}
		})

		.then(function(data) {

			console.log(data);




		});
		location.reload();

	});



	$('body').on('click', ".notesToDelete", function(){

		var notesId = $(this).attr('data-id');
		console.log("Notes ID" , notesId);

		$.ajax({

			method: "POST",
			url: "/notes/" + notesId
		}).then(function(data){
			console.log(data);
		});

		location.reload();



	})






	$('body').on('click', '.notes', function(articleNotes){


		$("#myModal").modal('show');

	})





});

