require 'rails_helper'

RSpec.describe Api::V1::ProfilesController, type: :controller do
  it 'shows a player' do
    player = double(
      Player,
      id: '01234567-0123-4abc-8abc-0123456789ab',
      handle: 'the-handle',
      email: ''
    )
    expect(Player).to receive(:find).with('the_id').and_return(player)

    get :show, params: { id: :the_id }, format: :json

    expect(response.code).to eq '200'
    expect(
      JSON.parse(response.body)
    ).to eq(
      'id' => '01234567-0123-4abc-8abc-0123456789ab',
      'handle' => 'the-handle',
      'email' => ''
    )
  end

  it 'creates a new player' do
    params = ActionController::Parameters.new(handle: 'the-handle').permit(:handle)

    player = double(Player, id: 'the-id', handle: 'the-handle')
    expect(Player).to receive(:create!).with(params).and_return(player)

    post :create, params: { player: { handle: 'the-handle' } }, format: :plain

    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('id' => 'the-id', 'handle' => 'the-handle')
  end

  it 'updates an existing player' do
    params = ActionController::Parameters.new(handle: 'the_handle').permit(:handle)

    player = double(Player, id: 'the_id', update!: {})
    expect(Player).to receive(:find).with('the_id').and_return(player)
    expect(player).to receive(:update!).with(params).and_return(player)

    put :update, params: { id: 'the_id', player: { id: 'the_id', handle: 'the_handle' } }, format: :json

    expect(response.code).to eq '204'
  end
end
