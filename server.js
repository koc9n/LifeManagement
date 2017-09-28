let express = require('express');
let helmet = require('helmet');
var session = require('express-session');
let path = require('path');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
let routes = require('./routes/index');
let log = require('./logger');
let env = process.env.NODE_ENV || 'development';
let config = require('./config.json')[env];
let app = express();

var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    log.info("DB Connected.");

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    // session setup
    let expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    app.use(session({
        secret: 's3cUre lIF3',
        name: 'sid',
        cookie: {
            secure: true,
            httpOnly: true,
            expires: expiryDate
        },
        store: new MongoStore({mongooseConnection: db})
    }));

    // security setup
    app.set('trust proxy', 1); // trust first proxy
    app.use(helmet());

    app.use(favicon(path.join(__dirname, 'public', 'BE.svg')));
    app.use(morgan('dev')); // TODO: check constructor params for morgan
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use(lessMiddleware(path.join(__dirname, 'public')));
    app.use('/assets', express.static(path.join(__dirname, 'public')));
    app.use(routes);

    let http = require('http');

    /**
     * Get port from environment and store in Express.
     */
    let port = normalizePort(config.port);
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    let server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);


    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                log.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                log.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        log.debug('Listening on ' + bind);
    }
});

module.exports = app;
