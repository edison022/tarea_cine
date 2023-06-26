//Se define una interfaz Observador que requiere que las clases que la implementen 
//tengan un método notificarCambio que toma un objeto Cine como parámetro y no devuelve nada.
/*
El patrón Observer se implementa mediante la interfaz Observador y su uso en la clase Cine. Los clientes pueden registrarse como observadores y 
recibir notificaciones cuando se produzcan cambios relevantes en el cine, como se muestra en los métodos registrarObservador() y notificarObservadores().
*/
interface Observador {
  notificarCambio(cine: Cine): void;
}
//Se define una clase Pelicula que tiene un constructor que toma un parámetro nombre y asigna ese valor a una propiedad pública nombre.
class Pelicula {
  constructor(public nombre: string) {}
}
//Se define una clase PeliculaAccion que extiende la clase Pelicula, esta clase tiene un constructor 
//que toma tres parámetros: nombre, clasificacion y duracion. El constructor de la clase base Pelicula se invoca usando super(nombre).
/*
El polimorfismo se aplica mediante el uso de herencia y la capacidad de las clases hijas de tener comportamiento específico adicional. Por ejemplo, las clases 
PeliculaAccion y PeliculaAventura heredan de la clase base Pelicula, lo que permite tratar objetos de las clases hijas como objetos de la clase base. Esto facilita 
el uso polimórfico al trabajar con diferentes géneros de películas.
*/
class PeliculaAccion extends Pelicula {
  constructor(nombre: string, public clasificacion: string, public duracion: number) {
    super(nombre);
  }
}
//Se define una clase PeliculaAventura que extiende la clase Pelicula. Esta clase tiene un constructor que toma tres parámetros: nombre, clasificacion y ubicacion. 
//El constructor de la clase base Pelicula se invoca usando super(nombre). Las mismas que ocupa la anterior clase.
class PeliculaAventura extends Pelicula {
  constructor(nombre: string, public clasificacion: string, public ubicacion: string) {
    super(nombre);
  }
}
/*
La herencia se aplica mediante la relación entre las clases Pelicula, PeliculaAccion y PeliculaAventura. Las clases hijas heredan 
los atributos y métodos de la clase base Pelicula y pueden agregar comportamiento específico adicional.
*/
//Se define una clase Cine que implementa la interfaz Observador.
class Cine implements Observador {
  private static instancia: Cine;
  private salas: Sala[] = [];
  private observadores: Observador[] = [];

  private peliculas: Pelicula[] = [
    new Pelicula("John Wick"),
    new Pelicula("Aladdin"),
    new Pelicula("Avengers"),
    new Pelicula("Pikachu"),
    new Pelicula("Mario")
  ];
  /*
  La asociación se representa en el código mediante la relación entre las clases Cine y Sala. 
  El cine tiene una asociación con las salas, ya que contiene internamente las salas como parte de su estructura.
  */
  private productos: ProductoComestible[] = [
    new ProductoComestible("Canguil"),
    new ProductoComestible("Hot-Dog"),
    new ProductoComestible("Nachos"),
    new ProductoComestible("Bebidas")
  ];

  private constructor() {
    for (let i = 0; i < 7; i++) {
      this.salas.push(new Sala(i + 1, 50));
    }
  }
//getInstancia es un método estático que devuelve la instancia única del cine, creándola si aún no existe.
/*
La composición se aplica mediante la relación entre las clases Cine y Sala. El cine tiene una composición con las 
salas, ya que las salas son componentes internos del cine y se crean directamente dentro de la clase Cine.
*/
  public static getInstancia(): Cine {
    if (!Cine.instancia) {
      Cine.instancia = new Cine();
    }
    return Cine.instancia;
  }
//asignarProductoGratis es un método que el cine utiliza para asignar un producto gratis a los clientes. 
//Se selecciona un producto al azar de una lista de productos gratuitos y se devuelve.
  public asignarProductoGratis(): string {
    const productosGratis = ["barra de chocolate", "gafas 3D"];
    const productoGratis = productosGratis[Math.floor(Math.random() * productosGratis.length)];
    return productoGratis;
  }
//mostrarDetalleCliente es un método que muestra los detalles del cliente, incluido su nombre, película seleccionada, 
//sala, asiento, producto gratis y productos comestibles seleccionados.
  public mostrarDetalleCliente(
    nombreCliente: string,
    pelicula: Pelicula,
    sala: Sala,
    asiento: number,
    productoGratis: string,
    productosComestibles: ProductoComestible[]
  ): void {
    console.log("Detalle del cliente:");
    console.log("Nombre: " + nombreCliente);
    console.log("Película escogida: " + pelicula.nombre);
    console.log("Sala de cine: " + sala.numero);
    console.log("Asiento: " + asiento);
    console.log("Producto gratis: " + productoGratis);
    console.log("Productos comestibles:");
    productosComestibles.forEach((producto) => {
      console.log("- " + producto.nombre);
    });
  }
//Los métodos obtenerPelicula, obtenerSala y obtenerProductoComestible se utilizan para buscar y 
//devolver los objetos correspondientes en base a los nombres proporcionados.
  public obtenerPelicula(nombrePelicula: string): Pelicula | undefined {
    return this.peliculas.find((pelicula) => pelicula.nombre === nombrePelicula);
  }

