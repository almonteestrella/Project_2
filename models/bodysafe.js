module.exports = function(sequelize, DataTypes){
    var Review = sequelize.define("review", {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        estStatusDesc: DataTypes.STRING,
        enfrID: DataTypes.INTEGER,
        inspID: DataTypes.INTEGER,
        infrTypeCD: DataTypes.INTEGER,
        postal: DataTypes.STRING,
        rowNo: DataTypes.INTEGER,
        addr: DataTypes.STRING,
        estName: DataTypes.STRING,
        infrAction: DataTypes.STRING,
        lon: {
            type: DataTypes.DECIMAL(11,8),
            allowNull: false
        },
        servID: DataTypes.INTEGER,
        enfrOurcame: DataTypes.STRING,
        unit: DataTypes.STRING,
        infrTypeDesc: DataTypes.STRING,
        enfrAmountFined: DataTypes.INTEGER,
        inspStatusDesc: DataTypes.STRING,
        enfrOutcomeDate: DataTypes.DATE,
        lat: {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false
        },
        servTypeCD: DataTypes.INTEGER,
        inspDate: DataTypes.DATE,
        infrID: DataTypes.INTEGER,
        addrID: DataTypes.INTEGER,
        estID: DataTypes.INTEGER,
        servTypeDesc: DataTypes.STRING,
    })
    return Review;
}




