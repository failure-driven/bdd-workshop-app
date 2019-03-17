module Api
  module V1
    class ProfilesController < ApplicationController
      def index
        render json: { id: SecureRandom.uuid }
      end
    end
  end
end
