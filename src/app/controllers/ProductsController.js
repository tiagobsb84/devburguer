import * as Yup from 'Yup';
import Product from '../models/Product';

class ProductsController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required()
        })

        const { filename: path } = request.file;
        const { name, price, category } = request.body;

        const product = await Product.create({
            name,
            price,
            category,
            path
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch(err) {
            return response.status(400).json({ error: err.errors });
        }

        return response.status(201).json(product);
    } 
    
    async index(request, response) {
        const products = await Product.findAll();

        return response.json(products);
    }
}

export default new ProductsController();