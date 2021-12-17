<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auto;
use App\Models\Marca;
use Illuminate\Support\Facades\DB;
use Exception;
use Elasticsearch\ClientBuilder;

class AutoController extends Controller
{
  protected $client;

  function __construct()
  {
    $this->client = ClientBuilder::create()->setHosts(['localhost:9200'])->build();
  }

  public function buscarAutos()
  {
    $params = [
      'index' => 'autos'
    ];

    $result = $this->client->search($params);

    return response()->json($result);
  }

  public function buscarAutosPorConsulta($consulta)
  {
    $params = [
      'index' => 'autos',
      'body'  => [
        'query' => [
          'bool' => [
            'must' => [
              'multi_match' => [
                'query' => $consulta,
                'fields' => ['titulo^2', 'caracteristicas^1.5', 'marca.marca^2', 'marca.descripcion'],
                'fuzziness' => 'AUTO',
              ]
            ]
          ]
        ],
        'min_score' => 0.5,
      ]
    ];

    $result = $this->client->search($params);

    return response()->json($result);
  }
}
