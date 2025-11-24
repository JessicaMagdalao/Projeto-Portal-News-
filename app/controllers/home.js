module.exports.index = function (app, req, res) {
    const connection = app.config.dbConnection();
        const noticiaModel = new app.app.models.manchetesDAO(connection);
        noticiaModel.getHome(function (error, result) {
            res.render("home/index", { JNoticias: result, flagAdmin:req.session.autorizado})
        });
}
