export const responseStub = result => {
    return {
        json() {
            return Promise.resolve(result)
        },
        text() {
            return Promise.resolve(JSON.stringify(result))
        },
        ok: true,
    }
}
