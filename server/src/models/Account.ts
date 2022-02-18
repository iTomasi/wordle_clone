import { DataTypes } from "sequelize";
import postgres from "../databases/postgres";

const Account = postgres.define("Account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },

    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    username_lower: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name_lower: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    scopes: {
        private_data: {
            attributes: {
                exclude: ["username_lower", "name_lower", "password", "email"]
            }
        }
    }
});

export default Account;