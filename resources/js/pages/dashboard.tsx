import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/index';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    dailySales: number;
    totalOrdersToday: number;
}

export default function Dashboard({ dailySales, totalOrdersToday }: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(amount);
    };

    return (
        // Aquí está la corrección: usamos 'breadcrumbs' en lugar de 'header'
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium">Resumen del Día</h3>
                            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Card para Ventas del Día */}
                                <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-700">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ventas Totales (Hoy)</h4>
                                    <p className="mt-1 text-3xl font-semibold">{formatCurrency(dailySales)}</p>
                                </div>
                                {/* Card para Pedidos del Día */}
                                <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-700">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pedidos Totales (Hoy)</h4>
                                    <p className="mt-1 text-3xl font-semibold">{totalOrdersToday}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
