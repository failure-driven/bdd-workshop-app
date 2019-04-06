class AddEmailToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :email, :string
  end
end
