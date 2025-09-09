import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\POS\TableController::index
 * @see app/Http/Controllers/POS/TableController.php:14
 * @route '/admin/tables'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tables',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\TableController::index
 * @see app/Http/Controllers/POS/TableController.php:14
 * @route '/admin/tables'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::index
 * @see app/Http/Controllers/POS/TableController.php:14
 * @route '/admin/tables'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\POS\TableController::index
 * @see app/Http/Controllers/POS/TableController.php:14
 * @route '/admin/tables'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\TableController::create
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tables/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\TableController::create
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::create
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\POS\TableController::create
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\TableController::store
 * @see app/Http/Controllers/POS/TableController.php:21
 * @route '/admin/tables'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tables',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POS\TableController::store
 * @see app/Http/Controllers/POS/TableController.php:21
 * @route '/admin/tables'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::store
 * @see app/Http/Controllers/POS/TableController.php:21
 * @route '/admin/tables'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POS\TableController::show
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}'
 */
export const show = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/tables/{table}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\TableController::show
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}'
 */
show.url = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: args.table,
                }

    return show.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::show
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}'
 */
show.get = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\POS\TableController::show
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}'
 */
show.head = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\TableController::edit
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}/edit'
 */
export const edit = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tables/{table}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POS\TableController::edit
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}/edit'
 */
edit.url = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: args.table,
                }

    return edit.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::edit
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}/edit'
 */
edit.get = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\POS\TableController::edit
 * @see app/Http/Controllers/POS/TableController.php:0
 * @route '/admin/tables/{table}/edit'
 */
edit.head = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POS\TableController::update
 * @see app/Http/Controllers/POS/TableController.php:28
 * @route '/admin/tables/{table}'
 */
export const update = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/tables/{table}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\POS\TableController::update
 * @see app/Http/Controllers/POS/TableController.php:28
 * @route '/admin/tables/{table}'
 */
update.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::update
 * @see app/Http/Controllers/POS/TableController.php:28
 * @route '/admin/tables/{table}'
 */
update.put = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\POS\TableController::update
 * @see app/Http/Controllers/POS/TableController.php:28
 * @route '/admin/tables/{table}'
 */
update.patch = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\POS\TableController::destroy
 * @see app/Http/Controllers/POS/TableController.php:35
 * @route '/admin/tables/{table}'
 */
export const destroy = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tables/{table}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\POS\TableController::destroy
 * @see app/Http/Controllers/POS/TableController.php:35
 * @route '/admin/tables/{table}'
 */
destroy.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POS\TableController::destroy
 * @see app/Http/Controllers/POS/TableController.php:35
 * @route '/admin/tables/{table}'
 */
destroy.delete = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const tables = {
    index,
create,
store,
show,
edit,
update,
destroy,
}

export default tables