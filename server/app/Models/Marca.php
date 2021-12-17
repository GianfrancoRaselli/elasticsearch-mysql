<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = "marcas";

    protected $fillable = [
        'marca',
        'descripcion',
        'eliminado'
    ];

    public $timestamps = false;

    public function autos()
    {
        return $this->hasMany('App\Models\Auto', 'id_marca');
    }
}
