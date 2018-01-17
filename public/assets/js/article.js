$(function() {

	$("body").on("click","#scrape", function(event) {


		$.ajax('/articles',{
			type: "GET"
		}).then(function(){
			console.log('Scraped Data');
		})



	});



	$('body').on('click', '.save', function(event){

		var id = $(this).attr('data-id');


		$.ajax('/articles/'+ id, {
			type: "POST",
			data: 
			{
				saved: true
			}
		}).then(function(){
			console.log("article saved");
		});

	});

});