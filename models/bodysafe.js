module.exports = function(sequelize, DataTypes){
    var Review = sequelize.define("review", {
        est_status_cd: DataTypes.STRING,
        enfr_id: DataTypes.INTEGER,
        insp_id: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        postal: DataTypes.STRING,
        row_no: DataTypes.INTEGER,
        addr: DataTypes.STRING,
        est_name: DataTypes.STRING,
        infr_action: DataTypes.STRING,
        lon: DataTypes.DECIMAL(11,8),
        serv_id: DataTypes.INTEGER,
        enfr_outcome: DataTypes.STRING,
        infr_type_cd: DataTypes.INTEGER,
        infr_type_desc: DataTypes.STRING,
        enfr_amount_fined: DataTypes.INTEGER,
        insp_status_desc: DataTypes.STRING,
        enfr_outcome_date: DataTypes.DATE,
        lat: DataTypes.DECIMAL(10,8),
        serv_type_cd: DataTypes.INTEGER,
        insp_date: DataTypes.DATE,
        serv_type_desc: DataTypes.STRING,
        infr_id: DataTypes.INTEGER,
        addr_id: DataTypes.STRING,
        est_id: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        est_status_desc: DataTypes.STRING,
        
    })
    return Review;
}