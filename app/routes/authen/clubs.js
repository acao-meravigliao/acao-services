import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.findAll('ygg--acao--club');
  },
});
