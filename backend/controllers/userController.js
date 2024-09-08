const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// Load all users
exports.allUsers = async (req, res, next) => {
    console.log('Received request to load all users');
    
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    console.log(`Page size: ${pageSize}, Page number: ${page}`);

    try {
        const count = await User.find({}).estimatedDocumentCount();
        console.log(`Total users count: ${count}`);

        const users = await User.find()
            .sort({ createdAt: -1 })
            .select('password')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        console.log(`Fetched users: ${users.length}`);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        console.error('Error loading users:', error);
        return next(error);
    }
}

// Show single user
exports.singleUser = async (req, res, next) => {
    console.log(`Received request to fetch user with ID: ${req.params.id}`);

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.warn(`User with ID ${req.params.id} not found`);
            return next(new ErrorResponse('User not found', 404));
        }

        console.log(`Fetched user: ${user}`);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return next(error);
    }
}

// Edit user
exports.editUser = async (req, res, next) => {
    console.log(`Received request to edit user with ID: ${req.params.id}`);

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            console.warn(`User with ID ${req.params.id} not found for update`);
            return next(new ErrorResponse('User not found', 404));
        }

        console.log(`Updated user: ${user}`);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return next(error);
    }
}

// Delete user
exports.deleteUser = async (req, res, next) => {
    console.log(`Received request to delete user with ID: ${req.params.id}`);

    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            console.warn(`User with ID ${req.params.id} not found for deletion`);
            return next(new ErrorResponse('User not found', 404));
        }

        console.log(`Deleted user: ${user}`);
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return next(error);
    }
}

// Create user job history
exports.createUserJobHistory = async (req, res, next) => {
    console.log('Received request to create job history for user');

    const { title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            console.warn('User not logged in');
            return next(new ErrorResponse("You must log in", 401));
        }

        const addJobHistory = {
            title,
            description,
            salary,
            location,
            user: req.user._id
        };

        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();

        console.log('Job history added:', addJobHistory);
        res.status(200).json({
            success: true,
            currentUser
        });
    } catch (error) {
        console.error('Error creating job history:', error);
        return next(error);
    }
}
