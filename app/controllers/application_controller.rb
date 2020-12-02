# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :block_unlisted_ip_addresses

private

  def block_unlisted_ip_addresses
    # This temporary IP blocking can be removed
    # after authentication is added

    if (ENV["RESTRICT_IP_ADDRESSES"] == "yes") &&
      allowed_ip_addresses.exclude?(request.remote_ip)

      head :forbidden
    end
  end

  def allowed_ip_addresses
    ENV.fetch("ALLOWED_IP_ADDRESSES", "").split(",")
  end
end
