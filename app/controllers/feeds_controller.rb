class FeedsController < ApplicationController
  def show_all
    load_myself()

    @tweets = Tweet.all.order(created_at: :desc)

    # feeds/index uses @myself and @tweets
    render 'feeds/index'
  end

  def by_user
    load_myself()

    @username = params[:username]
    user = User.find_by(username: @username)

    if user
      @tweets = user.tweets
      # feeds/index uses @myself and @tweets
      render 'feeds/index'
    else
      # this error page uses @username
      render 'static_pages/user_unknown'
    end
  end

  private
  def load_myself
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)
    @myself = session ? session.user.username : '???'
  end
end
