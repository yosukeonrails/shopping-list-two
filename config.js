exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://GreenRails:hebrews111@ds019882.mlab.com:19882/shoppin-list':
                            
                            'mongodb://localhost/shopping-list-dev');

exports.PORT = process.env.PORT || 8080;
