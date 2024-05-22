"""empty message

Revision ID: 208a0f5b30f1
Revises: 49509a13c903
Create Date: 2024-05-18 13:27:46.949654

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '208a0f5b30f1'
down_revision = '49509a13c903'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('manager_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('teacher_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course', schema=None) as batch_op:
        batch_op.alter_column('teacher_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('manager_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###