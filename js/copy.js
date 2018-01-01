$(function () {
  // Add copy icon
  var $copyIcon = $('<i class="fas fa-copy" aria-hidden="true" data-clipboard-target="#codes"></i>')
  var $notice = $('<div class="copy-notice"></div>')
  $('figure.highlight').prepend($copyIcon)
  $('figure.highlight').prepend($notice)
  // copy function
  function copy(text, ctx) {
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      try {
        document.execCommand('copy') // Security exception may be thrown by some browsers.
        $(ctx).prev('.copy-notice').text("複製成功").fadeIn();
        setTimeout(function () { $(ctx).prev('.copy-notice').fadeOut(); }, 1000);
      } catch (ex) {
        $(ctx).prev('.copy-notice').text("複製失敗").fadeIn();
        setTimeout(function () { $(ctx).prev('.copy-notice').fadeOut(); }, 1000);
        return false
      }
    } else {
      $(ctx).prev('.copy-notice').text("瀏覽器不支援")
    }
  }

  // click events
  $('.highlight .fa-copy').on('click', function () {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents($(this).next('table').find('.code pre')[0])
    selection.removeAllRanges()
    selection.addRange(range)
    var text = selection.toString()
    copy(text, this)
    window.getSelection().removeAllRanges();
  })
})
