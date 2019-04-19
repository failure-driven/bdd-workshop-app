class AddNameToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :name, :string
  end
end
