module PageFragments
  module Alert
    def message
      browser.find('.alert.alert-success').text
    end
  end
end
