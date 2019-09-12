module.exports = function(sequelize, DataTypes){
    var Review = sequelize.define("review", {
        inspectid: DataTypes.INTEGER,
        status: DataTypes.STRING,
        postal: DataTypes.STRING,
        addr: DataTypes.STRING,
        name: DataTypes.STRING,
        infrAction: DataTypes.STRING,
        estID: DataTypes.INTEGER,
        inspectionDate: DataTypes.DATE,
        ifrID: DataTypes.INTEGER
    })
    return Review;
}