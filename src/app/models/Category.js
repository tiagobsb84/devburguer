import { Model, Sequelize } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize
            }
        );
    }
}

export default Category;