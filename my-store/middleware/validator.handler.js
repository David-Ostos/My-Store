const boom  = require('@hapi/boom');


function validatorHandler( schema, property ){         // con esta funcion hay creamos un middleware dinamico, para poder saber si es de tipo post "body" get "params o querys"

  return ( req, res, next ) => {                    // se devuelve un middleware

    const data = req[property];                   // para validar la data y saber de que tipo es
    const { error } = schema.validate(data,
      { abortEarly: false});                    // para valuidar el tipo de error , con abortEarly se especifica que mande todos los errores en ves del primero

    if(error){                                // si es un error, envia el boom para tratarlo en us middleware correspondiente
      next(boom.badRequest(error));

    }else{                                   // si no continua tranquilamente
      next();

    }
  };
}

module.exports = validatorHandler;
