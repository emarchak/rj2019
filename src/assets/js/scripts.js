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
    Object.keys(formEvents).forEach((formId) => {
      const form = node.getElementById(formId);
      if (!form) {
        return;
      }

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        setTimeout(submitForm(evt.target), 500);
        ga('send', {
          hitType: 'event',
          eventAction: 'submit',
          eventLabel: formEvents[formId],
          eventValue: getFormValue(evt.target),
          hitCallback: () => { submitForm(evt.form); },
        });
      });
    });
  }

  trackFormSubmissions();
}

document.addEventListener('DOMContentLoaded', () => {
  rj2019(document);
});
