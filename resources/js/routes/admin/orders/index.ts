import { type RouteDefinition, type RouteQueryOptions } from './../../../wayfinder';
import { queryParams } from '@/wayfinder';

/**
 * @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:15
 * @route '/admin/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:15
 * @route '/admin/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:45
 * @route '/admin/orders/{order}'
 */
export const show = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:45
 * @route '/admin/orders/{order}'
 */
show.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    const raw = Array.isArray(args) ? args[0] : args;
    const order =
      typeof raw === 'number'
        ? raw
        : 'id' in (raw as any)
          ? (raw as any).id
          : 'order' in (raw as any)
            ? (typeof (raw as any).order === 'number'
                ? (raw as any).order
                : (raw as any).order.id)
            : (() => { throw new Error('Argumento inválido para order'); })();
    return show.definition.url.replace('{order}', String(order)) + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\OrderController::resolve
 * @route '/admin/orders/{order}/resolve'
 */
export const resolve = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resolve.url(args, options),
    method: 'patch',
})

resolve.definition = {
    methods: ["patch"],
    url: '/admin/orders/{order}/resolve',
} satisfies RouteDefinition<["patch"]>

/**
 * @see \App\Http\Controllers\Admin\OrderController::resolve
 * @route '/admin/orders/{order}/resolve'
 */
resolve.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    const raw = Array.isArray(args) ? args[0] : args;
const order =
  typeof raw === 'number'
    ? raw
    : 'id' in (raw as any)
      ? (raw as any).id
      : 'order' in (raw as any)
        ? (typeof (raw as any).order === 'number'
            ? (raw as any).order
            : (raw as any).order.id)
        : (() => { throw new Error('Argumento inválido para order'); })();
    return resolve.definition.url.replace('{order}', String(order)) + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\OrderController::cancel
 * @route '/admin/orders/{order}/cancel'
 */
export const cancel = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

cancel.definition = {
    methods: ["patch"],
    url: '/admin/orders/{order}/cancel',
} satisfies RouteDefinition<["patch"]>

/**
 * @see \App\Http\Controllers\Admin\OrderController::cancel
 * @route '/admin/orders/{order}/cancel'
 */
cancel.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    const raw = Array.isArray(args) ? args[0] : args;
const order =
  typeof raw === 'number'
    ? raw
    : 'id' in (raw as any)
      ? (raw as any).id
      : 'order' in (raw as any)
        ? (typeof (raw as any).order === 'number'
            ? (raw as any).order
            : (raw as any).order.id)
        : (() => { throw new Error('Argumento inválido para order'); })();
    return cancel.definition.url.replace('{order}', String(order)) + queryParams(options)
}