import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, error) {
    console.log("=============================> APPLICATION ERROR: ", error);

    if (error.exception) {
      controller.set('title', error.exception.title); // FIXME implement i18n
      controller.set('detail', error.exception.detail);
    } else {
      controller.set('title', 'Errore non specificato');
    }
  },
});
