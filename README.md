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

## Requirements

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/vrrusso/skate-shop

# Go into the repository
$ cd skate-shop

# Go into the SPA client side directory
$ node server.js

```

## Project Description

Our project is a web page made using some elements of Bootstrap, with layout using HTML and CSS of a skate shop where you can buy products for your skate or something related.

The site is structured based on 3 types of users:
- Guests
- Users logged
- Admin

**Guest**:
Homepage with skate products offered and a menu with login button;
- Screen with sections leading to the products page filtered by Skateboards complete, shapes, wheels and trucks;
- In products page, customer can search for his desired product and go to the specific page for that product.

If logged in as a **User**, the curtomer can: 
- Add a product to his cart;
- Check his cart;
- Confirm purchase for one or more products;
- View and edit his profile.

If logged in as a **Adminstrator**, the admin can:

- Add new products to the store
- Edit current products specifications.

### Navigation Diagram:

![screenshot](https://i.imgur.com/kjgoFG4.png)

## Single Page Application

The application is a Web SPA, which means it has only one web page that is served with the content of different pages making the transitions seamless. To make this possible, there is a routing script that handles the action connected to navigation that the user could do, serving the front-end with the appropriate HTML.

There are the Control scripts, that are responsible for dynamic placing data on screen, i.e.  loads the user data on the profile screen, or the appropriate products given a search string.

Last, there are the Controller scripts wich are responsible for interaction with the DB. As just the client side is done for now, the controller script are mock up scripts, that have some instances of products and users hardcoded on it. If you want for tests purpose add some new data, add It direct on the code. In the final iteration of the project, the Controller scripts will be responsible for the interaction with the MongoDB service. The user session is controlled in the localStorage, as the items on the cart.

For now, the HTML for each page is served as a string on the routing script, but for the last iteration, the pages will be placed on HTML files and be fetched on the JS, making the code cleaner. No fancy JS frameworks were used, but it is possible that Vue.js may be used for better form validation.

## Tests

In this section we will detail all the tests performed on the topics described presented in the Project Description section.

### Sign Up

![screenshot](https://i.imgur.com/r7Wricf.png)

![screenshot](https://i.imgur.com/HRrr4u3.png)

### Login

Home before login

![screenshot](https://i.imgur.com/76dNImj.png)

Wrong login

![screenshot](https://i.imgur.com/20m06qp.png)

Home after successful login

![screenshot](https://i.imgur.com/5LNIOCn.png)

Its possible to login as user with:

```
  email: victor@russo.com
  password: senha123
```

### Search Products

Searching for "crail promodel"

![screenshot](https://i.imgur.com/LcPmaRB.png)

Result of products available at the skate shop related to the search

![screenshot](https://i.imgur.com/SLX9rHl.png)

### Cart

It is possible to add the desired products to the cart.

![screenshot](https://i.imgur.com/uywq8eN.png)

It is also possible to edit and remove products from the cart.

![screenshot](https://i.imgur.com/qtZK4we.png)

![screenshot](https://i.imgur.com/7jz6SVF.png)

Specifying the delivery address and finishing the purchase of the entire cart.

![screenshot](https://i.imgur.com/FhBUlvm.png)

![screenshot](https://i.imgur.com/Yk1uydc.png)

### Logout

![screenshot](https://i.imgur.com/BFy9vkC.png)

### Login verification

It is important to ensure that the user is logged in to make a purchase.

![screenshot](https://i.imgur.com/nylN0o1.png)

### Add new products (Admin)

Its possible to login as admin with:

```
  email: skate@skate.com
  password: admin
```

On the home page menu, there is a section to add a new product in the skate shop catalog.

![screenshot](https://i.imgur.com/qoKKAt1.png)

Registering a new product

![screenshot](https://i.imgur.com/sobyPZ0.png)

![screenshot](https://i.imgur.com/KIv0ljT.png)


### Edit Products

Admin can also change some specifications of the products that already exist in the skate shop catalog.

![screenshot](https://i.imgur.com/ieH3mHL.png)

![screenshot](https://i.imgur.com/0JX0dWa.png)

![screenshot](https://i.imgur.com/zTiPEGv.png)

## Problems

## Comments

## License

MIT


