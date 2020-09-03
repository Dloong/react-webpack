const devConfig = {
    proxyTable: {
        '/api/v1/*': {
            target: 'http://k8s-azurexxxxxx',
            changeOrigin: true,
            pathRewrite: { '^/api/v1': '/api/v1' },
        },
    },
    react_app: {
        lang: 'en',
        env: 'dev'
     }
};
export default devConfig;
