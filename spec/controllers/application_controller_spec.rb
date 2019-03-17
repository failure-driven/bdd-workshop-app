require 'rails_helper'
require 'timeout'

class SubclassOfApplicationController < ApplicationController
  def index
    render plain: 'done'
  end
end

RSpec.describe SubclassOfApplicationController, type: :controller do
  before do
    Rails.application.routes.draw do
      get 'index' => 'subclass_of_application#index'
    end
  end

  after do
    Rails.application.reload_routes!
  end

  subject(:get_index_with_timeout) do
    # expire execution to time out in case it is broken
    Timeout.timeout(1) do
      get :index
    end
  end

  it 'passes through if no Rails.applicaton.config.should_pause nor should_crash' do
    get :index
    expect(response.code).to eq '200'
  end

  context 'Rails.application.config.should_pause shoud_crash are not set' do
    before do
      allow(Rails.application.config).to receive(:respond_to?).with(:should_pause).and_return(false)
      allow(Rails.application.config).to receive(:respond_to?).with(:should_crash).and_return(false)
    end

    it 'does not pause' do
      expect(Kernel).not_to receive(:sleep).with(0.2)
      get_index_with_timeout
      expect(response.code).to eq '200'
    end

    it 'does not force error' do
      get :index
      expect(response.code).to eq '200'
    end
  end

  context 'method and url both match Rails.applicatoin.config.should_pause should_crash' do
    let(:valid_method_url) { { method: 'get', url: 'index' } }

    it 'does pause' do
      expect(Rails.application.config).to receive(:send).with(:should_pause).and_return(valid_method_url)
      expect(Rails.application.config).to receive(:respond_to?).with(:should_pause).and_return(true)
      allow(Rails.application.config).to receive(:respond_to?).with(:should_crash).and_return(false)

      # on subsequent calls return false to not sleep forever
      expect(Rails.application.config).to receive(:send).with(:should_pause).and_return(nil)
      expect(Rails.application.config).to receive(:respond_to?).with(:should_pause).and_return(true)

      expect(Kernel).to receive(:sleep).with(0.2)

      get_index_with_timeout
      expect(response.code).to eq '200'
    end

    it 'does force error' do
      allow(Rails.application.config).to receive(:send)
        .with(:should_crash).and_return(valid_method_url.merge(error: 'something went bad'))
      expect(Rails.application.config).to receive(:respond_to?).with(:should_crash).and_return(true)
      allow(Rails.application.config).to receive(:respond_to?).with(:should_pause).and_return(false)

      expect { get :index }.to raise_error(RuntimeError).with_message('something went bad')
    end
  end

  context 'request method does not match Rails.application.confg.should_pause should_crash' do
    before do
      Rails.application.config.should_pause = { method: 'post', url: 'index' }
      Rails.application.config.should_crash = {
        method: 'post',
        url: 'index',
        error: 'something went bad'
      }
    end

    after do
      Rails.application.config.should_pause = nil
      Rails.application.config.should_crash = nil
    end

    it 'does not pause' do
      expect(Kernel).not_to receive(:sleep).with(0.2)
      get_index_with_timeout
      expect(response.code).to eq '200'
    end

    it 'does not force error' do
      get_index_with_timeout
      expect(response.code).to eq '200'
    end
  end

  context 'url does not match Rails.application.confg.should_pause should_crash' do
    before do
      Rails.application.config.should_pause = { method: 'get', url: 'not_index' }
      Rails.application.config.should_crash = {
        method: 'get',
        url: 'not_index',
        error: 'something went bad'
      }
    end

    after do
      Rails.application.config.should_pause = nil
      Rails.application.config.should_crash = nil
    end

    it 'does not pause' do
      expect(Kernel).not_to receive(:sleep).with(0.2)
      get_index_with_timeout
      expect(response.code).to eq '200'
    end

    it 'does not force error' do
      get_index_with_timeout
      expect(response.code).to eq '200'
    end
  end

  context 'running in production, Rails.env.production? is true' do
    before do
      allow(Rails.env).to receive(:production?).and_return(true)
      Rails.application.config.should_pause = { method: 'get', url: 'http://test.host/index' }
      Rails.application.config.should_crash = {
        method: 'get',
        url: 'http://test.host/index',
        error: 'something went bad'
      }
    end

    after do
      Rails.application.config.should_pause = nil
      Rails.application.config.should_crash = nil
    end

    it 'does not pause' do
      expect(Kernel).not_to receive(:sleep).with(0.2)

      get_index_with_timeout
      expect(response.code).to eq '200'
    end

    it 'does not force error' do
      get_index_with_timeout
      expect(response.code).to eq '200'
    end
  end
end
