class AddHandleToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :handle, :string, null: false
    add_index :players, [:handle], unique: true
  end
end
