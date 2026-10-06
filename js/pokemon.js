class Pokemon {

    // (1)
    
    // (2)
    static activePokemon = null;
    static keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };

    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.element = this.createElement();
        this.addEventListeners();
    }
    
    createElement() {
      // (3) 
      const img = document.createElement('img');
      img.src = this.sprite;
      img.style.position = 'absolute';
      img.style.top = Math.ceil(Math.random()*100) + 'px';
      img.style.left = Math.ceil(Math.random()*100) + 'px';
      document.body.appendChild(img);
      return img;
    }
    
    addEventListeners() {   
     	// (4)
      this.element.addEventListener('click', () =>{Pokemon.activePokemon = this;});
    }
    
    move(step) { 
    	// (5)
      let top = parseInt(this.element.style.top);
      let left = parseInt(this.element.style.left);
      if(Pokemon.keys.ArrowUp) this.element.style.top = (top - step) + 'px'

      if(Pokemon.keys.ArrowDown) this.element.style.top = (top + step) + 'px'

      if(Pokemon.keys.ArrowLeft) this.element.style.left = (left- step) + 'px'

      if(Pokemon.keys.ArrowRight) this.element.style.left = (left + step) + 'px'
    }
} // end of Pokemon class


document.addEventListener('keydown', function (event) {
  
   // (6)
   Pokemon.keys[event.key] = true;

});

document.addEventListener('keyup', function (event) {
   
  // (7)
  Pokemon.keys[event.key] = false;

});

function moveActivePokemon() {
   
  // (8) 
  const step = 5;
  if(Pokemon.activePokemon){
    Pokemon.activePokemon.move(step);
  }

}

setInterval(moveActivePokemon, 10);

// Instantiate Pokémon
const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle'];

function cargarJuego () {

  let imagen = new Image()
imagen.src ="https://preview.redd.it/dnlz6c3xni951.jpg?width=1080&crop=smart&auto=webp&s=84af1d3e4e27eddc5c612a7b75244a9886389f77"
imagen.width = 600;
imagen.height = 500;
document.body.appendChild(imagen);

   const promesas = pokemonNames.map(nombre => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .then(response => response.json())
      .then(data => {
        return new Pokemon(nombre, data.sprites.front_default);
      });
  });
  // llamar a loadImage

  // Cargar los Pokemon de pokemonNames con Promise.all (NO usar forEach):
  // se lanzan todas las peticiones en paralelo y se espera a que terminen todas.
  
 Promise.all(promesas)
 .then(pokemons => { console.log(pokemons)

  const input = document.querySelector('input');
  const boton = document.getElementById("buscarPokemon");
  boton.addEventListener('click', () => {
    nombre = input.value; 
  

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`) //esta mal
  .then(response => response.json())
  .then(data => {return new Pokemon(nombre, data.sprites.front_default)});
});
  
});

}

function loadImage (url) {
 /// desarrolla la promesa
 return new Promise ((resolve, reject) => {
  const image = new Image();
  image.addEventListener('load', () => resolve(image));
  image.addEventListener('error', () => reject("No load"));
  image.src = url;

 });
 
}
cargarJuego();