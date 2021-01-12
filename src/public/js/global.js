var preferencias = { empresa: '1', usuario:'1', negocio:'R', autentica:'N' };
module.exports = { 
    setEmpresa : function(nuevovalor){ preferencias.empresa = nuevovalor; },
    getEmpresa : function(){ return preferencias.empresa; },
    setUsuario : function(nuevovalor){ preferencias.usuario = nuevovalor; },
    getUsuario : function(){ return preferencias.usuario; },
    setNegocio : function(nuevovalor){ preferencias.negocio = nuevovalor; },
    getNegocio : function(){ return preferencias.negocio; },
    setAutentica : function(nuevovalor){ preferencias.autentica = nuevovalor; },
    getAutentica : function(){ return preferencias.autentica; }
};