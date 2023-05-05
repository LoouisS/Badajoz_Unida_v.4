export class Model {

  idiomas: any = [
    {id: 1, titulo: 'Español'},
    {id: 2, titulo: 'Inglés'},
    {id: 3, titulo: 'Francés'}
  ]

  categorias: any = [
    {id: 1, titulo: 'Deporte'},
    {id: 2, titulo: 'Cultura'},
    {id: 3, titulo: 'Educación'},
    {id: 4, titulo: 'Música'},
    {id: 5, titulo: 'Gastronomía'}
  ]

  intereses: any = [
    {id: 1, titulo: 'Futbol', categoria_id: 1},
    {id: 2, titulo: 'Baloncesto', categoria_id: 1},
    {id: 3, titulo: 'Voleibol', categoria_id: 1},
    {id: 4, titulo: 'Cine', categoria_id: 2},
    {id: 5, titulo: 'Arte', categoria_id: 2},
    {id: 6, titulo: 'Museos', categoria_id: 2},
    {id: 7, titulo: 'Programación', categoria_id: 3},
    {id: 8, titulo: 'Idiomas', categoria_id: 3},
    {id: 9, titulo: 'Fotografía', categoria_id: 3},
    {id: 10, titulo: 'Rock', categoria_id: 4},
    {id: 11, titulo: 'Pop', categoria_id: 4},
    {id: 12, titulo: 'Música clásica', categoria_id: 4},
    {id: 13, titulo: 'Talleres de cocina', categoria_id: 5},
    {id: 14, titulo: 'Degustación de comida', categoria_id: 5},
    {id: 15, titulo: 'Concursos de cocina', categoria_id: 5},
  ]

  getIdiomas(){
    return this.idiomas;
  }

  getCategorias(){
    return this.categorias;
  }

  getCategoriaById(id: number){
    for(let categoria of this.categorias){
      if(categoria.id == id){
        return categoria;
      }
    }
    return null;
  }

  getInteresesByCategoriaId(categoriaId: number){
    let intereses: any[] = [];
    for(let interes of this.intereses){
      if(interes.categoria_id == categoriaId){
        intereses.push(interes);
      }
    }
    return intereses;
  }

}
