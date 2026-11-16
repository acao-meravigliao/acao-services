import Component from '@glimmer/component';

export default class RawModelViewerComponent extends Component {
  get type_of() {
    return typeof this.args.value;
  }

  get keys() {
    return Object.keys(this.args.value);
  }
}
