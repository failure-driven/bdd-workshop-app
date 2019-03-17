require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  context 'player exists' do
    before do
      @player = Player.create!
    end

    it 'returns 200 OK' do
      get "/api/v1/profiles/#{@player.id}", as: :json
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)).to include('id' => @player.id)
    end

    it 'returns 404 for bad player id' do
      get '/api/v1/profiles/not-valid-player-id', as: :json
      expect(response.status).to eq 404
    end
  end

  describe 'create new player' do
    it 'returns 200 OK' do
      expect do
        post '/api/v1/profiles', as: :json
      end.to change { Player.count }.by(1)
      expect(JSON.parse(response.body)).to include('id' => match(UUID_REGEX))
    end
  end
end
