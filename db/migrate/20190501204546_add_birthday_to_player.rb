class AddBirthdayToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :birthday, :date
  end
end
