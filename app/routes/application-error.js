import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, error) {
    console.log("=============================> APPLICATION ERROR: ", error);

    if (error.exception) {
      controller.set('title', error.exception.title); // FIXME implement i18n
      controller.set('detail', error.exception.detail);
    } else if (error.payload && error.payload.is_ygg_exception) {
      controller.set('title', error.payload.title);
      controller.set('detail', error.payload.detail);
    } else if (error.payload && error.payload.title) {
      controller.set('title', error.payload.title);
      controller.set('detail', error.payload.detail);
    } else if (error.message) {
      controller.set('title', error.message);
    } else {
      controller.set('title', 'Errore non specificato');
    }
  },
});
