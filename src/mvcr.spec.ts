import Router from './mvcr'

const fakePayload = {
    routes: {
        home: {
            handler (ctx: any) { return true },
            re: /test/
        }
    }
}

// Base properties
test('current is set to null', () => {
    const router = new Router(fakePayload)
    expect(router.current).toEqual(null)
})

test('routes are set', () => {
    const router = new Router(fakePayload)
    expect(router.routes).toEqual(fakePayload.routes)
})

// test('trimSlashes', () => {
//     const router = new Router({ routes: {} })
//     expect(router.trimSlashes('/test')).toEqual('test')
//     expect(router.trimSlashes('/test/hello')).toEqual('test/hello')
//     expect(router.trimSlashes('///test/whatever/hi//')).toEqual('test/whatever/hi')
// })

// TODO account for booleans?
test('qs', () => {
    const router = new Router({ routes: {} })
    expect(router.qs('/?whatever=true')).toEqual({ whatever: 'true' })
    expect(router.qs('/?whatever=true&hello=there')).toEqual({ whatever: 'true', hello: 'there' })
})

test('gethandler', () => {
    const router = new Router({ routes: {
        home: {
            re: /test/,
            handler () {
                return true
            }
        }
    }})
    const fakeRoute = {
        path: 'test',
        query: {}
    }

    const expectedHandler = {
        name: 'home',
        ...router.routes.home
    }

    const handler = router.getHandler(fakeRoute)
    expect(handler).toEqual(expectedHandler)
})
