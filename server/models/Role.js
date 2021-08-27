const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = { Role, RoleSchema };
