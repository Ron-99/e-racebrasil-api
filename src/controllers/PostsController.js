const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/PostsRepository');

module.exports = {

    async index (req, res){

    },

    async getByUrl (req, res){

    },

    async store (req, res){
        try{
            const { title, description, text, author } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(title, 'É necessário informar o titulo da notícia');
            contract.isRequired(description, 'É necessário informar a descrição da notícia');
            contract.isRequired(text, 'É necessário redigir a matéria');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            let url = convertTitleToUrl(title);
            const post = await repository.create({title, author, description, text, url, read_time: 5});

            res.status(201).send({
                message: 'Notícia publicada com sucesso',
                data: post
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}


function convertTitleToUrl(title){
    title = title.toLowerCase();
    let url = "";
    for(let i = 0; i < title.length; i++){
        switch (title.charAt(i)) {
            case '\\':
                url += '';
                break;
            case '{':
                url += '';
                break;
            case '}':
                url += '';
                break;
            case '[':
                url += '';
                break;
            case ']':
                url += '';
                break;
            case '_':
                url += '';
                break;
            case '/':
                url += '';
                break;
            case '|':
                url += '';
                break;
            case '.':
                url += '';
                break;
            case ',':
                url += '';
                break;
            case ';':
                url += '';
                break;
            case ':':
                url += '';
                break;
            case '"':
                url += '';
                break;
            case `'`:
                url += '';
                break;
            case '`':
                url += '';
                break;
            case '“':
                url += '';
                break;
            case '(':
                url += '';
                break;
            case ')':
                url += '';
                break;
            case '=':
                url += '';
                break;
            case '+':
                url += '';
                break;
            case '*':
                url += '';
                break;
            case '&':
                url += '';
                break;
            case '”':
                url += '';
                break;
            case ' ':
                url += '-';
                break;
            default:
                url += title.charAt(i);
                break;
        }
    }

    return url
        .replace(new RegExp('[ÁÀÂÃ]','gi'), 'a')
        .replace(new RegExp('[ÉÈÊ]','gi'), 'e')
        .replace(new RegExp('[ÍÌÎ]','gi'), 'i')
        .replace(new RegExp('[ÓÒÔÕ]','gi'), 'o')
        .replace(new RegExp('[ÚÙÛ]','gi'), 'u')
        .replace(new RegExp('[Ç]','gi'), 'c')
    
}