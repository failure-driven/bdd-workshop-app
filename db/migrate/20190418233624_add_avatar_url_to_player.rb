class AddAvatarUrlToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :avatar_url, :string
  end
end
