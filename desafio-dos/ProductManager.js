/* Alumno: Agustin Barrero
    Comision: 51135
    Desafio: 2
*/
class Product{
    constructor(title, description, price, thumbnail, code, stock ){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor(products, path){
      this.products = products;
      this.path = path
      path = 'data.json'
      this.currentId = 1;
    }
  
    addProduct(product) {
        // Verificar si ya existe un producto con la misma ID
        this.products.forEach((existingProduct) => {
          if (existingProduct.code === product.code) {
            throw new Error('Ya existe un producto con la misma ID');
          }
        });
      
        // Agregandole el id autoincrementado al producto
        const id = this.currentId++;
        product.id = id;
      
        // Agregar el nuevo producto a la lista.
        this.products.push(product);
      }
      
    getProducts(){
      return this.products;
    }
  
    getProductById(id){
      return this.products.find(product => product.code === id);
    }

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex((product) => product.id === id);
    
        if (productIndex === -1) {
          throw new Error(`No se encontró ningún producto con el ID ${id}`);
        }
    
        const existingProduct = this.products[productIndex];
    
        // Si se proporciona un nuevo código, verificar si no se está intentando duplicar el código.
        if (updatedProduct.code && updatedProduct.code !== existingProduct.code) {
          const codeExists = this.products.some((product) => product.code === updatedProduct.code);
          if (codeExists) {
            throw new Error('Ya existe un producto con el mismo código');
          }
        }
    
        const updated = {
          ...existingProduct,
          ...updatedProduct,
          id: existingProduct.id, // asegurarse de que el id no se borre, ni se cambie.
        };
    
        this.products[productIndex] = updated;
      }
    
      deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
    
        if (productIndex === -1) {
          throw new Error(`No se encontró ningún producto con el ID ${id}`);
        }
    
        this.products.splice(productIndex, 1);
      }
}      
  const products  = []
  const productoUno = new Product ('Glock 20','Pistola calibre 9x19mm modelo 20 Gen 4',581,'glock20.jpg',1,15)
  const productoDos = new Product ('Bersa BP9CC','Pistola calibre 9x19mm modelo BP9CC',299,'bersaBP9CC.jpg',2,15)
  const productoTres = new Product ('Ruger SR22P','Pistola calibre 22mm modelo SR22P',299,'rugerSR22P.jpg',3,15)
  const productoCuatro = new Product ('Sig Sauer SIG 716','Carabina calibre 7.62 semiautomatica modelo SIG 716',1300,'sig716.jpg',4,15)

  const manager = new ProductManager(products)

  manager.addProduct(productoUno)
  manager.addProduct(productoDos)
  manager.addProduct(productoTres)
  manager.addProduct(productoCuatro)


//Prueba del metodo deleteManager (Borrar comentario para hacer la prueba)

//manager.deleteProduct(3)

//Haciendo prueba del metodo updateProduct, agarro uno de los productos para actualizarlo...
const productToUpdate = manager.getProductById(2);

//Ahora actualizo el producto cambiando valores.
productToUpdate.price = 305 //Nota: el valor inicial de price en el producto con id 2 era 299
productToUpdate.stock = 10  //Nota: el valor inicial de stock en el producto con id 2 era 15

//Y finalmente le paso al metodo updateProduct el producto actualizado
manager.updateProduct(2,productToUpdate)

//Imprimo en la consola los productos.
    console.log('-----------------------------')
    console.log(manager);
    console.log('-----------------------------')
