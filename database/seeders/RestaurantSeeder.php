<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear Mesas
        for ($i = 1; $i <= 10; $i++) {
            Table::create(['name' => 'Mesa ' . $i]);
        }

        // Crear Categorías
        $entradas = Category::create(['name' => 'Entradas', 'description' => 'Deliciosos aperitivos para empezar.']);
        $platosFuertes = Category::create(['name' => 'Platos Fuertes', 'description' => 'Nuestras especialidades principales.']);
        $bebidas = Category::create(['name' => 'Bebidas', 'description' => 'Refrescos, jugos y más.']);
        $postres = Category::create(['name' => 'Postres', 'description' => 'El toque dulce para finalizar.']);

        // Crear Productos
        Product::create(['name' => 'Ceviche Clásico', 'price' => 25.00, 'category_id' => $entradas->id]);
        Product::create(['name' => 'Causa Rellena', 'price' => 18.00, 'category_id' => $entradas->id]);
        Product::create(['name' => 'Lomo Saltado', 'price' => 35.00, 'category_id' => $platosFuertes->id]);
        Product::create(['name' => 'Ají de Gallina', 'price' => 30.00, 'category_id' => $platosFuertes->id]);
        Product::create(['name' => 'Inca Kola 500ml', 'price' => 5.00, 'category_id' => $bebidas->id]);
        Product::create(['name' => 'Chicha Morada Jarra', 'price' => 12.00, 'category_id' => $bebidas->id]);
        Product::create(['name' => 'Torta de Chocolate', 'price' => 15.00, 'category_id' => $postres->id]);
    }
}
