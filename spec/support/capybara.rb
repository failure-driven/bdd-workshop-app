require 'capybara/rspec'
require 'capybara/rails'
require 'capybara-screenshot/rspec'

# Make browser slow down execution to see what's going on
# in the browser (when running non-Headless)
module SlomoBridge
  TIMEOUT = ENV.fetch("SLOMO_MS", "0").to_i / 1000.0

  def execute(*)
    sleep TIMEOUT if TIMEOUT > 0
    super
  end
end

# Don't wait too long in `have_xyz` matchers
Capybara.default_max_wait_time = 2 # the default is 2

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: {
      chromeOptions: {
        args: ['window-size=800,960']
      }
    }
  ).tap do |driver|
    # Enable slomo mode
    driver.browser.send(:bridge).singleton_class.prepend(SlomoBridge)
  end
end

Capybara.javascript_driver = :selenium_chrome

Capybara::Screenshot.webkit_options = {
  width: 1024,
  height: 768
}

Capybara::Screenshot.autosave_on_failure = false
Capybara::Screenshot.prune_strategy = :keep_last_run

RSpec.configure do |config|
  config.after do |example|
    if (example.metadata[:type] == :feature) && example.metadata[:js] && example.exception.present?
      Capybara::Screenshot.screenshot_and_open_image
    end
  end
end
