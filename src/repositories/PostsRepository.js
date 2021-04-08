const Posts = require('../models/Posts');

module.exports = {

    async findAll(){
        const posts = await Posts.findAll();
        return posts;
    },

    async findByUrl(url){
        const post = await Posts.findOne({where: {url}});
        return post;
    },
    
    async create(data){
        const post = await Posts.create(data);
        return post;
    }
}