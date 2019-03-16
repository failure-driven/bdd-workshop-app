module PageFragments
  module Message
    def error
      browser.find('.alert.alert-danger').text
    end
  end
end
