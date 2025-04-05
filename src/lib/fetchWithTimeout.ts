const fetchWithTimeout = (
    url: string,
    options: RequestInit = {},
    timeout: number = 7000,
): Promise<Response> => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        fetch(url, {
            ...options,
            signal: controller.signal,
        })
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            .finally(() => clearTimeout(id))
    })
}

export default fetchWithTimeout
