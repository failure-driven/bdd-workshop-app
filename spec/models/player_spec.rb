require 'rails_helper'

RSpec.describe Player, type: :model do
  describe '#percent_complete' do
    context 'Player with handle' do
      subject(:player) { Player.create!(handle: 'the-handle') }

      it '50 % complete' do
        expect(player.percent_complete).to eq 50
      end

      context 'Player with handle and email' do
        subject(:player) { Player.create!(handle: 'the-handle', email: 'the-email') }

        it '100 % complete' do
          expect(player.percent_complete).to eq 100
        end
      end
    end
  end
end
