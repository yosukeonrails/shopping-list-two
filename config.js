exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://yosuke:bluesky@ds053380.mlab.com:53380/shopping-list':

                            'mongodb://localhost/shopping-list-dev');

exports.PORT = process.env.PORT || 8080;
