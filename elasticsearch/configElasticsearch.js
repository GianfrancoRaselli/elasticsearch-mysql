const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'prueba_elasticsearch',
  user: 'root',
  password: ''
});
connection.connect();

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

const createAutos = async () => {
  try {
    await client.indices.get({ index: 'autos' });
  } catch {
    await client.indices.create({
      index: 'autos',
      body: {
        settings: {
          analysis: {
            filter: {
              my_stop: {
                type: 'stop',
                stopwords: ['_spanish_']
              },
              my_stemmer: {
                type: 'stemmer',
                language: 'light_spanish'
              },
              my_synonyms: {
                type: 'synonym_graph',
                synonyms: [
                  'auto, transporte, carro, móvil'
                ]
              },
            },
            analyzer: {
              my_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                language: 'spanish',
                filter: ['lowercase', 'my_stop', 'my_stemmer', 'my_synonyms'],
              }
            }
          }
        },
        mappings: {
          properties: {
            titulo: {
              type: 'text',
              analyzer: 'my_analyzer',
              search_analyzer: 'my_analyzer'
            },
            caracteristicas: {
              type: 'text',
              analyzer: 'my_analyzer',
              search_analyzer: 'my_analyzer'
            },
            marca: {
              marca: {
                type: 'text',
                analyzer: 'my_analyzer',
                search_analyzer: 'my_analyzer'
              },
              descripcion: {
                type: 'text',
                analyzer: 'my_analyzer',
                search_analyzer: 'my_analyzer'
              }
            },
            eliminado: {
              type: 'keyword',
            }
          }
        }
      }
    });
  }
}

const updateAutos = () => {
  connection.query('CALL getAutosSinActualizar()', (error, result) => {
    result[0].forEach(auto => {
      client.index({
        index: 'autos',
        id: auto.id.toString(),
        body: {
          titulo: auto.titulo,
          caracteristicas: auto.caracteristicas,
          marca: {
            marca: auto.marca,
            descripcion: auto.descripcion_marca,
          },
          eliminado: auto.eliminado,
        },
      });
    });
  });
}

createAutos();

updateAutos();

connection.end();
