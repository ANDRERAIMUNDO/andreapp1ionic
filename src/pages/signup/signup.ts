import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  fromGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

    this.fromGroup = this.formBuilder.group({
      nome: ['andre raimundo', [Validators.required, Validators.minLength(10), Validators.minLength(100)]],
      email: ['andre1@gmail.com', [Validators.required, Validators.email]],
      senha: ['miha senha32323', [Validators.required]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['00938419226', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      cep: ['68655999', [Validators.required]],
      logradouro: ['rua nova', [Validators.required]],
      numero: ['12', [Validators.required]],
      complemento: ['centro', []],
      bairro: ['novo bairro', [Validators.required]],
      telefone1: ['919987567180', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }
  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.fromGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
  }
  updateCidades() {
    let estado_id = this.fromGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.fromGroup.controls.cidadeId.setValue(null);
      })
  }

  signupUser() {
    console.log("enviou o form");
  }

}
