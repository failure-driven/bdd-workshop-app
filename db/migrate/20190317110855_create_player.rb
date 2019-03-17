class CreatePlayer < ActiveRecord::Migration[6.0]
  def change
    create_table :players, id: :uuid, &:timestamps
  end
end
