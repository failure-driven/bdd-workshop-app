module MultipleTestRuns
  def self.run
    ENV.fetch('TEST_RUNS', 10).to_i.times do |round|
      yield round + 1
    end
  end
end
