exports.getAddProductPage = (req, res) => {
    const viewsData = {
        edit: false,
        pageTitle: 'Add Product'
    };
    res.render('AddProduct', viewsData);
};

exports.getAdminProductsPage = async (req, res) => {
    const fetchProducts = await fetch(`${process.env.DOMAIN}/api/posts`);
    products = await fetchProducts.json();
    const viewsData = {
        admin: true,
        pageTitle: 'Admin Products',
        products
    }
    res.render('product-list', viewsData);
}

exports.getAdminUsersPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Users',
    }
    res.render('users', viewsData);
}

exports.getEditProductPage = async (req, res) => {
    async function getPostByUrl(data) {
        const res = await fetch(`${process.env.DOMAIN}/api/posts/url`, {
          method: 'POST',
          credentials:'include',
          cache:'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return await res.json();
    }
    

    const products = await getPostByUrl({url: req.params.productUrl});
    if (products.error) {
        console.log(products.error);
        return;
    }
    
    product = products[0];
    const viewsData = {
        edit: true,
        product,
        pageTitle: 'Edit Product'
    };
    res.render('AddProduct', viewsData);
};

exports.getLoginPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Login'
    };
    res.render('login', viewsData);
};

exports.getRegisterPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Register'
    };
    res.render('register', viewsData);
};

exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/admin/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié.
    };
};

  