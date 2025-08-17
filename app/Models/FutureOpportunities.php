<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FutureOpportunities extends Model
{
    use HasFactory;

    protected $table = 'future_opportunities';

    protected $fillable = [
        'specialization_id',
        'name',
        'details',
        'icon',
    ];


    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
