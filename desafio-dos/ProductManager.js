/* Alumno: Agustin Barrero
    Comision: 51135
    Desafio: 2
*/
const fs = require('fs');
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
    constructor(){
      this.path = 'data.json';
      this.currentId = 1;
      this.products = [];
      try {
        const data = fs.readFileSync(this.path,'utf-8');
        if(data.length === 0){
          this.products = []
        }else{
          this.products = JSON.parse(data)
        }
        this.currentId = this.products.length + 1;
      } catch (error) {
        console.error('Error al leer el archivo', error);
      }
    }
  
    async addProduct(product) {
      // Verificar si ya existe un producto con la misma ID
      this.products.forEach((existingProduct) => {
        if (existingProduct.code === product.code) {
          throw new Error('Ya existe un producto con la misma ID');
        }
      });
      
      // Agregandole el id autoincrementado al producto
      const id = this.currentId++;
      product.id = id;
    
      const productosJson = JSON.stringify([...this.products, product]); // crea una copia actualizada de this.products y agrega el nuevo producto
      this.products.push(product);
    
      try {
        await fs.promises.writeFile(this.path, productosJson);
        console.log('Archivo creado satisfactoriamente.')
      } catch (error) {
        throw new Error('No se pudieron cargar los productos al archivo')
      }
    }    

    async getProducts(){
      try {
        const data = await fs.promises.readFile(this.path,'utf-8');
        console.log(JSON.stringify(JSON.parse(data), null,2));
      } catch (error) {
        throw new Error('Error al leer el archivo')
      }
      return this.products;
    }

    getProductById(id){
      return this.products.find(product => product.code === id);
    }

    async updateProduct(id, updateFields) {
      const index = this.products.findIndex((product) => product.code === id);
      if (index === -1) {
        throw new Error(`No existe un producto con el id ${id}`);
      }
      const updatedProduct = {
        ...this.products[index],
        ...updateFields,
        code: id
      };
      this.products[index] = updatedProduct;
      const productosJson = JSON.stringify(this.products);
      try {
        await fs.promises.writeFile(this.path, productosJson);
        console.log('Archivo actualizado satisfactoriamente.');
      } catch (error) {
        throw new Error('No se pudieron cargar los productos al archivo');
      }
    }
    
    async deleteProduct(id) {
      const index = this.products.findIndex((product) => product.code === id);
      if (index === -1) {
        throw new Error(`No existe un producto con el id ${id}`);
      }

      this.products.splice(index,1)
      const productosJson = JSON.stringify(this.products);
      try {
        await fs.promises.truncate(this.path);
        await fs.promises.writeFile(this.path, productosJson);
        console.log('Producto eliminado correctamente')
      } catch (error) {
        throw new Error('No se pudieron cargar los productos al archivo')
      }
    }
}      
  const products  = []
  const productoUno = new Product ('Glock 20','Pistola calibre 9x19mm modelo 20 Gen 4',581,'glock20.jpg',1,15)
  const productoDos = new Product ('Bersa BP9CC','Pistola calibre 9x19mm modelo BP9CC',299,'bersaBP9CC.jpg',2,15)
  const productoTres = new Product ('Ruger SR22P','Pistola calibre 22mm modelo SR22P',299,'rugerSR22P.jpg',3,15)
  const productoCuatro = new Product ('Sig Sauer SIG 716','Carabina calibre 7.62 semiautomatica modelo SIG 716',13030,'sig716.jpg',4,15)

  const manager = new ProductManager(products)

  manager.addProduct(productoUno)
  manager.addProduct(productoDos)
  manager.addProduct(productoTres)
  manager.addProduct(productoCuatro)

  manager.updateProduct(2,{price:350})
  manager.deleteProduct(4)
//Imprimo en la consola los productos.
    console.log('-----------------------------')
    console.log(manager);
    console.log('-----------------------------')
    //manager.getProducts()

