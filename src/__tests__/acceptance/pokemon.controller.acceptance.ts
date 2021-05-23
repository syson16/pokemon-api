import {Client, expect} from '@loopback/testlab';
import {PokemonApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PokemonController', () => {
  let app: PokemonApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /pokemons/{id}', async () => {
    const res = await client.get('/pokemons/001').expect(200);
    expect(res.body).to.containEql({name: 'Bulbasaur'});
  });
});
