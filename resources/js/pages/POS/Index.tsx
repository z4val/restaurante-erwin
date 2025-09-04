import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

// --- (Las interfaces y tipos se mantienen igual) ---
interface Product {
    id: number;
    name: string;
    price: number;
}
interface Category {
    id: number;
    name: string;
    products: Product[];
}
interface Table {
    id: number;
    name: string;
    status: 'libre' | 'ocupado' | 'reservado';
}
interface CartItem extends Product {
    quantity: number;
}
interface POSProps {
    categories: Category[];
    tables: Table[];
}
interface OrderFormData {
    table_id: number | null;
    items: { id: number; quantity: number }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Punto de Venta',
        href: route('pos.index'),
    },
];

export default function Index({ categories, tables }: POSProps) {
    // --- 1. DECLARACIÓN DE HOOKS (DEBEN IR PRIMERO) ---
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<OrderFormData>({
        table_id: null,
        items: [],
    });

    // --- 2. HOOKS DE EFECTOS (DESPUÉS DE LOS DE ESTADO) ---
    useEffect(() => {
        setData(
            'items',
            cart.map(({ id, quantity }) => ({ id, quantity })),
        );
    }, [cart]);

    useEffect(() => {
        setData('table_id', selectedTable);
    }, [selectedTable]);

    // --- 3. FUNCIONES DEL COMPONENTE (DESPUÉS DE TODOS LOS HOOKS) ---
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setFormError(null);
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
            }
            return prevCart.filter((item) => item.id !== productId);
        });
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const submitOrder = () => {
        // Ahora 'data' está definido y actualizado gracias a los useEffect.
        if (!data.table_id) {
            setFormError('Por favor, selecciona una mesa.');
            return;
        }
        if (data.items.length === 0) {
            setFormError('Por favor, añade productos al pedido.');
            return;
        }

        post(route('pos.orders.store'), {
            onSuccess: () => {
                setCart([]);
                setSelectedTable(null);
                reset();
                setFormError(null);
            },
        });
    };

    const freeUpTable = (tableId: number) => {
        router.patch(
            route('pos.tables.free', tableId),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedTable === tableId) {
                        setSelectedTable(null);
                    }
                },
            },
        );
    };

    // --- 4. RETORNO DEL JSX (AL FINAL) ---
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="py-12">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:px-6 lg:grid-cols-3 lg:px-8">
                    {/* Columna de Productos y Mesas */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Selección de Mesa */}
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Seleccionar Mesa</h3>
                            <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                                {tables.map((table) => (
                                    <button
                                        key={table.id}
                                        onClick={() => {
                                            if (table.status === 'libre') {
                                                setSelectedTable(table.id);
                                                setFormError(null);
                                            } else if (table.status === 'ocupado') {
                                                freeUpTable(table.id);
                                            }
                                        }}
                                        className={`rounded-lg p-2 text-center font-bold text-white transition-transform duration-150 ease-in-out hover:scale-105 ${selectedTable === table.id ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : ''} ${table.status === 'libre' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} ${table.status === 'reservado' ? 'cursor-not-allowed bg-yellow-500' : 'cursor-pointer'} `}
                                    >
                                        {table.name}
                                        {table.status === 'ocupado' && <span className="block text-xs font-normal">(Liberar)</span>}
                                    </button>
                                ))}
                            </div>
                            {errors.table_id && <p className="mt-2 text-sm text-red-600">{errors.table_id}</p>}
                        </div>

                        {/* Lista de Productos por Categoría */}
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{category.name}</h3>
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {category.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex flex-col items-center rounded-lg border p-3 text-center dark:border-gray-700"
                                        >
                                            <span className="font-semibold dark:text-gray-100">{product.name}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">S/ {product.price.toFixed(2)}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="mt-2 w-full cursor-pointer rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
                                            >
                                                Añadir
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Columna del Pedido */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Pedido Actual - {selectedTable ? tables.find((t) => t.id === selectedTable)?.name : 'Sin Mesa'}
                            </h3>
                            {errors.items && <p className="mt-2 text-sm text-red-600">Debe añadir al menos un producto.</p>}
                            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400">El pedido está vacío.</p>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium dark:text-gray-100">{item.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.quantity} x S/ {item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold dark:text-gray-200">S/ {(item.price * item.quantity).toFixed(2)}</span>
                                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t pt-4 dark:border-gray-700">
                                <span className="text-xl font-bold dark:text-gray-100">Total:</span>
                                <span className="text-xl font-bold dark:text-gray-100">S/ {cartTotal.toFixed(2)}</span>
                            </div>
                            {formError && <p className="mt-4 text-center text-sm text-red-600">{formError}</p>}
                            <button
                                onClick={submitOrder}
                                disabled={processing}
                                className="mt-6 w-full cursor-pointer rounded-lg bg-green-600 py-3 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
                            >
                                {processing ? 'Enviando...' : 'Crear Pedido'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
