import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import orders from './orders'
import tables from './tables'
/**
* @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:13
 * @route '/pos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:13
 * @route '/pos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:13
 * @route '/pos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\POS\PosController::index
 * @see app/Http/Controllers/POS/PosController.php:13
 * @route '/pos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const pos = {
    index,
orders,
tables,
}

export default pos