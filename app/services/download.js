import Service from '@ember/service';

export default Service.extend({
  as_type(filename, type, contents) {
    let { document, URL } = window;

    let anchor = document.createElement('a');

    anchor.download = filename;
    anchor.href = URL.createObjectURL(new Blob([contents], {
      type: type,
    }));

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
});
