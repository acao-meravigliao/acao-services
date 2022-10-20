import Component from '@glimmer/component';

export default class RawModelsViewerComponent extends Component {
  get attributes() {
    let attrs = new Map();

    if (this.args.models.length > 0)
      attrs = this.args.models.firstObject.constructor.attributes;

    if (this.args.show)
      attrs = new Map([...attrs].filter(([ k, v ]) => (this.args.show.includes(k))));

    if (this.args.hide)
      attrs = new Map([...attrs].filter(([ k, v ]) => (!this.args.hide.includes(k))));

    return attrs;
  }
}
