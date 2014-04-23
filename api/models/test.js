module.exports = function(sequelize, DataTypes) {
    var Test = sequelize.define('Test', {
        name: {
            type: DataTypes.BOOLEAN
        }
    }, {
        classMethods: {
            
        }
    });

    return Test;
};