<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Lógica para reportes básicos
        $dailySales = Order::whereDate('created_at', Carbon::today())
            ->where('status', 'pagado')
            ->sum('total');

        $totalOrdersToday = Order::whereDate('created_at', Carbon::today())->count();

        // El componente React recibirá estos datos como props
        return Inertia::render('dashboard', [
            'dailySales' => $dailySales,
            'totalOrdersToday' => $totalOrdersToday,
        ]);
    }
}
