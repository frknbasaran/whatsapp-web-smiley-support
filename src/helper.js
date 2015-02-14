/*
  author : Eray Arslan
  for : Furkan Başaran <3
 */
var ea;
$(document).ready(function () {

    $.fn.focusEnd = function() {
        
        $(this).focus();
        
        var tmp = $('<span />').appendTo($(this)),
            node = tmp.get(0),
            range = null,
            sel = null;

        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }

        tmp.remove();
        
        return this;
    }

    $('body').on('keyup', '#compose-input > div', function(e) {
        
        var message = $('#compose-input > div').html();

        var regex = /\:d/ig;
        message = message.replace(regex, '<img alt="😄" class="emoji emojie415" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\)/ig;
        message = message.replace(regex, '<img alt="😊" class="emoji emojie056" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\;\)/ig;
        message = message.replace(regex, '<img alt="😉" class="emoji emojie405" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\<3/ig;
        message = message.replace(regex, '<img alt="😍" class="emoji emojie106" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:p/ig;
        message = message.replace(regex, '<img alt="😛" class="emoji emoji1f61b" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\*\-p/ig;
        message = message.replace(regex, '<img alt="😜" class="emoji emojie105" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\(/ig;
        message = message.replace(regex, '<img alt="😞" class="emoji emojie058" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /x\(/ig;
        message = message.replace(regex, '<img alt="😣" class="emoji emojie406" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\'\(/ig;
        message = message.replace(regex, '<img alt="😢" class="emoji emojie413" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\O/ig;
        message = message.replace(regex, '<img alt="😮" class="emoji emoji1f62e" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /B\|/ig;
        message = message.replace(regex, '<img alt="😎" class="emoji emoji1f60e" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /O\-\)/ig;
        message = message.replace(regex, '<img alt="😇" class="emoji emoji1f607" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:bok/ig;
        message = message.replace(regex, '<img alt="💩" class="emoji emojie05a" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        
        $('#compose-input > div').html(message);

        $('#compose-input > div').focusEnd();
                  
    });

});
