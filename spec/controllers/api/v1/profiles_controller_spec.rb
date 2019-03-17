require 'rails_helper'

RSpec.describe Api::V1::ProfilesController, type: :controller do
  it 'responds to index' do
    get :index
    expect(response.code).to eq '200'
    expect(response.body).to eq '{}'
  end
end
