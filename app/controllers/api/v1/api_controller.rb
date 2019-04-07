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

      rescue_from ActiveRecord::RecordNotFound do |error|
        detail = error.respond_to?(:model) ? "Couldn't find #{error.model}" : error.message
        render json: { errors: [{ status: '404', detail: detail }] }, status: :not_found
      end
    end
  end
end
