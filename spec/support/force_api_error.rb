module ForceApiError
  def force_api_error(method:, url:, error:)
    Rails.application.config.should_crash = { method: method, url: url, error: error }
  end

  def clear_api_error
    Rails.application.config.should_crash = nil
  end
end
