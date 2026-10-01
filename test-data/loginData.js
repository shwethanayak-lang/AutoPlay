const loginData = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
//For locked user
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },

    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce'
    },

    performanceUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    },

    invalidUser: {
        username: 'invalid_user',
        password: 'secret_sauce'
    },

    invalidPassword: {
        username: 'standard_user',
        password: 'wrong_password'
    },

    invalidBoth: {
        username: 'invalid_user',
        password: 'wrong_password'
    }
};

module.exports = loginData;