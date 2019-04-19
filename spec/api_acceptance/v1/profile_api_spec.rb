require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  context 'player exists' do
    before do
      @player = Player.create!(
        handle: 'LOGO',
        name: 'Cynthia Solomon',
        email: 'cynthia@logo.com',
        avatar_url: 'http://avatar.com/logo'
      )
    end

    it 'returns 200 OK' do
      get "/api/v1/profiles/#{@player.id}", as: :json
      expect(response.status).to eq 200
      response_body = JSON.parse(response.body)
      expect(response_body['handle']).to eq('LOGO')
      expect(response_body['name']).to eq('Cynthia Solomon')
      expect(response_body['email']).to eq('cynthia@logo.com')
      expect(response_body['avatarUrl']).to eq('http://avatar.com/logo')
      expect(response_body['percentComplete']).to eq(100)
    end

    it 'returns 404 for bad player id' do
      get '/api/v1/profiles/not-valid-player-id', as: :json
      expect(response.status).to eq 404
    end

    describe 'update a player' do
      it 'returns 204 OK and updates the handle' do
        put "/api/v1/profiles/#{@player.id}", params: {
          player: {
            handle: 'LOGO',
            name: 'Cynthia Solomon',
            email: 'cynthia@logo.com',
            avatarUrl: 'http://avatar.com/logo'
          }
        }, as: :json
        expect(response.status).to eq 204
        expect(@player.reload.handle).to eq 'LOGO'
        expect(@player.reload.name).to eq 'Cynthia Solomon'
        expect(@player.reload.email).to eq 'cynthia@logo.com'
        expect(@player.reload.avatar_url).to eq 'http://avatar.com/logo'
      end
    end
  end

  describe 'create new player' do
    it 'returns 200 OK' do
      expect do
        post '/api/v1/profiles', params: {
          player: {
            handle: 'LOGO',
            email: 'cynthia@logo.com',
            avatarUrl: 'http://avatar.com/logo'
          }
        }, as: :json
      end.to change { Player.count }.by(1)

      response_body = JSON.parse(response.body)
      expect(response_body['handle']).to eq('LOGO')
      expect(response_body['email']).to eq('cynthia@logo.com')
      expect(response_body['avatarUrl']).to eq('http://avatar.com/logo')
      expect(response_body['percentComplete']).to eq(100)
    end
  end
end
