import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtodetail',
  templateUrl: 'produtodetail.html',
})
export class ProdutodetailPage {

  item: ProdutoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item =
    {
      id: "1",
      nome: "mouse-sem-fio",
      preco: 90.00
    }
  }

}
