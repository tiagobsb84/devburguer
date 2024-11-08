import * as Yup from 'Yup';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        });

        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorred = () => {
            response
                .status(401)
                .json({error: 'Make sure your email or password are correct'});
        }

        if(!isValid) {
            return emailOrPasswordIncorred();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if(!user) {
            return emailOrPasswordIncorred();
        }

        const isSamePassword = await user.comparePassword(password);

        if(!isSamePassword) {
            return emailOrPasswordIncorred();
        }

        //Retorna os dados do usuario
        return response.status(201).json({ 
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin
         });
    }
}

export default new SessionController();