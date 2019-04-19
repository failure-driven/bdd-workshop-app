require 'rails_helper'

RSpec.describe Player, type: :model do
  describe '#percent_complete' do
    context 'Player with handle' do
      subject(:player) { Player.create!(handle: 'the-handle') }

      it '33 % complete' do
        expect(player.percent_complete).to eq 33
      end

      context 'Player with handle and email' do
        subject(:player) { Player.create!(handle: 'the-handle', email: 'the-email') }

        it '66 % complete' do
          expect(player.percent_complete).to eq 66
        end

        context 'Player with handle and email and avatar url' do
          subject(:player) do
            Player.create!(
              handle: 'the-handle',
              email: 'the-email',
              avatar_url: 'the-avatar-url'
            )
          end

          it '100 % complete' do
            expect(player.percent_complete).to eq 100
          end
        end
      end
    end
  end

  describe '#recommended_avatar_url' do
    context 'no avatar and no email set' do
      subject(:player) { Player.create!(handle: 'the-handle') }

      it 'uses the avatar service default recommendation' do
        expect(Avatar).to receive(:url).and_return('http://the.url/default')
        expect(player.recommended_avatar_url).to eq 'http://the.url/default'
      end
    end

    context 'no avatar but email is set'
    context 'avatar is set'
    context 'based on handle???'
  end
end
