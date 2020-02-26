const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res){
        // Buscar todos os devs em um raio de 10km
        // Filtrar por tecnologias

        const { latitude, longitude, techs } = req.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000, // em metros 10 mil metros é igual a 10km
                }
            }
        })

        return res.json({ devs })

    }
}