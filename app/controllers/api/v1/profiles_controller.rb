module Api
  module V1
    class ProfilesController < ApiController
      def show
        @player = Player.find(params[:id])
      end

      def create
        @player = Player.create!
      end
    end
  end
end
