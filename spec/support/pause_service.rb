module PauseService
  def with_api_route_paused(method:, url:)
    Rails.application.config.should_pause = { method: method, url: url }
    yield
  ensure
    Rails.application.config.should_pause = nil
  end
end
