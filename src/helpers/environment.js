var urlBase = `https://api-bemiter.herokuapp.com`;

//urlBase = `http://192.168.0.103:3000`;

module.exports = {
    versionLabel: 'alpha v1.0',
    alphaMode: true,
    production: true,   
    apiUrl: `${urlBase}/api`,
    url: `${urlBase}`   
}