import FormData from 'form-data'

export interface ObjectLike {
    [key: string]: any;
}

export function buildFormData<Param extends Record<string, any>>(param: Param, meta?: Record<string, any>): FormData {
    const form = new FormData()
    for (const key in param) {
        const value = param[key]
        if (value !== undefined) {
            const isBlobValue = (value as object) instanceof Blob
            const isBufferValue = Buffer.isBuffer(value)
            if (isBlobValue) {
                form.append(key, value, meta?.[key])
            } else if (isBufferValue) {
                form.append(key, value, meta?.[key])
            } else {
                const finalValue = typeof value === 'string' ? value : JSON.stringify(param[key])
                form.append(key, finalValue)
            }
        }
    }
    return form
}

export function encodeUrlQuery(url: string, query: ObjectLike = {}): URL {
    const requestUrl = new URL(url)
    for (const qKey of Object.keys(query)) {
        requestUrl.searchParams.append(qKey, query[qKey])
    }
    return requestUrl
}
