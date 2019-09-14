module.exports = function(sequelize, DataTypes) {
    var DineSafeReview = sequelize.define("dinesafereview", {
        rowdata_row_row_id: DataTypes.INTEGER,
        rowdata_row_establishment_id: DataTypes.INTEGER,
        rowdata_row_inspection_id: {
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        rowdata_row_establishment_name: DataTypes.STRING,
        rowdata_row_establishmenttype: DataTypes.STRING,
        rowdata_row_establishment_address: DataTypes.STRING,
        rowdata_row_latitude: DataTypes.DECIMAL(10,8),
        rowdata_row_longitude: DataTypes.DECIMAL(11,8),
        rowdata_row_establishment_status: DataTypes.STRING,
        rowdata_row_establishment_status: DataTypes.INTEGER,
        rowdata_row_infraction_details: DataTypes.STRING,
        rowdata_row_inspection_date: DataTypes.DATE,
        rowdata_row_severity: DataTypes.STRING,
        rowdata_row_action: DataTypes.STRING,
        rowdata_row_court_outcome: DataTypes.STRING,
        rowdata_row_amount_fined: DataTypes.INTEGER
    });
        return DineSafeReview;
};;











