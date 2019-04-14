require 'rails_helper'

# a flaky test, not run by default but can be executed using
#   rspec --tag flaky spec/flaky/flaky_number_3_spec.rb
#
# or specify the number of test runs
#
#   TEST_RUNS=3 rspec --tag flaky spec/flaky/flaky_number_3_spec.rb
#
# share your findings online under the #BDDflakyChallenge hash tag
#   https://twitter.com/search?q=%23BDDflakyChallenge

feature 'Flaky Number 3', js: true, flaky: true do
  MultipleTestRuns.run do |round|
    context "Flaky test run number #{round}" do
      scenario 'Michael wants to share a photo with his friend Selena' do
        When 'Michael visits Flaky 3' do
          visit('/flaky/number/3')
        end

        And 'he clicks to share a photo with "Selena"' do
          focus_on(:flaky, :number_3).share('Selena')
        end

        Then 'he see the photos has been shared successfully' do
          wait_for { focus_on(:flaky, :number_3).message }.to eq 'shared with Selena'
        end
      end
    end
  end
end
