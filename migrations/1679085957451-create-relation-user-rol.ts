import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRelationUserRol1679085957451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_role',
        columns: [
          { name: 'userId', type: 'integer', isNullable: false },
          { name: 'roleId', type: 'integer', isNullable: false },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
          },
          {
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
          },
        ],
        indices: [
          {
            columnNames: ['userId'],
          },
          {
            columnNames: ['roleId'],
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey('user_role', ['userId', 'roleId']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_role');
  }
}
