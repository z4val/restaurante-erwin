import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\POS\TableController::free
 * @see app/Http/Controllers/POS/TableController.php:43
 * @route '/pos/tables/{table}/free'
 */
export const free = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: free.url(args, options),
    method: 'patch',
})

free.definition = {
    methods: ["patch"],
    url: '/pos/tables/{table}/free',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\POS\TableController::free
 * @see app/Http/Controllers/POS/TableController.php:43
 * @route '/pos/tables/{table}/free'
 */
free.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { table: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: typeof args.table === 'object'
                ? args.table.id
                : args.table,
                }

    return free.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::free
 * @see app/Http/Controllers/POS/TableController.php:43
 * @route '/pos/tables/{table}/free'
 */
free.patch = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: free.url(args, options),
    method: 'patch',
})
const tables = {
    free,
}

export default tables