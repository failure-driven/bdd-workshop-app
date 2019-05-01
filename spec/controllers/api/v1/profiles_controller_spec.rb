require 'rails_helper'

RSpec.describe Api::V1::ProfilesController, type: :controller do
  it 'shows a player' do
    player = double(
      Player,
      id: '01234567-0123-4abc-8abc-0123456789ab',
      handle: 'the-handle',
      name: 'the-name',
      email: 'the-email',
      birthday: 'the-birthday',
      avatar_url: 'the-avatar-url',
      percent_complete: 33
    )
    expect(Player).to receive(:find).with('the-id').and_return(player)

    get :show, params: { id: 'the-id' }, format: :json

    expect(response.code).to eq '200'
    expect(
      JSON.parse(response.body)
    ).to eq(
      'id' => '01234567-0123-4abc-8abc-0123456789ab',
      'handle' => 'the-handle',
      'name' => 'the-name',
      'email' => 'the-email',
      'birthday' => 'the-birthday',
      'avatarUrl' => 'the-avatar-url',
      'percentComplete' => 33
    )
  end

  it 'creates a new player' do
    params = ActionController::Parameters.new(
      handle: 'the-handle'
    ).permit(:handle)

    player = double(Player, id: 'the-id')
    expect(Player).to receive(:create!).with(params).and_return(player)

    post :create, params: {
      player: {
        handle: 'the-handle'
      }
    }, format: :plain

    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq(
      'id' => 'the-id'
    )
  end

  it 'updates an existing player' do
    params = ActionController::Parameters.new(
      handle: 'the-handle',
      name: 'the-name',
      email: 'the-email',
      birthday: 'the-birthday',
    ).permit(:handle, :name, :email, :birthday)

    player = double(Player, id: 'the-id', update!: {})
    expect(Player).to receive(:find).with('the-id').and_return(player)
    expect(player).to receive(:update!).with(params).and_return(player)

    put :update, params: {
      id: 'the-id',
      player: {
        id: 'the-id',
        handle: 'the-handle',
        name: 'the-name',
        email: 'the-email',
        birthday: 'the-birthday',
      }
    }, format: :json

    expect(response.code).to eq '204'
  end
end
