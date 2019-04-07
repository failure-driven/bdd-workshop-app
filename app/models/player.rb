class Player < ApplicationRecord
  validates :handle, presence: true, uniqueness: true
end
