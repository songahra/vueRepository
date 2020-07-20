// common.js
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export const common = {
  panelOpen: function (o) {
    var $wrap = $('#wrap')
    var a = -$wrap.scrollTop()
    var target = $('#' + o)
    var $body = $('body')

    $wrap.css('top', a)
    target.data('backdrop') !== false && target.after('<div class="backdrop"></div>')
    if ($body.hasClass('fixed')) {
      $body.removeAttr('class')
      $('.panel').hide()
    }
    $body.addClass('fixed')
    setTimeout(function () {
      target.show(0, function () {
        $body.addClass('panel-open-' + o)
      })
    }, 200)
  },
  panelClose: function (o) {
    var $wrap = $('#wrap')
    var originScroll = -$wrap.position().top
    var $body = $('body')

    $body.removeClass('panel-open-' + o).find('.backdrop').remove()
    setTimeout(function () {
      $('#' + o).hide()
      $body.removeClass('fixed')
      if (originScroll !== 0) {
        $wrap.scrollTop(originScroll)
      }
      $wrap.removeAttr('style')
    }, 200)
  }
}
