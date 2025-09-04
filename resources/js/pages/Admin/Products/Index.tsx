import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Productos',
        href: route('admin.products.index'),
    },
];

// --- Tipos de Datos ---
interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category; // Relación anidada
}

interface ProductsProps {
    products: {
        data: Product[];
    };
    categories: Category[]; // Lista completa para los selectores
}

// --- Componente para el Modal de Edición ---
function EditProductModal({ product, categories, closeModal }: { product: Product; categories: Category[]; closeModal: () => void }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        category_id: product.category?.id.toString() || '', // El valor del select debe ser string
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.products.update', product.id), { onSuccess: () => closeModal() });
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out">
            <div className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Editar Producto</h2>
                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre
                        </label>
                        <input
                            id="edit-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Precio (S/)
                        </label>
                        <input
                            id="edit-price"
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        />
                        {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                    </div>
                    <div>
                        <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Categoría
                        </label>
                        <select
                            id="edit-category"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="mt-2 text-sm text-red-600">El campo categoría es obligatorio.</p>}
                    </div>
                    <div>
                        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descripción
                        </label>
                        <textarea
                            id="edit-description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        />
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
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- Componente para el Modal de Eliminación ---
function DeleteProductModal({ product, closeModal }: { product: Product; closeModal: () => void }) {
    const [processing, setProcessing] = useState(false);
    const submitDelete = () => {
        setProcessing(true);
        router.delete(route('admin.products.destroy', product.id), {
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
                    ¿Estás seguro de que deseas eliminar el producto "<strong>{product.name}</strong>"?
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

export default function Index({ products, categories }: ProductsProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: 0,
        category_id: '',
    });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Formulario para crear producto */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Crear Nuevo Producto</h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Nombre
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                        />
                                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Precio (S/)
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', parseFloat(e.target.value) || 0)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                        />
                                        {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Categoría
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="mt-2 text-sm text-red-600">El campo categoría es obligatorio.</p>}
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Descripción (Opcional)
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white"
                                >
                                    Guardar Producto
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Tabla de productos existentes */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Productos Existentes</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">
                                            Categoría
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Precio</th>
                                        <th className="relative px-6 py-3">
                                            <span className="sr-only">Acciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {product.category?.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                S/ {product.price.toFixed(2)}
                                            </td>
                                            <td className="space-x-4 px-6 py-4 text-right text-sm font-medium">
                                                <button
                                                    onClick={() => setEditingProduct(product)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingProduct(product)}
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

            {editingProduct && <EditProductModal product={editingProduct} categories={categories} closeModal={() => setEditingProduct(null)} />}
            {deletingProduct && <DeleteProductModal product={deletingProduct} closeModal={() => setDeletingProduct(null)} />}
        </AppLayout>
    );
}
