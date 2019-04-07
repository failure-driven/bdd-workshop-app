Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # TODO should we constrain? namespace :api, constraints: { format: 'json' } do
  namespace :api do
    namespace :v1 do
      resources :profiles, only: %i[show create update]
      post 'profiles/sign_in', to: 'profiles#sign_in'
    end
  end

  get '/' => 'landing#index'
  get '/register' => 'landing#index'
  get '/profile' => 'landing#index'
  get '/sign_in' => 'landing#index'
  get '/game' => 'landing#index'
  get '/about' => 'landing#index'

  get '/experimental' => 'landing#experimental'
  get '/experimental/*all' => 'landing#experimental'

  get '/game' => 'game#index'
end
