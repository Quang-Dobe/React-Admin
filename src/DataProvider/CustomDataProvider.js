import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';


function CustomRestProvider(apiUrl) {
    var httpClient = fetchUtils.fetchJson;
    var countHeader = 'Content-Range';
    return (
        {
            getList: function (resource, params) {
                // Customize this based on what you want
                // const { page, perPage } = params.pagination;
                // const { field, order } = params.sort;

                // const rangeStart = (page - 1) * perPage;
                // const rangeEnd = page * perPage - 1;

                // const query = {
                //     sort: JSON.stringify([field, order]),
                //     range: JSON.stringify([rangeStart, rangeEnd]),
                //     filter: JSON.stringify(params.filter),
                // };
                // const url = `${apiUrl}/${resource}?${stringify(query)}`;
                const url = `${apiUrl}/${resource}`;
                // const options =
                //     countHeader === 'Content-Range'
                //         ? {
                //             // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                //             headers: new Headers({
                //                 Range: `${resource}=${rangeStart}-${rangeEnd}`,
                //             }),
                //         }
                //         : {};

                return httpClient(url).then(({ headers, json }) => {
                    // Checking if it exists Content-Range or not
                    if (!headers.has(countHeader)) {
                        throw new Error(
                            `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                        );
                    }
                    return {
                        data: json,
                        total:
                            countHeader === 'Content-Range'
                                ? parseInt(
                                    headers.get('content-range').split('/').pop(),
                                    10
                                )
                                : parseInt(headers.get(countHeader.toLowerCase())),
                    };
                });
            },

            getOne: function (resource, params) {
                const url = `${this.apiUrl}/${resource}/${stringify(params.id)}`
                return httpClient(url).then( ({ json }) => ({
                    data: json,
                }) );
            },

            getMany: function (resource, params) {
                var query = {
                    filter: JSON.stringify({ id: params.ids }),
                };
                var url = `${apiUrl}/${resource}?${stringify(query)}`;
                return httpClient(url).then( ({ json }) => ({
                    data: json,
                }) );
            },

            getManyReference: function (resource, params) {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;

                const rangeStart = (page - 1) * perPage;
                const rangeEnd = page * perPage - 1;

                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                    filter: JSON.stringify({
                        ...params.filter,
                        [params.target]: params.id,
                    }),
                };
                const url = `${apiUrl}/${resource}?${stringify(query)}`;
                var options = countHeader === 'Content-Range'
                    ? {
                        // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                        headers: new Headers({
                            Range: "".concat(resource, "=").concat(rangeStart, "-").concat(rangeEnd),
                        }),
                    }
                    : {};
                return httpClient(url, options).then( ({ headers, json }) => {
                    if (!headers.has(countHeader)) {
                        throw new Error("The ".concat(countHeader, " header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ").concat(countHeader, " in the Access-Control-Expose-Headers header?"));
                    }
                    return {
                        data: json,
                        total: countHeader === 'Content-Range'
                            ? parseInt(headers.get('content-range').split('/').pop(), 10)
                            : parseInt(headers.get(countHeader.toLowerCase())),
                    };
                });
            },

            update: (resource, params) => {
                return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                }).then( ({ json }) => ({ data: json }) )
            },

            // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
            updateMany: (resource, params) => {
                return Promise.all(
                    params.ids.map(id =>
                        httpClient(`${apiUrl}/${resource}/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify(params.data),
                        })
                    )
                ).then(responses => ({ data: responses.map(({ json }) => json.id) }))
            },

            create: (resource, params) => {
                return httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                }).then(({ json }) => ({ data: json }))
            },
                

            delete: (resource, params) => {
                return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                }).then(({ json }) => ({ data: json }))
            },
                

            // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
            deleteMany: (resource, params) => {
                return Promise.all(
                    params.ids.map(id =>
                        httpClient(`${apiUrl}/${resource}/${id}`, {
                            method: 'DELETE',
                            headers: new Headers({
                                'Content-Type': 'text/plain',
                            }),
                        })
                    )
                ).then( responses => ({
                    data: responses.map(({ json }) => json.id),
                }) )
            }
        }
    )
}

export default CustomRestProvider