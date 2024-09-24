import bcrypt from 'bcryptjs';
import Trainee from '../model/TraineeIntern.js';

export const authenticate = async (identifier, password) => {
    const trainee = await Trainee.findOne({
        $or: [{ phoneNumber: identifier }, { emailAddress: identifier }]
    });

    if (!trainee) return null;

    const isMatch = await bcrypt.compare(password, trainee.password);
    return isMatch ? trainee : null;
};
