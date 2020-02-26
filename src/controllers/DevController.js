const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// index (find all), show (finde one), store (create), update, destroy

module.exports = {
    async index(req, res){
        const devs = await Dev.find()

        res.json(devs)
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const { name = login, avatar_url, bio } = response.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtrar conexões que estão no máximo há 10km de distância
            // e que o novo Dev tenha pelo menos uma das tecnlogias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        
            
        }else{
            // Dev já existe
        }        

        return res.json(dev);
    },
    async update(){
        // Atualizar um Dev
    },
    async destroy(){
        // Deletar um Dev
    }
}