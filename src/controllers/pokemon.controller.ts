import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';

export class PokemonController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) { }

  @post('/pokemons')
  @response(200, {
    description: 'Pokemon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pokemon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {
            title: 'NewPokemon',

          }),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<Pokemon> {
    return this.pokemonRepository.create(pokemon);
  }

  @get('/pokemons/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.pokemonRepository.count(where);
  }

  @get('/pokemons')
  @response(200, {
    description: 'Array of Pokemon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pokemon) filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.find(filter);
  }

  @patch('/pokemons')
  @response(200, {
    description: 'Pokemon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.pokemonRepository.updateAll(pokemon, where);
  }

  @get('/pokemons/{id}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pokemon, {exclude: 'where'}) filter?: FilterExcludingWhere<Pokemon>
  ): Promise<Pokemon> {
    return this.pokemonRepository.findById(id, filter);
  }

  @patch('/pokemons/{id}')
  @response(204, {
    description: 'Pokemon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.updateById(id, pokemon);
  }

  @put('/pokemons/{id}')
  @response(204, {
    description: 'Pokemon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.replaceById(id, pokemon);
  }

  @del('/pokemons/{id}')
  @response(204, {
    description: 'Pokemon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pokemonRepository.deleteById(id);
  }
}
