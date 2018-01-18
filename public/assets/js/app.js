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
			type: "POST",
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
			type: "POST",
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

	})


});