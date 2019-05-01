require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  context 'player exists' do
    before do
      @player = create(:player,
                       handle: 'LOGO',
                       name: 'Cynthia Solomon',
                       email: 'cynthia@logo.com',
                       birthday: '2019-05-01',
                       avatar_url: '/sample_avatars/logo_terrapin.png')
    end

    it 'returns 200 OK' do
      get "/api/v1/profiles/#{@player.id}", as: :json
      expect(response.status).to eq 200
      response_body = JSON.parse(response.body)
      expect(response_body['handle']).to eq('LOGO')
      expect(response_body['name']).to eq('Cynthia Solomon')
      expect(response_body['email']).to eq('cynthia@logo.com')
      expect(response_body['birthday']).to eq('2019-05-01')
      expect(response_body['avatarUrl']).to eq('/sample_avatars/logo_terrapin.png')
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
            handle: 'ARC',
            name: 'Kathleen Booth',
            email: 'kathleen.booth@automatic.relay.calculator.com',
            birthday: '2019-05-02',
            avatarUrl: '/sample_avatars/kathleen_booth.jpg'
          }
        }, as: :json
        expect(response.status).to eq 204
        expect(@player.reload.handle).to eq 'ARC'
        expect(@player.reload.name).to eq 'Kathleen Booth'
        expect(@player.reload.email).to eq 'kathleen.booth@automatic.relay.calculator.com'
        expect(@player.reload.birthday).to eq Date.iso8601('2019-05-02')
        expect(@player.reload.avatar_url).to eq '/sample_avatars/kathleen_booth.jpg'
      end
    end
  end

  describe 'create new player' do
    it 'returns 200 OK' do
      expect do
        post '/api/v1/profiles', params: {
          player: {
            handle: 'LOGO'
          }
        }, as: :json
      end.to change { Player.count }.by(1)

      response_body = JSON.parse(response.body)
      expect(response_body['id']).to match(UUID_REGEX)
    end
  end
end
