import { DataTypes, Deferrable } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class Todos extends TableBuilder {
  public static order = 0;

  constructor(database) {
    super(database);
    this.name = 'todos';
  }

  public override build = async function () {
    const Todo = await this.db.define(
      this.name,
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        // Model attributes are defined here
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        completed_at: {
          type: DataTypes.DATE,
        },
        due_date: {
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
      },
    );

    return Todo;
  };
}
