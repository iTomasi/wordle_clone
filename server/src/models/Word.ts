import { DataTypes } from "sequelize";
import postgres from "../databases/postgres";

const Word = postgres.define("Word", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    word: {
        type: DataTypes.STRING(45),
        allowNull: false
    },

    trys: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    users: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: []
    }
});

export default Word;