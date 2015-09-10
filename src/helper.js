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

    $('body').on('keydown', '#main footer .block-compose .input-container .input', function(e) {

        var messageoud = $('#main footer .block-compose .input-container .input').html();
        var message = $('#main footer .block-compose .input-container .input').html();
        
        var regex = /\:d/ig;
        message = message.replace(regex, '<img alt="😄" draggable="false" class="emoji emojiordered1157" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\)/ig;
        message = message.replace(regex, '<img alt="☺" draggable="false" class="emoji emojiordered0055" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\;\)/ig;
        message = message.replace(regex, '<img alt="😉" draggable="false" class="emoji emojiordered1162" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\<3/ig;
        message = message.replace(regex, '<img alt="😍" draggable="false" class="emoji emojiordered1166" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:p/ig;
        message = message.replace(regex, '<img alt="😛" draggable="false" class="emoji emojiordered1180" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\*\-p/ig;
        message = message.replace(regex, '<img alt="😜" draggable="false" class="emoji emojiordered1181" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\(/ig;
        message = message.replace(regex, '<img alt="😔" draggable="false" class="emoji emojiordered1173" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /x\(/ig;
        message = message.replace(regex, '<img alt="😣" draggable="false" class="emoji emojiordered1188" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\'\(/ig;
        message = message.replace(regex, '<img alt="😢" draggable="false" class="emoji emojiordered1187" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:\O/ig;
        message = message.replace(regex, '<img alt="😮" draggable="false" class="emoji emojiordered1199" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /B\|/ig;
        message = message.replace(regex, '<img alt="😎" draggable="false" class="emoji emojiordered1167" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /O\-\)/ig;
        message = message.replace(regex, '<img alt="😇" draggable="false" class="emoji emojiordered1160" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">');
        regex = /\:bok/ig;
        message = message.replace(regex, '<img alt="💩" class="emoji emojie05a" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">" "');
        
        if (message!=messageoud){
		$('#main footer .block-compose .input-container .input').html(message);
	    $('#main footer .block-compose .input-container .input').focusEnd();
        }
    });

});
