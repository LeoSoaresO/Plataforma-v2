import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  selected:string = 'item1';

  ngOnInit(): void {
    this.configGerais();
  }

  configGerais(){
    this.router.navigate(['gerais'], {relativeTo:this.route});
    this.selected =  'item1';
  }
  configAvancadas(){
    this.router.navigate(['avancadas'], {relativeTo:this.route});
    this.selected =  'item2';
  }
  configCamposCustom(){
    this.router.navigate(['campos-customizados'], {relativeTo:this.route});
    this.selected =  'item3';
  }
  configIntegracoes(){
    this.router.navigate(['integracoes'], {relativeTo:this.route});
    this.selected =  'item4';
  }
  configLogin(){
    this.router.navigate(['login'], {relativeTo:this.route});
    this.selected =  'item5';
  }
}
