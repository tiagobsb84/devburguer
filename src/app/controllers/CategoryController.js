import * as Yup from 'Yup';
import Product from '../models/Product';
import Category from '../models/Category';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required()
        })

        const { name } = request.body;

        const category = await Category.create({
            name
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch(err) {
            return response.status(400).json({ error: err.errors });
        }

        return response.status(201).json(category);
    } 
    
    async index(request, response) {
        const categories = await Product.findAll();

        return response.json(categories);
    }
}

export default new CategoryController();