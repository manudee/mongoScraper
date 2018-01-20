$(function() {

	$("body").on("click","#scrape", function(event) {


		$.ajax('/scrape',{
			type: "GET"
		}).then(function(){
			console.log('Scraped Data');
		})




	});




	$('body').on('click', '.save', function(event){

		var id = $(this).attr('data-id');

		$(this).toggle();


		$.ajax('/articles/'+ id, {
			type: "PUT",
			data: 
			{
				saved: true
			}
		}).then(function(saved){

			console.log("article saved");
			location.reload();
		});

	});

	$('body').on('click', '.delete', function(event){

		var id = $(this).attr('data-id');
		$(this).hide();
		
		$.ajax('/articles/'+ id, {
			type: "PUT",
			data: 
			{
				saved: false
			}
		}).then(function(saved){
			console.log("article deleted from saved");
			location.reload();
		});

	});


	$('body').on('click', '#saved', function(savedArticles){
		$.ajax('/savedArticles',{
			type: "GET"
		}).then(function(){
			console.log('Saved Articles Data');
		})

		location.reload();

	});




	$("#my-modal").on('show.bs.modal', function(event){


		var button = $(event.relatedTarget);
		var buttonId = button.data('id');

		console.log(buttonId);

		$('#savenote').attr('data-id',buttonId );
	})

	

	$('body').on('click', '#savenote', function(savedNote){

			var id = $(this).attr('data-id');
			console.log(id);

			$.ajax({
				method: "POST",
				url: "/articles/" + id,
				data: {
			      // Value taken from title input

			      // Value taken from note textarea
			      body: $("#text").val()
			  }
			})
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
     

  });







});







	$('body').on('click', '.notes', function(articleNotes){


		$("#myModal").modal('show');

	})


});



function emptyNotes(){

		 $("#text").val("");
}