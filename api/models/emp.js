module.exports = function(sequelize, DataTypes) {
    var EMP = sequelize.define('EMP', {
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        pulse: {
            type: DataTypes.BOOLEAN
        }
        
    }, {
        classMethods: {
            
        }
    });

    return EMP;
};