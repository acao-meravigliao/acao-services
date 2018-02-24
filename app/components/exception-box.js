import $ from 'jquery';
import { observer, computed } from '@ember/object';
import Component from '@ember/component';
import { translationMacro as t } from "ember-i18n";

export default Component.extend({
  elementId: 'exception-box',

  // Until we have i18n
  classNameToI18nKey: function(val) {
    return val.replace(/^::/, '').replace(/::/g, '.').replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').
             replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/-/g, '_').toLowerCase().split('.').join('.');
  },

  exceptionChanged: observer('exception', function() {
    if (this.get('exception')) {
      $('.modal').modal('show');
    } else {
      $('.modal').modal('hide');
    }
  }),

  isInternalError: computed('exception', function() {
    return this.get('exception.catcher') == 'JsonExceptions::Middleware';
  }),

  title: computed('exception', function() {
    if (!this.get('exception'))
      return '';

    if (this.get('isInternalError'))
      return 'Errore interno';

    return this.get('exception.title') ||
           t(this.classNameToI18nKey(this.get('exception.type') + '.title')) ||
           this.get('exception.type');
  }),

  descr: computed('exception', function() {
    if (!this.get('exception'))
      return '';

    if (this.get('isInternalError'))
      return 'Si è verificato un errore interno e verrà (forse) analizzato dal nostro staff, riprova più tardi,' +
             ' prega il prodigioso spaghetto volante e, se proprio non va, chiedi alla segreteria.';

    return this.get('exception.descr') ||
           t(this.classNameToI18nKey(this.get('exception.type') + '.descr'));
  }),

  actions: {
  },
});
