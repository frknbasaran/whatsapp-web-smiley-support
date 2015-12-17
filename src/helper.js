// Thank you Benjamin!
(function(){

  var config = {
    icons: {},
    shortIcons: {}
  };

  var helpers = {
    loadConfig: function(type) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          config[type] = helpers.sortObject(JSON.parse(xhr.response));
        }
      };
      xhr.open("GET", chrome.extension.getURL('/config/'+type+'.json'), true);
      xhr.send();
    },

    sortObject: function(object) {
      var sortedObject = {},
          keysSorted;
      keysSorted = Object.keys(object).sort(function(a,b){
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
      });
      for (var i=0; i<keysSorted.length; i++) {
        sortedObject[keysSorted[i]] = object[keysSorted[i]];
      }
      return sortedObject;
    },

    replaceSmiley: function(node, text, start, end) {
      var smiley = document.createTextNode(text);

      helpers.range = helpers.selection.getRangeAt(0);
      helpers.range.setStart(node, start);
      helpers.range.setEnd(node, end);
      helpers.range.deleteContents();
      helpers.range.insertNode(smiley);
      helpers.range.setStartAfter(smiley);
      helpers.range.setEndAfter(smiley);
      helpers.selection.removeAllRanges();
      helpers.selection.addRange(helpers.range);
    },

    filterIcons: function(smileyStart) {
      var icons = {};
      if (config.icons[smileyStart] !== undefined) {
        icons[smileyStart] = config.icons[smileyStart];
        return icons;
      }
      for (var smiley in config.icons) {
        if (smiley.indexOf(smileyStart) === 0) {
          icons[smiley] = config.icons[smiley];
        } else if (smiley > smileyStart) {
          break;
        }
      }
      return icons;
    },

    buildSmileyList: function(icons, smileyStart) {
      var smileyList = '',
          isFirst = true;
      for (var smiley in icons) {
        smileyList += '<li' + (isFirst ? ' class="wawss-autocomplete-selected"' : '') + '>';
        smileyList += '<span style="margin-right: 5px">' + icons[smiley].alt + '</span> ';
        if (smileyStart) {
          smileyList += '<strong>' + smileyStart + '</strong>' + smiley.substr(smileyStart.length);
        } else {
          smileyList += smiley;
        }
        isFirst = false;
      }
      return smileyList;
    },

    initAutocomplete: function() {
      helpers.autocomplete.classList.add('wawss-autocomplete-list');
      helpers.autocomplete.classList.add('wawss-hidden');
      var autocompleteWrapper = document.createElement('div');
      autocompleteWrapper.classList.add('wawss-autocomplete-wrapper');
      autocompleteWrapper.appendChild(helpers.autocomplete);
      document.body.appendChild(autocompleteWrapper);
    },

    isAutocompleteVisible: function() {
      return !helpers.autocomplete.classList.contains('wawss-hidden');
    },

    selectPreviousListitem: function() {
      var selected = document.querySelector('.wawss-autocomplete-selected'),
          newSelected, offset;
      if (selected !== null) {
        selected.classList.remove('wawss-autocomplete-selected');
        if (selected === helpers.autocomplete.firstChild) {
          newSelected = helpers.autocomplete.lastChild;
          helpers.autocomplete.scrollTop = newSelected.offsetTop + newSelected.offsetHeight + 20;
        } else {
          newSelected = selected.previousElementSibling;
          offset = newSelected.offsetTop - helpers.autocomplete.scrollTop;
          if (offset < 0) {
            helpers.autocomplete.scrollTop = helpers.autocomplete.scrollTop + offset - 50;
          }
        }
        newSelected.classList.add('wawss-autocomplete-selected');
      }
    },

    selectNextListitem: function() {
      var selected = document.querySelector('.wawss-autocomplete-selected'),
          newSelected, offset;
      if (selected !== null) {
        selected.classList.remove('wawss-autocomplete-selected');
        if (selected === helpers.autocomplete.lastChild) {
          newSelected = helpers.autocomplete.firstChild;
          helpers.autocomplete.scrollTop = 0;
        } else {
          newSelected = selected.nextElementSibling;
          offset = newSelected.offsetTop + newSelected.offsetHeight - helpers.autocomplete.scrollTop - helpers.autocomplete.offsetHeight;
          if (offset > 0) {
            helpers.autocomplete.scrollTop = helpers.autocomplete.scrollTop + offset + 50;
          }
        }
        newSelected.classList.add('wawss-autocomplete-selected');
      }
    },

    insertIcon: function() {
      var selected = document.querySelector('.wawss-autocomplete-selected');
      if (selected !== null) {
        var enteredText = selected.querySelector('strong').innerText,
            end = helpers.selection.anchorOffset,
            start = end - enteredText.length;
        helpers.replaceSmiley(helpers.selection.anchorNode, selected.firstChild.innerHTML, start, end);
      }
      document.querySelector('.pane-chat-msgs.pane-chat-body').style.paddingBottom = '';
      helpers.autocomplete.classList.add('wawss-hidden');
    },

    selection: window.getSelection(),
    range: null,
    autocomplete: document.createElement('ul'),

    checkSmileys: true
  };

  document.addEventListener('keydown', function(e) {
    if (helpers.isAutocompleteVisible()) {
      if (e.which === 13) {
        e.preventDefault();
        e.stopPropagation();
        helpers.insertIcon();
        helpers.checkSmileys = false;
      } else if (e.which === 37 || e.which === 38 || (e.which === 9 && e.shiftKey === true)) {
        e.preventDefault();
        helpers.selectPreviousListitem();
        helpers.checkSmileys = false;
      } else if (e.which === 39 || e.which === 40 || (e.which === 9 && e.shiftKey === false)) {
        e.preventDefault();
        helpers.selectNextListitem();
        helpers.checkSmileys = false;
      }
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.target.isContentEditable && helpers.selection.anchorNode.nodeType === 3 &&
      e.which !== 9 && e.which !== 16 && helpers.checkSmileys) {
      var message = helpers.selection.anchorNode.nodeValue,
          position = helpers.selection.anchorOffset,
          messagePart = message.substr(0, helpers.selection.anchorOffset - 1),
          smileyOffset = messagePart.lastIndexOf(':'),
          listHeightBefore = helpers.autocomplete.offsetHeight,
          paneBody = document.querySelector('.pane-chat-msgs.pane-chat-body'),
          icons = {};

      for (var smiley in config.shortIcons) {
        if (position - smiley.length > -1 &&
          message.substr(position - smiley.length, smiley.length) === smiley) {
          helpers.replaceSmiley(helpers.selection.anchorNode, config.shortIcons[smiley]['alt'], position - smiley.length, position);
          paneBody.style.paddingBottom = '';
          helpers.autocomplete.classList.add('wawss-hidden');
          return;
        }
      }

      if (smileyOffset > -1) {
        var smileyStart = messagePart.substr(smileyOffset) + message.substr(helpers.selection.anchorOffset - 1, 1);
        icons = helpers.filterIcons(smileyStart);
        if (icons.hasOwnProperty(smileyStart)) {
          helpers.replaceSmiley(helpers.selection.anchorNode, config.icons[smileyStart]['alt'], smileyOffset, smileyOffset + smileyStart.length);
        } else {
          var listItems = helpers.buildSmileyList(icons, smileyStart);
          if (listItems.length > 0) {
            helpers.autocomplete.innerHTML = listItems;
            helpers.autocomplete.classList.remove('wawss-hidden');
            var listHeight = helpers.autocomplete.offsetHeight;
            paneBody.style.paddingBottom = 8 + listHeight + 'px';
            if (listHeightBefore < listHeight) {
              paneBody.scrollTop = paneBody.scrollTop  + listHeight - listHeightBefore;
            }
            return;
          }
        }
      }
      paneBody.style.paddingBottom = '';
      helpers.autocomplete.classList.add('wawss-hidden');
    }
    helpers.checkSmileys = true;
  });

  document.addEventListener('click', function(e) {
    if (!e.target.isContentEditable) {
      document.querySelector('.pane-chat-msgs.pane-chat-body').style.paddingBottom = '';
      helpers.autocomplete.classList.add('wawss-hidden');
    }
  });

  helpers.loadConfig('icons');
  helpers.loadConfig('shortIcons');
  helpers.initAutocomplete();
})();
