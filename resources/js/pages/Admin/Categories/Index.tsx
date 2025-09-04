import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react'; // Importamos 'router' para el delete
import React, { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Categorías',
        href: route('admin.categories.index'),
    },
];

interface Category {
    id: number;
    name: string;
    description: string;
}

interface CategoriesProps {
    categories: {
        data: Category[];
    };
}

// --- Componente para el Modal de Edición ---
function EditCategoryModal({ category, closeModal }: { category: Category; closeModal: () => void }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.categories.update', category.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out">
            <div className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Editar Categoría</h2>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    {/* Inputs del formulario */}
                    <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre
                        </label>
                        <input
                            id="edit-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descripción
                        </label>
                        <textarea
                            id="edit-description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
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
function DeleteCategoryModal({ category, closeModal }: { category: Category; closeModal: () => void }) {
    const [processing, setProcessing] = useState(false);

    const submitDelete = () => {
        setProcessing(true);
        router.delete(route('admin.categories.destroy', category.id), {
            preserveState: true, // Evita que se recarguen todos los datos, solo los necesarios
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
                    ¿Estás seguro de que deseas eliminar la categoría "<strong>{category.name}</strong>"?
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

export default function Index({ categories }: CategoriesProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    // Estados para controlar la visibilidad de los modales
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categorías" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Formulario para crear categoría */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Crear Nueva Categoría</h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nombre
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:active:bg-gray-300"
                                >
                                    Guardar
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Tabla de categorías existentes */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Categorías Existentes</h2>
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
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Descripción
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Acciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                {category.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {category.description}
                                            </td>
                                            <td className="space-x-2 px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <button
                                                    onClick={() => setEditingCategory(category)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => setDeletingCategory(category)}
                                                    className="font-medium text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Eliminar
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

            {/* Renderizado condicional de los modales */}
            {editingCategory && <EditCategoryModal category={editingCategory} closeModal={() => setEditingCategory(null)} />}
            {deletingCategory && <DeleteCategoryModal category={deletingCategory} closeModal={() => setDeletingCategory(null)} />}
        </AppLayout>
    );
}
