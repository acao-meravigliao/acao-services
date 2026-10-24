import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'acao-services/config/environment';
import QRCode from 'qrcode';

export default class PaymentWireComponent extends Component {
  get epc_qrcode() {
    return "BCD\n" +
           "001\n" +
           "1\n" +
           "SCT\n" +
           "BPMOIT22XXX\n" +
           "AeroClub Adele Orsi Associazione Sportiva Dilettantesca\n" +
           "IT59Z0538750250000049572391\n" +
           "EUR" + this.args.debt.payment_needed + "\n" +
           "CHAR\n" +
           this.args.debt.identifier + "\n" +
           "Pagamento codice " + this.args.debt.identifier + (this.args.debt.descr ? (" per " + this.args.debt.descr) : '') + "\n" +
           "";
  }

  @action did_insert_qrcode(el) {
    QRCode.toCanvas(el, this.epc_qrcode);
  }
}
