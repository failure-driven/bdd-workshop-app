module PageFragments
  module Messages
    def error
      browser.find('.alert.alert-danger').text
    end

    def warn
      browser.find('.alert.alert-warning').text
    end

    def info
      browser.find('.alert.alert-info').text
    end
  end
end
