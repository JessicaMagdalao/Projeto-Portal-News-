module.exports = function (app) {
    app.get('/todas_noticias', function (req, res) {
        app.app.controllers.todas_noticias.todas_noticias(app,req,res);
    });
    app.get('/noticia', function (req, res) {
        app.app.controllers.todas_noticias.noticia(app,req,res);
    });
}

