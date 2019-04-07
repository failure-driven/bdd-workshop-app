module Api
  module V1
    class ProfilesController < ApiController
      def show
        @player = Player.find(params[:id])
      end

      def create
        @player = Player.create!(player_params)
      end

      def update
        @player = Player.find(params[:id])
        @player.update!(player_params)
      end

      def sign_in
        @player = Player.find_by!(handle: params[:handle])
      end

      private

      def player_params
        params.require(:player).permit(:handle, :email)
      end
    end
  end
end
