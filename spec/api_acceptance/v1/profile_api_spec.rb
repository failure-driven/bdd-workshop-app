require 'rails_helper'

RSpec.describe '/api/v1/profiles', type: :request do
  describe 'GET profile' do
    it 'returns 200 OK' do
      get '/api/v1/profiles', as: :json
      expect(response.status).to eq 200
    end

    it 'returns json' do
      get '/api/v1/profiles', as: :json
      expect(JSON.parse(response.body)).to include('id' => match(UUID_REGEX))
    end
  end
end
