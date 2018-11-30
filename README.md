# Demo application as a Proof of concept for scrollPaginator

#### Simple steps to configure scrolling in the application on index page - 

* Clone the application.
* run **bundle install**
* run **rails db:create db:migrate db:seed**
* Start rails server and visit the url - http://localhost:3000/items
* Scroll down the page. Scrolling starts working.
 
#### File to have a look into

* **scrollPaginator.js** in assets.
* Item index page.
* item/_item.html.erb
* item/_item.js.erb

#### Gems used

* For pagination gem **kaminari** is used in the application.