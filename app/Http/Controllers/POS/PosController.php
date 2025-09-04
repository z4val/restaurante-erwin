<?php

namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        // Pasamos todos los datos necesarios para la interfaz del POS
        return Inertia::render('POS/Index', [
            'categories' => Category::with('products')->get(),
            'tables' => Table::orderBy('name')->get(),
        ]);
    }
}
