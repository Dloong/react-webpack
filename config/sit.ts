const devConfig = {
    proxyTable: {
        '/api/v1': {
            target: 'http://k8s-azure.silot.tech:30310',
        },
        pathRewrite: {
            '^/api/v1': '/api/v1',
        },
    },
    lang: 'en',
};
export default devConfig;
