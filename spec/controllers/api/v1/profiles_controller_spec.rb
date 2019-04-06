require 'rails_helper'

RSpec.describe Api::V1::ProfilesController, type: :controller do
  it 'shows a player' do
    player = double(Player, id: '01234567-0123-4abc-8abc-0123456789ab')
    expect(Player).to receive(:find).with('the_id').and_return(player)
    # TODO: works if we render json: {id: @player.id}
    pending 'sort out ActionView::Template::Error: wrong number of arguments (given 2, expected 1)'
    get :show, params: { id: :the_id }, format: :json
    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('id' => '01234567-0123-4abc-8abc-0123456789ab')
    expect(JSON.parse(response.body)).to include('id' => match(UUID_REGEX))
  end

  it 'creates a new player' do
    player = double(Player, id: '01234567-0123-4abc-8abc-0123456789ab')
    expect(Player).to receive(:create!).and_return(player)
    # TODO: works if we render json: {id: @player.id}
    pending 'sort out ActionView::Template::Error: wrong number of arguments (given 2, expected 1)'
    post :create, format: :json
    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('id' => '01234567-0123-4abc-8abc-0123456789ab')
    expect(JSON.parse(response.body)).to include('id' => match(UUID_REGEX))
  end

  it 'updates an existing player' do
    params = ActionController::Parameters.new(handle: 'the_handle').permit(:handle)

    player = double(Player, id: 'the_id', update_attributes!: {})
    expect(Player).to receive(:find).with('the_id').and_return(player)
    expect(player).to receive(:update_attributes!).with(params).and_return(player)

    put :update, params: { id: 'the_id', player: { id: 'the_id', handle: 'the_handle' } }, format: :json

    expect(response.code).to eq '204'
  end
end
