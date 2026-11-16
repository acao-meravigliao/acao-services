import Component from '@glimmer/component';

export default class RawModelViewerComponent extends Component {
  get attributes() {
    return this.args.model.get_attributes();
  }
}
