class ApplicationController < ActionController::Base
  before_action :pause_execution, unless: -> { Rails.env.production? }
  before_action :forced_api_error, unless: -> { Rails.env.production? }

  def forced_api_error
    raise Rails.application.config.send(:should_crash)[:error] if disrupt_with?(:should_crash)
  end

  def pause_execution
    Kernel.sleep 0.2 while disrupt_with?(:should_pause)
  end

  private

  def disrupt_with?(method)
    should_disrupt_route_config = Rails.application.config.respond_to?(method) && Rails.application.config.send(method)
    return unless should_disrupt_route_config

    request_for_method_url?(method: should_disrupt_route_config[:method], url: should_disrupt_route_config[:url])
  end

  def request_for_method_url?(method:, url:)
    method.downcase.casecmp(request.method).zero? && request.url.include?(url)
  end
end
