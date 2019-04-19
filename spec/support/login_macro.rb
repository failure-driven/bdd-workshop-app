module LoginMacro
  def create_and_login_as(options)
    @profile = create(:player, options)
    page.visit('/')
    player = { id: @profile.id, handle: @profile.handle }
    page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
  end
end
