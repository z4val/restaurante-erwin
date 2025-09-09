<?php


namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TableController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tables/Index', [
            'tables' => Table::orderBy('name')->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255|unique:tables']);
        Table::create($request->only('name'));
        return redirect()->route('admin.tables.index')->with('success', 'Mesa creada.');
    }

    public function update(Request $request, Table $table)
    {
        $request->validate(['name' => ['required', 'string', 'max:255', Rule::unique('tables')->ignore($table->id)]]);
        $table->update($request->only('name'));
        return redirect()->route('admin.tables.index')->with('success', 'Mesa actualizada.');
    }

    public function destroy(Table $table)
    {
        // Ojo: Esto es un borrado permanente ya que el modelo no usa SoftDeletes.
        // Se podría añadir una validación para no borrar mesas con pedidos activos.
        $table->delete();
        return redirect()->route('admin.tables.index')->with('success', 'Mesa eliminada.');
    }

    public function freeUp(Table $table)
    {
        // Verificamos si la mesa ya está libre para evitar trabajo innecesario.
        if ($table->status === 'ocupado') {
            $table->status = 'libre';
            $table->save();
        }

        // Redirigimos de vuelta a la página del POS con un mensaje de éxito.
        // Inertia actualizará automáticamente el estado de las mesas en el frontend.
        // return redirect()->route('pos.index')->with('success', "Mesa {$table->name} liberada.");
        return back()->with('success', "Mesa {$table->name} liberada.");
    }
}
