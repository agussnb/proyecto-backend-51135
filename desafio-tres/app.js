const express = require('express');
const ProductManager = require('../desafio-dos/ProductManager');

const app = express();
const PORT = 8080;

// Creamos una instancia de ProductManager


app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager()

app.get('/',(req,res)=>{
  res.send('<h1>Endpoint /</h1>')
})
app.get('/products', async (req, res) => {
  const { title, price, stock, limit } = req.query;

  const products = await productManager.getProducts();

  if (!Array.isArray(products)) {
    // Si products no es un array, envía un error en la respuesta
    return res.status(500).send('Error en el servidor');
  }

  let matchingProducts = products;

  if (title || price || stock) {
    matchingProducts = matchingProducts.filter((product) => {
      if (title && product.title !== title) return false;
      if (price && product.price !== Number(price)) return false;
      if (stock && product.stock !== Number(stock)) return false;
      return true;
    });
  }

  if (limit) {
    matchingProducts = matchingProducts.slice(0, limit);
  }
  res.json(matchingProducts);
});

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
    console.log('Id del producto: ' + productId);
    console.log('Console.log del producto '+product);
    console.log(productManager.getProductById(productId));
    console.log(productManager.getProductById(5))
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send(`El producto seleccionado es: ${JSON.stringify(product)}`);
  } catch (error) {
   // console.log('error '+error)
   // console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Listen del port
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

