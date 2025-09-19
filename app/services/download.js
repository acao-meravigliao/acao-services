import Service from '@ember/service';

export default Service.extend({
  asCSV(filename, contents) {
    let { document, URL } = window;
    let anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = URL.createObjectURL(new Blob([contents], {
      type: 'text/csv'
    }));

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
});
