module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
      @user = User.new(user_params)

      begin
        @user.save!
        render 'api/users/create'
      rescue => e
        puts e.inspect
        render json: {
          success: false,
          reason: e.inspect
        }
      end
    end

    private

      def user_params
        params.require(:user).permit(:email, :password, :username)
      end
  end
end
