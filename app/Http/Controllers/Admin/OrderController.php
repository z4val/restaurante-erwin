<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with(['user', 'table', 'products'])
                // ->latest()
                ->paginate(10),
            'tables' => Table::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Los pedidos se crean desde el POS, no desde admin
        return redirect()->route('admin.orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->load(['user', 'table', 'products']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pendiente,en_proceso,servido,pagado,cancelado',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('admin.orders.index')
            ->with('success', 'Estado del pedido actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete(); // Soft delete

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pedido eliminado.');
    }

    /**
     * Resolver pedido (marcar como pagado)
     */
    public function resolve(Order $order)
    {
        if ($order->status === 'cancelado') {
            return redirect()->route('admin.orders.index')
                ->with('error', 'No se puede resolver un pedido cancelado.');
        }

        $order->update(['status' => 'pagado']);
        $order->table()->update(['status' => 'libre']);  // también válido para BelongsTo

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pedido resuelto y marcado como pagado.');
    }

    /**
     * Cancelar pedido
     */
    public function cancel(Order $order)
    {
        if ($order->status === 'pagado') {
            return redirect()->route('admin.orders.index')
                ->with('error', 'No se puede cancelar un pedido ya pagado.');
        }

        $order->update(['status' => 'cancelado']);
        if ($order->table_id) {
        $order->table()->update(['status' => 'libre']);  // también válido para BelongsTo
    }

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pedido cancelado.');
    }
}