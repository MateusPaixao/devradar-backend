const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

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
        
            
        }else{
            
        }        

        return res.json(dev);
    },
    async update(){
        // Atualizar um dev
    },
    async destroy(){
        // Deletar um dev
    }
}