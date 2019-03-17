module ForceApiError
  def self.force(method:, url:, error:)
    Rails.application.config.should_crash = { method: method, url: url, error: error }
  end

  def self.clear
    Rails.application.config.should_crash = nil
  end
end
