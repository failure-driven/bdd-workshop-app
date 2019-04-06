module Api
  module V1
    class ProfilesController < ApiController
      def show
        @player = Player.find(params[:id])
      end

      def create
        @player = Player.create!
      end

      def update
        @player = Player.find(params[:id])
        @player.update_attributes!(params.require(:player).permit(:handle))
      end
    end
  end
end
