const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

const prueba = async () => {
  const query = '';

  const result = await client.search({
    index: 'autos',
    body: {
      query: {
        bool: {
          must: {
            multi_match: {
              query,
              fields: ['titulo^2', 'caracteristicas^1.5', 'marca.marca^2', 'marca.descripcion'],
              fuzziness: 'AUTO',
            }
          }
        }
      },
      min_score: 0.5,
    }
  });

  const autos = [];
  result.hits.hits.forEach(element => {
    let auto = element._source;
    auto._id = element._id;

    autos.push(auto);
  });

  console.log(autos);
}

prueba();
