<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'price', 'category_id', 'image_url'];

    protected $casts = [
        'price' => 'float',
    ];

    // Un producto pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Un producto puede estar en muchos pedidos
    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity', 'price')->withTimestamps();
    }
}
