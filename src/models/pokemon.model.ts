import {Entity, model, property} from '@loopback/repository';

@model()
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  classification: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  types: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  resistant?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  weaknesses?: string[];

  @property({
    type: 'object',
    required: true,
  })
  weight: object;

  @property({
    type: 'object',
    required: true,
  })
  height: object;

  @property({
    type: 'number',
    required: true,
  })
  fleeRate: number;

  @property({
    type: 'object',
  })
  evolutionRequirements?: object;

  @property({
    type: 'array',
    itemType: 'object',
  })
  evolutions?: object[];

  @property({
    type: 'number',
    required: true,
  })
  maxCP: number;

  @property({
    type: 'number',
    required: true,
  })
  maxHP: number;

  @property({
    type: 'object',
  })
  attacks?: object;

  @property({
    type: 'array',
    itemType: 'object',
  })
  prevEvolutions?: object[];


  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
