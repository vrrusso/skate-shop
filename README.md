<h1 align="center">
  <br>
  <img src="https://i.imgur.com/htmH0Ui.png" alt="SK8" width="200"></a>
  <br>
  SK8 - A Skate Shop
  <br>
</h1>

<h4 align="center">De SK8 eu vim, de SK8 eu vou...</h4>

<p align="center">
  <a href="#group-26">Group 26</a> •
  <a href="#requirements">Requirements</a> •
  <a href="#project-description">Project Description</a> •
  <a href="#single-page-application">SPA</a> •
  <a href="#tests">Tests</a> •
  
</p>

![screenshot](https://i.imgur.com/YdCoIeS.png)

## Group 26

- Caio Chaves 11208217
- Guilherme Amaral Hiromoto 11218959
- Victor Rodrigues Russo 11218855

## Build Procedures

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/vrrusso/skate-shop

# Go into the repository
$ cd skate-shop/final_project

# Installing the libraries used
$ npm install

# Run the serve
$ npm start
```

## Project Description

Our project is a web page made using some elements of Bootstrap, with layout using HTML and CSS of a skate shop where you can buy products for your skate or something related.

### Requirements

The site is structured based on 3 types of users:
- Guests
- Users logged
- Admin

**Guest**:
Homepage with skate products offered and a menu with login button;
- Screen with sections leading to the products page filtered by Skateboards complete, shapes, wheels and trucks;
- In products page, customer can search for his desired product and go to the specific page for that product;
- Add a product to his cart;
- Check his cart;
- Create a User Account;
- Make shape sketchs using the shape drawer tool.

If logged in as a **User**, the curtomer can: 
- Confirm purchase for one or more products;
- Manage his personal data;
- View and edit his profile.

If logged in as a **Adminstrator**, the admin can:

- Add new products to the store;
- See the products;
- Remove Products;
- Check the sales and stock numbers for each product;
- Edit current products specifications.

### Navigation Diagram:

![screenshot](https://i.imgur.com/kjgoFG4.png)

## Comments about the Code

### Single Page Application

The application is a Web SPA, which means it has only one web page that is served with the content of different pages making the transitions seamless. To make this possible, there is a routing script that handles the action connected to navigation that the user could do, serving the front-end with the appropriate HTML.

There are the Control scripts, that are responsible for dynamic placing data on screen, i.e.  loads the user data on the profile screen, or the appropriate products given a search string.

Last, there are the Controller scripts wich are responsible for interaction with the DB. This is done making requests for the API.

The HTML for each page is fetched on the JS, making the code cleaner. No fancy JS frameworks were used on the front end.

### MongoDB API

The data for the users and the products are stored on MongoDB set on cloud.

To make the connection possible, we built an API using Node, express and mongoose, where the frontend make requests for the data and then display that data correctly.

For the cart, the group have chosen to mantain its data on the local storage, as it is a common practice. To avoid overorder in the items, when a product is added to the cart, 
the sold field from the product is incremented. If the product is removed from the car, the sold field is decremented. If the purchase is finished, the sold field is already on agreement with the purchase.

## Shape Drawer Tool

The unique functionality of the app is a shape drawer tool, where the user can draw and save as a png his own shape pattern. 

This is done using JS and moveover events to draw and using html2canvas lib to render the html as an image, and FileSaver to save it to the usar machine.


## Test Plan

The tests were done without any tools or frameworks. Here we describe then to make possible the replication.

### Browsing the SPA

Check that the app works as an SPA.

### Filtering Products by Type

Click on the header links to check that the products are been filtered by type

### Filtering Product by Name

Teste the search bar.

### Adding Items to the Cart

Just add some items to the Cart changing the quantities and exploring high quantities to get out of stock messages. 

Close the app and re open it to see that the cart is still there.

### Removing Items of the Cart

Remove one of the items of the cart.

### Edit Products of the Cart

Edit one of the items on the cart, changing que quantity.

### Log in

Test the Login, first with a illegal account and them later with a real one.

Close the app and reopen it to see the user is still logged in. 

Explore the form consistency trying to make the login without typing the password.

### Create an Account

Create an Account. Explore the form consistency for the email( barely done), birthday, and short password. 

See in the BD that the new user is created. 

Try to log in with the new user.

### See Profile Page

Check that the info on the profile page is correct. 

### Updating User Info

Updates the user info, again exploring the same consistencies. Update the img path to some picture of your choice.

### Finishing Purchase

Go the cart and finish your purchase, inserting an credit card number.

Verifies that the cart is emptied and on the BD the sold info for the respective products has changed.

### Log in as an admin

Log in as an adm to see the admin vision of the application.

### Creates a new Product

Create a new Product. Explore the consistency inserting negative numbers. 
Check that the product is created on the BD and is now accessible on the app.

### Updates a Product

Updates the info of some product, again checking the consistencies. 
Observes the effect on the app.

### Removing a Product

Remove the product. Check that if some user had this product on its cart, there are no problems.


### Shape Drawer

Use your criativity and draw a pattern on shape drawer and then download the png.



## Test Results

In this section we will detail all the tests performed on the topics described presented in the Project Description section.

### Browsing the SPA


### Filter products by type
Filter by shapes
![screenshot](https://i.imgur.com/sDBfK6E.png)

### Filtering Product by Name
Filter by the product name truck
![screenshot](https://i.imgur.com/9anhkzS.png)

### Adding Items to the Cart
Screen to buy 1 truck
![screenshot](https://i.imgur.com/7YtD9M1.png)

Screen with the item in the cart
![screenshot](https://i.imgur.com/69lpLGm.png)

Screen with a lot of itens in the cart
![screenshot](https://i.imgur.com/wcZAvAS.png)

Message saying that there aren't enough itens in the stock


![screenshot](https://i.imgur.com/O0ndTHs.png)

### Removing Items of the Cart
Initially there are 2 items in the cart, totalizing $63
![screenshot](https://i.imgur.com/ACbYBu6.png)

Truck removed, remaining only the wheel, totalizing $13
![screenshot](https://i.imgur.com/BhCakeq.png)

### Edit Products of the Cart
Item in the cart before edit (only 1 wheel)
![screenshot](https://i.imgur.com/m5nzEYc.png)

Edit screen to increase the quantity of wheels
![screenshot](https://i.imgur.com/rhaSva7.png)

Item in the cart before increase the amount of wheels (now 3 wheels)
![screenshot](https://i.imgur.com/ZtOdLg5.png)

### Log in
First, login with an illegal account

![screenshot](https://i.imgur.com/Mys4p6B.png)

Illegal account error



![screenshot](https://i.imgur.com/NGFvTvT.png)

Legal account login

![screenshot](https://i.imgur.com/7DjDVmy.png)

Success login message



![screenshot](https://i.imgur.com/f2gG6eP.png)


### Create an Account
Register with a birthday after 2008

![screenshot](https://i.imgur.com/AXRbZ0Q.png)

Error message


![screenshot](https://i.imgur.com/pfxaRnT.png)

Register with a short password
![screenshot](https://i.imgur.com/9Ss9ySl.png)

Error message


![screenshot](https://i.imgur.com/w9YDAsA.png)

Register with an invalid e-mail

![screenshot](https://i.imgur.com/ZuDNiIN.png)

Error message


![screenshot](https://i.imgur.com/Ax32rPx.png)


Successful register

![screenshot](https://i.imgur.com/NDQK5li.png)

Success message


![screenshot](https://i.imgur.com/9IiiVyt.png)

OBS: The login showed in the login topic was already with the new account, so there is no print with a sucessful login with a new account in this topic

### See Profile Page
Profile page of the new account

![screenshot](https://i.imgur.com/S1QUTFp.png)

### Updating User Info
Infos before editing

![screenshot](https://i.imgur.com/9x2NHSM.png)

Profile edit page without profile image and old birthday date

![screenshot](https://i.imgur.com/7XMelK6.png)

Profile edit page after changing birthday and profile image

![screenshot](https://i.imgur.com/acD5UbB.png)

Profile updated

![screenshot](https://i.imgur.com/0AhrH55.png)

### Finishing Purchase
First, try to purchase item without credit card

![screenshot](https://i.imgur.com/y8bPuin.png)

Error message


![screenshot](https://i.imgur.com/g1Vj6Bd.png)

Now finish purchase with a credit card

![screenshot](https://i.imgur.com/ZKLhDVZ.png)

Success message

![screenshot](https://i.imgur.com/qCEyi1n.png)


### Log in as an admin


### Creates a new Product

### Updates a Product


### Removing a Product



### Shape Drawer






## Problems

Some items may not work well on smaller screen devices.

## Comments

No comments.

## License

MIT


