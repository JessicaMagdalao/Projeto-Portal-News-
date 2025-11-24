module.exports.todas_noticias = function (app, req, res) {
    const connection = app.config.dbConnection();
    const noticiaModel = new app.app.models.manchetesDAO(connection);
    noticiaModel.getTodasNoticias(function (error, result) {
        res.render("todas_noticias/todas_noticias", { JNoticias: result, flagAdmin:req.session.autorizado})
    });
}
module.exports.noticia = function (app, req, res) {
    const connection = app.config.dbConnection();
    const noticiaModel = new app.app.models.manchetesDAO(connection);
    const id_noticia = req.query;
    noticiaModel.getNoticia(id_noticia,function (error, result) {
        res.render("noticia/noticia", { JNoticias: result, flagAdmin:req.session.autorizado })
    });
}