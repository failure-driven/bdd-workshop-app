require 'rails_helper'

RSpec.describe Player, type: :model do
  describe '#percent_complete' do
    it 'is 25% complete WHEN player has a handle' do
      player = Player.create!(
        handle: 'the-handle'
      )
      expect(player.percent_complete).to eq 25
    end

    it 'is 50% complete WHEN player has a handle and name' do
      player = Player.create!(
        handle: 'the-handle',
        name: 'the-name'
      )
      expect(player.percent_complete).to eq 50
    end

    it 'is 75% complete WHEN player has a handle, name and email' do
      player = Player.create!(
        handle: 'the-handle',
        name: 'the-name',
        email: 'the-email'
      )
      expect(player.percent_complete).to eq 75
    end

    it 'is 100 % complete WHEN player has a handle, name, email and avatar_url' do
      player = Player.create!(
        handle: 'the-handle',
        name: 'the-name',
        email: 'the-email',
        avatar_url: 'the-avatar-url'
      )
      expect(player.percent_complete).to eq 100
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
