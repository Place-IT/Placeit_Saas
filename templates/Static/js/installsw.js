
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/static/sw.js',)
                .then(function(registration) {
                    console.log('Service worker registered:', registration.scope);
                })
                .catch(function(error) {
                    console.log('Service worker registration failed:', error);
                });
        });
    }
};
registerServiceWorker();