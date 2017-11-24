import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'exception-box',

  // Until we have i18n
  classNameToI18nKey: function(val) {
    return val.replace(/^::/, '').replace(/::/g, '.').replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').
             replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/-/g, '_').toLowerCase().split('.').join('.');
  },

  i18n_exact(key) {
    return this.translations[key];
  },

  translations: {
    'ygg.acao.password_recovery_controller.credential_not_found.title':
      'Credenziale non trovata',
    'ygg.acao.password_recovery_controller.credential_not_found.descr':
      'Questo è un errore un po\' inatteso, contatta la segreteria',
    'ygg.acao.password_recovery_controller.account_not_found.title':
      'Account non trovato',
    'ygg.acao.password_recovery_controller.account_not_found.descr':
      'Il codice pilota che hai indicato non esiste',
    'ygg.acao.password_recovery_controller.contact_not_found.title':
      'Contatto non trovato',
    'ygg.acao.password_recovery_controller.contact_not_found.descr':
      'L\'account che hai specificato non ha un indirizzo e-mail associato, non posso inviare la password',
  },

  exceptionChanged: Ember.observer('exception', function() {
    if (this.get('exception')) {
      Ember.$('.modal').modal('show');
    } else {
      Ember.$('.modal').modal('hide');
    }
  }),

  isInternalError: Ember.computed('exception', function() {
    return this.get('exception.catcher') == 'JsonExceptions::Middleware';
  }),

  title: Ember.computed('exception', function() {
    if (!this.get('exception'))
      return '';

    if (this.get('isInternalError'))
      return 'Errore interno';

    return this.get('exception.title') ||
           this.i18n_exact(this.classNameToI18nKey(this.get('exception.type') + '.title')) ||
           this.get('exception.type');
  }),

  descr: Ember.computed('exception', function() {
    if (!this.get('exception'))
      return '';

    if (this.get('isInternalError'))
      return 'Si è verificato un errore interno e verrà (forse) analizzato dal nostro staff, riprova più tardi,' +
             ' prega il prodigioso spaghetto volante e, se proprio non va, chiedi alla segreteria.';

    return this.get('exception.descr') ||
           this.i18n_exact(this.classNameToI18nKey(this.get('exception.type') + '.descr'));
  }),

  actions: {
  },
});
