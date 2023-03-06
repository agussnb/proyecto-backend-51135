/* Alumno: Agustin Barrero
    Comision: 51135
    Desafio: 1
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
    constructor(products){
      this.products = products;
    }
  
    addProduct(product){
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].code === product.code) {
          throw new Error('Ya existe un producto con la misma ID');
        }
      }
      this.products.push(product);
    }
  
    getProducts(){
      return this.products;
    }
  
    getProductById(id){
      return this.products.find(product => product.code === id);
    }
}      
  const products  = []
  const productoUno = new Product ('Glock 20','Pistola calibre 9x19mm modelo 20 Gen 4',581,'glock20.jpg',1,15)
  const productoDos = new Product ('Bersa BP9CC','Pistola calibre 9x19mm modelo BP9CC',299,'bersaBP9CC.jpg',2,15)
  const productoTres = new Product ('Ruger SR22P','Pistola calibre 22mm modelo SR22P',299,'rugerSR22P.jpg',3,15)

  const manager = new ProductManager(products)

  manager.addProduct(productoUno)
  manager.addProduct(productoDos)
  manager.addProduct(productoTres)
  
  manager.getProducts

  //console.log para imprimir como se ve la lista de productos llamando a manager
  console.log('-----------------------------')
  console.log(manager);
  //console.log para imprimir el metodo addProduct
  console.log('-----------------------------')
  console.log(manager.addProduct)
  //console.log para imprimir la lista de productos utilizando el metodo getProducts
  console.log('-----------------------------')
  console.log(manager.getProducts())
  //console.log para imprimir el metodo getProductsById
  console.log('-----------------------------')
  console.log(manager.getProductById(2))
  console.log('-----------------------------')
