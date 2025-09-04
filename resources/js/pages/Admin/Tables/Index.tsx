import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react'; // Iconos para los botones
import React, { useState } from 'react';
import { route } from 'ziggy-js';

// --- Tipos ---
interface Table {
    id: number;
    name: string;
}
interface TablesProps {
    tables: { data: Table[] };
}

// --- Componente para el Modal de Edición ---
function EditTableModal({ table, closeModal }: { table: Table; closeModal: () => void }) {
    const { data, setData, patch, processing, errors } = useForm({ name: table.name || '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.tables.update', table.id), { onSuccess: () => closeModal() });
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out">
            <div className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Editar Mesa</h2>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="edit-table-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre de la Mesa
                        </label>
                        <input
                            id="edit-table-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- Componente para el Modal de Eliminación ---
function DeleteTableModal({ table, closeModal }: { table: Table; closeModal: () => void }) {
    const [processing, setProcessing] = useState(false);

    const submitDelete = () => {
        setProcessing(true);
        router.delete(route('admin.tables.destroy', table.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out">
            <div className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Confirmar Eliminación</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    ¿Estás seguro de que deseas eliminar la mesa "<strong>{table.name}</strong>"?
                </p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={submitDelete}
                        disabled={processing}
                        className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {processing ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Index({ tables }: TablesProps) {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '' });
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [deletingTable, setDeletingTable] = useState<Table | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tables.store'), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Gestión de Mesas', href: route('admin.tables.index') }]}>
            <Head title="Mesas" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Formulario de creación */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Crear Nueva Mesa</h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 max-w-xl space-y-6">
                                <div>
                                    <label htmlFor="new-table-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nombre de la Mesa (ej. Mesa 1, Barra 3)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            id="new-table-name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white"
                                        >
                                            Crear
                                        </button>
                                    </div>
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Tabla de Mesas */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Mesas Existentes</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Nombre
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Acciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {tables.data.map((table) => (
                                        <tr key={table.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                {table.name}
                                            </td>
                                            <td className="space-x-4 px-6 py-4 text-right text-sm font-medium">
                                                <button
                                                    onClick={() => setEditingTable(table)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingTable(table)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {editingTable && <EditTableModal table={editingTable} closeModal={() => setEditingTable(null)} />}
            {deletingTable && <DeleteTableModal table={deletingTable} closeModal={() => setDeletingTable(null)} />}
        </AppLayout>
    );
}
