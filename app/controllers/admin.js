module.exports.form_add_noticia = function (app, req, res) {
    if(req.session.autorizado){
        res.render("admin/form_add_noticia", { validacao: {}, noticia: {},flagAdmin:req.session.autorizado});
    }else{
        let erro = [];
        erro.push({msg:"Usuário precisa de fazer login"});
        res.render("admin/form_login",{validacao:erro,flagAdmin:req.session.autorizado });
    }
}
module.exports.noticia_salvar = function (app, req, res) {
    const noticia = req.body;
    if(req.file != undefined){
        noticia.img = req.file.filename;
    }
    req.assert('titulo', 'O título é obrigatório').notEmpty();
    req.assert('resumo', 'O Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'O Resumo deve de contar entre 10 a 100 caracteres').len(10, 100);
    req.assert('autor', 'O Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'A Data é obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });
    req.assert('texto', 'A notícia é obrigatório').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        res.render("admin/form_add_noticia", { validacao: erros, noticia: noticia,flagAdmin:req.session.autorizado })
        return;
    }
    const connection = app.config.dbConnection();
    const salvarNoticiaModel = new app.app.models.manchetesDAO(connection);
    salvarNoticiaModel.salvarNoticia(noticia, function (error, result) {
        res.redirect("/todas_noticias")
    });
}
module.exports.form_login = function (app,req,res) {
    res.render("admin/form_login",{validacao:{},flagAdmin:req.session.autorizado});
}
module.exports.login_autenticar = function (app, req, res) {
    const camposDeUsuario = req.body;
    req.assert('usuario', 'O usuário é obrigatório').notEmpty();
    req.assert('senha', 'A senha é obrigatória').notEmpty();    
    const erros = req.validationErrors();
    if (erros) {
        res.render("admin/form_login",{validacao:erros,flagAdmin:req.session.autorizado})
        return;
    }
    const connection = app.config.dbConnection();
    const autenticacao = new app.app.models.manchetesDAO(connection);
    autenticacao.getLogin(camposDeUsuario, function (error,result) {
        if(result.length == 0){
            let erro = [];
            erro.push({msg:"Usuário ou senha incorretos!"});
            res.render("admin/form_login",{validacao:erro,flagAdmin:req.session.autorizado })
            return;
        }
        req.session.autorizado = true;
        res.redirect("/");
    })
}
module.exports.sair = function (app,req,res) {
    req.session.destroy(function(error){
        res.redirect("/");
    });
}
module.exports.delete_noticia = function(app,req,res){
    const connection = app.config.dbConnection();    
    const noticiaModel = new app.app.models.manchetesDAO(connection);
    const id_noticia = req.query;
    noticiaModel.apagaNoticia(id_noticia,function(error,result){
      res.redirect("/todas_noticias");
    });
}
module.exports.update_noticia = function(app,req,res){
    const connection = app.config.dbConnection();    
    const noticiaModel = new app.app.models.manchetesDAO(connection);
    const id_noticia = req.query;
    noticiaModel.getNoticiaUpdate(id_noticia,function(error,result){        
       res.render("admin/form_update_noticia",{validacao:{},noticia : result, flagAdmin : req.session.autorizado});
    });
}
module.exports.noticias_atualizar = function(app,req,res){
    const noticia = req.body;
    if(req.file != undefined){
        noticia.img = req.file.filename;
    }    
    req.assert('titulo','Título é obrigatório').notEmpty();
    req.assert('resumo','Resumo é obrigatório').notEmpty();
    req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor','Autor é obrigatório').notEmpty();
    req.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('texto','A notícia é obrigatória').notEmpty();
    const erros = req.validationErrors();
    if(erros){
        res.render("admin/form_add_noticia",{validacao : erros, noticia: noticia, flagAdmin : req.session.autorizado});
        return;
    }
    const connection = app.config.dbConnection();    
    const salvarNoticiaModel = new app.app.models.manchetesDAO(connection);
    salvarNoticiaModel.atualizarNoticia(noticia, function(error,result){
        res.redirect('/todas_noticias');
    });
}