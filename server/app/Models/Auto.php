<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auto extends Model
{
    protected $table = "autos";

    protected $fillable = [
        'titulo',
        'caracteristicas',
        'id_marca',
        'eliminado'
    ];

    public $timestamps = false;

    public function marca()
    {
        return $this->belongsTo('App\Models\Marca', 'id_marca');
    }
}
