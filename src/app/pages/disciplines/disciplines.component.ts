import { Component, OnInit } from '@angular/core';
import { DisciplineService } from 'src/app/services/discipline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import {TreeNode} from 'primeng/api';

import { OrgUnitsService } from 'src/app/services/org-units.service';


@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  providers: [ConfirmationService],  
  styleUrls: ['./disciplines.component.scss'],
})
export class DisciplinesComponent implements OnInit {

  selected: string = 'item1';
  selectedNodes1: any[] = [];
  disciplines: any;
  showModal: boolean;     
  types:any = 'private';
  level: any = '';
  query: any = '';
  modalities: any = '';
  months: any = '';
  years: any = '';
  filterOpen: any; 
  searchForm: FormGroup;
  editMode: boolean;
  selectUndefinedOptionValue:any = '';
  displayBasic: boolean;
  textError: any;

  data1: TreeNode[];

  filterOrgUnits:any = [];

  nivelEnsino: any = ['', 'educacao-basica-ensino-fundamental-series-iniciais', 'educacao-basica-ensino-fundamental-series-finais', 'educacao-basica-ensino-medio', 'educacao-basica-ensino-tecnico-de-nivel-medio'];
  modalidades: any = ['', 'ead', 'semi-presencial', 'presencial'];
  anos: any = ['','2018', '2019', '2020', '2021'];
  meses: any = ['','janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];


  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes   

  constructor(
    private disciplineService: DisciplineService,
    private FormBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private orgUnitsService: OrgUnitsService
        
  ) {this.createSearchForm(); }

  ngOnInit(): void {
    
    this.getDisciplines();
    this.getOrgUnits();
    
  }

    //Forms
  createSearchForm(){
        this.searchForm = this.FormBuilder.group({
          text: ['', [Validators.required]],
          nivelEnsino: ['', [Validators.required]],
          modalidades: ['', [Validators.required]],
          codTurma: ['', [Validators.required]],
          nomeTurma: ['', [Validators.required]],
          cursoFilter: ['', [Validators.required]],
          nivelFilter: ['', [Validators.required]],
          modalidadeFilter: ['', [Validators.required]],
          anosFilter: ['', [Validators.required]],
          mesesFilter: ['', [Validators.required]],
        })

        
        
    }   

  getDisciplines() {
      this.disciplineService.getDisciplines(this.types, this.query, this.level, this.modalities, this.months, this.years)
      .subscribe( disciplines => this.disciplines = disciplines);
      
  }

  
  closeModal(){
      this.showModal = false;
      this.editMode = false;
  }  

  openModal(){
      this.searchForm.controls['codTurma'].setValue('');
      this.searchForm.controls['nomeTurma'].setValue('');
      this.searchForm.controls['nivelEnsino'].setValue('');
      this.searchForm.controls['modalidades'].setValue('');
      this.showModal = !this.showModal;
      
  }   

  postDiscipline(){
        let codTurma = this.searchForm.controls.codTurma.value
        let nomeTurma = this.searchForm.controls.nomeTurma.value
        let nivelEnsino = this.searchForm.controls.nivelEnsino.value
        let modalidades = this.searchForm.controls.modalidades.value

        this.filterOrgUnits = this.selectedNodes1.map(array => array?.external_id);

            const params = {
              "external_id": codTurma,
              "title": nomeTurma,
              "nivel_external_id": nivelEnsino,
              "modalidade_external_id": modalidades,
              "organizationalUnitsRelateds": this.filterOrgUnits
            }         

            this.selectedNodes1 = [];
               
            this.disciplineService.postDisciplines(params)
            .subscribe(() => console.log(params));
            setTimeout(()=>{
                this.getDisciplines();
            },500);        
            
          console.log(this.searchForm);

  }    

  changeFilterDiscipline(filter: any){
      this.selected = filter;
      if (filter == "item1") {
        this.disciplineService.getDisciplines('private', this.query, this.level,this.modalities, this.months, this.years)
        .subscribe( disciplines => this.disciplines = disciplines);        
      }      

      if (filter == "item2") {
        this.disciplineService.getDisciplines('public', this.query, this.level,this.modalities, this.months, this.years)
        .subscribe( disciplines => {
          disciplines.forEach((element: any) => {
            console.log(element);
            element["type"] = "open";
            // element.push({"type":"open"})
          });
          this.disciplines = disciplines
          console.log(this.disciplines);
          
        });        
      }

      if (filter == "item3") {
        this.disciplineService.getDisciplines('archived', this.query, this.level,this.modalities, this.months, this.years)
        .subscribe( disciplines => this.disciplines = disciplines);           
      }
  }  
 

  searchDiscipline(){
    let text = this.searchForm.controls.text.value

    console.log('text', text);
    this.disciplineService.getDisciplines(this.types, text, this.level, this.modalities, this.months, this.years)
    .subscribe( disciplines => this.disciplines = disciplines);
    
  }

  nodeSelect($event: any) {
    setTimeout(() => {
      console.log(this.selectedNodes1);  
    }, 500);
  }

  remove(id: any){
    console.log(id);
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          accept: () => {
            this.disciplineService.deleteDisciplines(id)
            .subscribe((response) => {
                console.log(response)
                setTimeout(()=>{
                  this.getDisciplines();
                },500);   
            },(err) => {
                this.displayBasic = true;
                this.textError = err.error;
                console.log('err',err);
            });

          },
          reject: () => {

          }
      });      
    // this.disciplineService.deleteDisciplines(id)
    // .subscribe( disciplines => console.log(disciplines));    
    
  }

  formatOrgunit(ou: any){

        

        if (Array.isArray(ou)) {

          ou = ou.filter( filterOU => filterOU.parent_external_id == "");
            
            return ou.map(
                (obj: any) => {
                    return {
                        "external_id":obj.external_id,
                        "label": obj.name,
                        "type": "person",
                        "styleClass": "p-person",
                        "expanded": true,
                        "types": obj?.types,
                        "data": {
                            "name": obj?.types[0]?.name,
                            "avatar": "walter.jpg"
                        },
                        "children":obj?.children                    
                    }
                }
            )        
        }else{
            ou['external_id'] = ou.external_id;
            ou['children'] = ou.children != null ? ou.children : [];
            ou['data'] = {"name": ou?.types[0]?.name};
            ou['expanded'] = true;
            ou['label'] = ou?.name;
            ou['styleClass'] = "p-person";
            ou['type'] = "person";  
            
            delete ou['children_cache'];
            delete ou['id'];
            delete ou['parents'];
            delete ou['parents_cache'];
            delete ou['related_organizational_units'];
            delete ou['name'];

            return ou;    
        }


    }

  jsonReorder(orgUnits: any){

      this.data1 = this.formatOrgunit(orgUnits);

      for (let index = 0; index < this.data1.length; index++) {
          const element = this.data1[index];
          console.log(element);

          this.childrenNames(element);

      }

  }  

  childrenNames(orgUnit: any){

      for (let index = 0; index < orgUnit.children?.length; index++) {
          let oNode = orgUnit.children[index]; 

          oNode = this.formatOrgunit(oNode);

          if (oNode?.hasOwnProperty('children')
              && oNode?.children instanceof Array
              && oNode.children?.length > 0 
              && oNode.children != null)
          {
              this.childrenNames(oNode)
          
          }
          
      }

  }   

  getOrgUnits() {
      this.orgUnitsService.getOrgUnits()
      .subscribe( orgUnits => {
          this.jsonReorder(orgUnits)
        });
      
  }  

  filterDiscipline(){
    let nivelFilter = this.searchForm.controls.nivelFilter.value
    let modalidadeFilter = this.searchForm.controls.modalidadeFilter.value
    let anosFilter = this.searchForm.controls.anosFilter.value
    let mesesFilter = this.searchForm.controls.mesesFilter.value

    this.disciplineService.getDisciplines(this.types, this.query, nivelFilter, modalidadeFilter, mesesFilter, anosFilter)
    .subscribe( disciplines => this.disciplines = disciplines);


  }

}
