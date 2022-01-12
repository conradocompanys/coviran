export const catalogoService = {
    getData,
    getImages,
    updateData,
    getAllData,
    getDataImages
};

function getData(json) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };

    return fetch('https://europe-west1-catalogo-digital-323809.cloudfunctions.net/get_data', requestOptions)
    .then((response) => {
        return response;
    });
}

function getImages() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch('https://media.coviran.es/api/images', requestOptions)
    .then((response) => {
        return response;
    });
}

function updateData(json) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };

    return fetch('https://europe-west1-catalogo-digital-323809.cloudfunctions.net/update_data', requestOptions)
    .then((response) => {
        return response;
    });
}

function getAllData(json) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };

    return fetch('https://europe-west1-catalogo-digital-323809.cloudfunctions.net/get_all_data', requestOptions)
    .then((response) => {
        return response;
    });
}

function getDataImages(json) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };

    return fetch('https://europe-west1-catalogo-digital-323809.cloudfunctions.net/get_data_images', requestOptions)
    .then((response) => {
        return response;
    });
}