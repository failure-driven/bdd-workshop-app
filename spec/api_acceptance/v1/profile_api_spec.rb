require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  context 'player exists' do
    before do
      @player = Player.create!(
        handle: 'princess',
        email: 'princess@email.com',
        avatar_url: 'http://avatar.com/princess'
      )
    end

    it 'returns 200 OK' do
      get "/api/v1/profiles/#{@player.id}", as: :json
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)).to include(
        'id' => @player.id,
        'handle' => 'princess',
        'email' => 'princess@email.com',
        'avatarUrl' => 'http://avatar.com/princess',
        'percentComplete' => 100
      )
    end

    it 'returns 404 for bad player id' do
      get '/api/v1/profiles/not-valid-player-id', as: :json
      expect(response.status).to eq 404
    end

    describe 'update a player' do
      it 'returns 204 OK and updates the handle' do
        put "/api/v1/profiles/#{@player.id}", params: {
          player: {
            handle: 'princess',
            email: 'princess@email.com',
            avatarUrl: 'http://avatar.com/princess'
          }
        }, as: :json
        expect(response.status).to eq 204
        expect(@player.reload.handle).to eq 'princess'
        expect(@player.reload.email).to eq 'princess@email.com'
        expect(@player.reload.avatar_url).to eq 'http://avatar.com/princess'
      end
    end
  end

  describe 'create new player' do
    it 'returns 200 OK' do
      expect do
        post '/api/v1/profiles', params: {
          player: {
            handle: 'princess',
            email: 'princess@email.com',
            avatarUrl: 'http://avatar.com/princess'
          }
        }, as: :json
      end.to change { Player.count }.by(1)
      expect(JSON.parse(response.body)).to match(
        'id' => match(UUID_REGEX),
        'handle' => 'princess',
        'email' => 'princess@email.com',
        'avatarUrl' => 'http://avatar.com/princess',
        'percentComplete' => 100
      )
    end
  end
end
