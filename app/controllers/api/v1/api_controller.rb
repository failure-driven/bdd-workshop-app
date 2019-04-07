module Api
  module V1
    class ApiController < ::ApplicationController
      protect_from_forgery with: :null_session

      rescue_from ActiveRecord::RecordNotUnique do |error|
        render json: { errors: { base: [error.message] } }, status: :conflict
      end

      rescue_from ActiveRecord::RecordInvalid do |error|
        render json: { errors: error.record.errors }, status: :unprocessable_entity
      end
    end
  end
end