  public obtenerSala(numeroSala: number): Sala | undefined {
    return this.salas.find((sala) => sala.numero === numeroSala);
  }
/*
La agregación se representa en el código mediante la relación entre las clases Cine y ProductoComestible. El cine contiene una lista de productos comestibles, 
lo que indica una relación de agregación, ya que los productos comestibles existen independientemente del cine.
*/
  public obtenerProductoComestible(nombreProducto: string): ProductoComestible | undefined {
    return this.productos.find((producto) => producto.nombre === nombreProducto);
  }
//registrarObservador agrega un observador a la lista de observadores del cine.
  public registrarObservador(observador: Observador): void {
    this.observadores.push(observador);
  }
//notificarObservadores invoca el método notificarCambio en cada observador registrado.
  public notificarObservadores(): void {
    for (const observador of this.observadores) {
      observador.notificarCambio(this);
    }
  }
//notificarCambio es el método de la interfaz Observador que se invoca cuando se produce un cambio en el cine. 
//En este caso, simplemente imprime un mensaje.
  notificarCambio(cine: Cine): void {
    console.log("Se produjo un cambio en el cine.");
  }
}
//Se define una clase Sala que tiene un constructor que toma dos parámetros: numero y capacidad, 
//y asigna esos valores a las propiedades públicas correspondientes.
class Sala {
  constructor(public numero: number, public capacidad: number) {}
}
//Se define una clase ProductoComestible que tiene un constructor que toma un 
//parámetro nombre y asigna ese valor a la propiedad pública nombre.
class ProductoComestible {
  constructor(public nombre: string) {}
}
/*
El patrón Singleton se aplica en la clase Cine. La implementación del método getInstancia() 
garantiza que solo se crea una única instancia de la clase Cine y proporciona un punto centralizado de acceso a esa instancia.
*/
//Aquí se muestra un ejemplo de uso del sistema de cine:
const cine = Cine.getInstancia();//Se obtiene la instancia del cine utilizando el método estático getInstancia().
//Se definen variables como nombreCliente, pelicula, numeroSala, sala, asiento, productoGratis y productosComestibles 
//utilizando los métodos proporcionados por la instancia del cine.
const nombreCliente = "Roger";
const pelicula = cine.obtenerPelicula("Mario");
const numeroSala = 1;
const sala = cine.obtenerSala(numeroSala);
const asiento = 25;
const productoGratis = cine.asignarProductoGratis();
const productosComestibles = [
  cine.obtenerProductoComestible("Canguil"),
  cine.obtenerProductoComestible("Bebidas"),
];
//Se verifica si la sala existe y luego se muestra el detalle del cliente utilizando el método mostrarDetalleCliente del cine.
if (sala) {
  cine.mostrarDetalleCliente(
    nombreCliente,
    pelicula!,
    sala,
    asiento,
    productoGratis,
    productosComestibles
  );
} else {
  //Si la sala no existe, se muestra un mensaje de error.
  console.log(`La sala ${numeroSala} no existe en el cine.`);
}
/*
En el código se aplica el principio de Responsabilidad Única (SRP) al separar las responsabilidades en diferentes clases y métodos. 
Cada clase tiene una responsabilidad específica, como la clase Cine que se encarga de gestionar las salas y las películas, y la clase 
Cliente que se encarga de mostrar el detalle del cliente.
*/
