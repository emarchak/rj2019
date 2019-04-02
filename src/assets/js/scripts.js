function initPolyfills() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
}

function rj2019(node) {
  let formSubmited = false;
  const formEvents = {
    join_page_new_signup_form: 'Join',
    donate_page_new_donation_form: 'Donate',
  };

  function submitForm(form) {
    if (!formSubmited) {
      formSubmited = true;
      form.submit();
    }
  }

  function getFormValue(form) {
    let value = (form.querySelector('[name="donation[amount]"]') || {}).value || '0.00';
    value = Math.round(parseFloat(value.replace(',', '')));
    return Number.isNaN(value) ? 0 : value;
  }

  function trackFormSubmissions() {
    Object.keys(formEvents).forEach(function(formId) {
      const form = node.getElementById(formId);
      if (!form) {
        return;
      }

      form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        setTimeout(submitForm(evt.target), 500);
        ga('send', {
          hitType: 'event',
          eventCategory: formEvents[formId],
          eventAction: 'submit',
          eventLabel: formEvents[formId],
          eventValue: getFormValue(evt.target),
          hitCallback: submitForm(evt.form),
        });
      });
    });
  }

  function nestedCheckboxes() {
    var parentCheckbox = document.getElementById('checkbox_7');
    var parentWrapper = parentCheckbox.closest('div.checkbox');
    var childCheckboxes = ['checkbox_6', 'checkbox_9', 'checkbox_10', 'checkbox_11', 'checkbox_12', 'checkbox_13'];

    if (parentCheckbox === null || parentWrapper == null) {
      return;
    }

    function hideChildren() {
      childCheckboxes.forEach(function(id) {
        var checkbox = document.getElementById(id);
        if (checkbox !== null) {
          var childWrapper = checkbox.closest('div.checkbox');
          childWrapper.setAttribute('data-child-checkbox', '');
          childWrapper.setAttribute('data-child-checkbox-state', 'hidden');
          checkbox.checked = false;
        }
      });
    }

    function showChildren() {
      childCheckboxes.forEach(function(id) {
        var checkbox = document.getElementById(id);
        if (checkbox !== null) {
          var childWrapper = checkbox.closest('div.checkbox');
          childWrapper.setAttribute('data-child-checkbox', '');
          childWrapper.setAttribute('data-child-checkbox-state', 'visible');
        }
      });
    }

    parentWrapper.setAttribute('data-parent-checkbox', '');
    parentWrapper.setAttribute('data-parent-checkbox-state', 'unchecked');
    hideChildren();

    parentCheckbox.addEventListener('change', function() {
      if(this.checked) {
        parentWrapper.setAttribute('data-parent-checkbox-state', 'checked');
        showChildren();
      } else {
        parentWrapper.setAttribute('data-parent-checkbox-state', 'unchecked');
        hideChildren();
      }
    });
  };

  trackFormSubmissions();
  nestedCheckboxes();
}

document.addEventListener('DOMContentLoaded', function() {
  initPolyfills();
  rj2019(document);
});
