# mongoScraper

This is a mongoScraper application which scrapes a website and stores scraped articles and links in a mongo database.

Website used for scraping: https://www.highheelconfidential.com/


# Functionality

## Landing Page

Below is the landing page of the website. You will be presented with two buttons to get started
	1. Scrape Articles
	2. Saved Articles

![Alt Text](/public/assets/images/landingPage.PNG)


## Scrape Articles
After you click on "Scrape Articles" button, you will be redirected to articles page where you will see the scraped articles. You will then have an option to "Save" the scraped articles.


![Alt Text](/public/assets/images/scrapeArticles.PNG)


## Saved Articles
After you click on "Saved Articles" button, you see a list of articles that you saved in a previous step.
You have 2 options at this point
	1. Delete from Saved: This will delete the articles from the list of saved articles and move it to Scraped 	   Articles's list
	2. Article Notes: This will add an article note to the saved article.

![Alt Text](/public/assets/images/savedArticles.PNG)

## Delete from Saved
If you choose to use option "Delete from Saved"
	
	![Alt Text](/public/assets/images/deleteFromSaved.PNG)

Once that request is performed, you will see the article back in the list of saved Articles , on article route.

	![Alt Text](/public/assets/images/DeletedFromSaved.PNG)



## Article Notes
Once you click on "Article Notes" button, a modal will open up where you can add Article notes and saved it to the database.

	![Alt Text](/public/assets/images/articleNotes.PNG)

	![Alt Text](/public/assets/images/AddingaNote.PNG)

## Save  Note

Once you click on "Save Note" on the modal and if you reopen the article notes, you will see an existing note on the article if any.

	![Alt Text](/public/assets/images/SavedNote.PNG)


Using the Red Cancel button on the note, you have an option to delete the note from that article.

## Delete Note
Once you delete the note from the article, it is deleted from the database and not associated with the article anymore.

	![Alt Text](/public/assets/images/DeleteNote.PNG)


	![Alt Text](/public/assets/images/afterNoteDeletion.PNG)


# Technology Stack
  
  * express routing
  * mongoose
  * html, handlebars
  * javascript



