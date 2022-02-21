import { DataTypes } from "sequelize";
import postgres from "../databases/postgres";
import Account from "./Account";

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

    word_lower: {
        type: DataTypes.STRING(45),
        allowNull: false
    },

    trys: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },

    users: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: []
    }
}, {
    scopes: {
        game_by_id: {
            attributes: {
                exclude: ["word_lower", "updatedAt"]
            }
        }
    }
});

Word.belongsTo(Account.scope("private_data"), { as: "user_data", foreignKey: { name: "user_id", allowNull: false } });

export default Word;