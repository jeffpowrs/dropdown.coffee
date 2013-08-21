# ==========================================================================
#  Drop Down 
#  Author: @jeff Powers
#  Date: 2013.04
#  License: MIT/GPLv2
# ==========================================================================

class UI.Dropdown
  opts: 
    parentSelector: ".left-rail"       #Where to add the Class
    classToAdd: "show-nav"    #The class to add
    menuSelector: ".main-nav"
    handleClickOutside: true

  isShowing = false
  $html = $("html")
  
  constructor: ( elSelector, options ) ->
    @$el = $(elSelector)
    @opts = $.extend true, {}, @opts, options
    @$el.on "click.dropdown", (evt) => @toggle evt
    return @

  show: (evt) ->
    if evt
      evt.stopPropagation()
      evt.preventDefault()

    $(@opts.parentSelector).addClass @opts.classToAdd
    @isShowing = true
    @bindClose() if @handleClickOutside

  hide: (evt) ->
    evt.preventDefault() if evt
    $(@opts.parentSelector).removeClass @opts.classToAdd
    @isShowing = false
    return @

  bindClose: ->
    $("html").on "click.dropdown", (evt) =>
      $targ = $(event.target or window.event.srcElement)
      targetIsNotDropdown = not $targ.is(@opts.menuSelector)
      targetsNotAChildOfDropdown = $(@opts.menuSelector).has($targ).length is 0
      if targetIsNotDropdown and targetsNotAChildOfDropdown
        $("html").off ".dropdown"
        @hide()
    return @

  toggle: (evt) ->
    evt.preventDefault() if evt
    unless @isShowing
      @show evt
    else
      @hide evt