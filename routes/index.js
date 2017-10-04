let express = require('express');
let router = express.Router();
let api = require('./api');
// we use node as API only!!!
// // INDEX PAGE
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

// REST API
router.use('/', api);

// 404 status Handler
router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 500 status handler
router.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = (req.app.get('env') === 'development' && err.status !== 404) ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = router;
