require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  context 'player exists' do
    before do
      @player = Player.create!(
        handle: 'princess',
        email: 'princess@email.com'
      )
    end

    it 'returns 200 OK' do
      get "/api/v1/profiles/#{@player.id}", as: :json
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)).to include(
        'id' => @player.id,
        'email' => 'princess@email.com'
      )
    end

    it 'returns 404 for bad player id' do
      get '/api/v1/profiles/not-valid-player-id', as: :json
      expect(response.status).to eq 404
    end

    describe 'update a player' do
      it 'returns 204 OK and updates the handle' do
        put "/api/v1/profiles/#{@player.id}", params: { player: { handle: 'princess' } }, as: :json
        expect(response.status).to eq 204
        expect(@player.reload.handle).to eq 'princess'
      end
    end
  end

  describe 'create new player' do
    it 'returns 200 OK' do
      expect do
        post '/api/v1/profiles', params: { player: { handle: 'princess' } }, as: :json
      end.to change { Player.count }.by(1)
      expect(JSON.parse(response.body)).to match('id' => match(UUID_REGEX), 'handle' => 'princess')
    end
  end
end
