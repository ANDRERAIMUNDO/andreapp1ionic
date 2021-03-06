import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Maria Rosa da Silva', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      email: ['9000andre@gmail.com', [Validators.required, Validators.email]],
      senha: ['minhasenha32323', [Validators.required]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['23569844021', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      cep: ['68655999', [Validators.required]],
      logradouro: ['rua nova', [Validators.required]],
      numero: ['12', [Validators.required]],
      complemento: ['centro', []],
      bairro: ['novo bairro', [Validators.required]],
      telefone1: ['91987567180', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: ['null', [Validators.required]],
      cidadeId: ['null', [Validators.required]]
    });
  }
  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
  }
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      })
  }
  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }
  showInsertOk() {
    let alert = this.alertCtrl.create(
      {
        title: 'Sucesso! ',
        message: 'Registro efetuado',
        enableBackdropDismiss: false,
        buttons:
          [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.setRoot('HomePage');
              }
            }

          ]
      }
    );
    alert.present();
  }
}
