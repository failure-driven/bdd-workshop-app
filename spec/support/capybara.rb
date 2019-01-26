  require 'capybara/rspec'
  require 'capybara/rails'
  require 'capybara-screenshot/rspec'

  Capybara.register_driver :selenium_chrome do |app|
    Capybara::Selenium::Driver.new(
        app,
        browser: :chrome,
        desired_capabilities: {
            chromeOptions: {
                args: ['window-size=800,960']
            }
        }
    )
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
