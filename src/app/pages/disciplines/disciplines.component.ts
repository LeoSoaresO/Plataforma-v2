import { Component, OnInit } from '@angular/core';
import { DisciplineService } from 'src/app/services/discipline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {

  selected: string = 'item1';
  disciplines: any;
  showModal: boolean;     
  types:any = 'private';
  query: any = '';
  modalities: any = '';
  months: any = '';
  years: any = '';
  searchForm: FormGroup;
  editMode: boolean;
  nivelEnsino: any = ['educacao-basica-ensino-fundamental-series-iniciais', 'educacao-basica-ensino-fundamental-series-finais', 'educacao-basica-ensino-medio', 'educacao-basica-ensino-tecnico-de-nivel-medio'];
  modalidades: any = ['ead', 'semi-presencial', 'presencial'];

  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes   

  constructor(
    private disciplineService: DisciplineService,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
    this.getDisciplines();
  }

    //Forms
  createSearchForm(){
        this.searchForm = this.FormBuilder.group({
        text: ['', [Validators.required]],
        nivelEnsino: ['', [Validators.required]],
        modalidades: ['', [Validators.required]],
        codTurma: ['', [Validators.required]],
        nomeTurma: ['', [Validators.required]],
        })
    }   

  getDisciplines() {
      this.disciplineService.getDisciplines(this.types, this.query, this.modalities, this.months, this.years)
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
 


        if (this.editMode) {

            const params = {
              "external_id": codTurma,
              "title": nomeTurma,
              "nivel_external_id": nivelEnsino,
              "modalidade_external_id": modalidades,
            }
      
            // this.editMode = false;
            // this.disciplineService.updateDisciplines(external_id, this.selectedNode)
            // .subscribe(() => console.log(this.selectedNode));
            // setTimeout(()=>{
            //     this.getDisciplines();
            // },500);        
        }else{

            const params = {
              "external_id": "super-administrator-test",
              "title": nomeTurma,
              "nivel_external_id": nivelEnsino,
              "modalidade_external_id": modalidades,
            }            
            this.disciplineService.postDisciplines(params)
            .subscribe(() => console.log(params));
            setTimeout(()=>{
                this.getDisciplines();
            },500);   
        }        


  }    

  changeFilterDiscipline(filter: any){
      this.selected = filter;
      if (filter == "item1") {
        this.disciplineService.getDisciplines('private', this.query, this.modalities, this.months, this.years)
        .subscribe( disciplines => this.disciplines = disciplines);        
      }      

      if (filter == "item2") {
        this.disciplineService.getDisciplines('public', this.query, this.modalities, this.months, this.years)
        .subscribe( disciplines => this.disciplines = disciplines);        
      }

      if (filter == "item3") {
        this.disciplineService.getDisciplines('archived', this.query, this.modalities, this.months, this.years)
        .subscribe( disciplines => this.disciplines = disciplines);           
      }
  }  
 

  searchDiscipline(){
    let text = this.searchForm.controls.text.value

    console.log('text', text);
    this.disciplineService.getDisciplines(this.types, text, this.modalities, this.months, this.years)
    .subscribe( disciplines => this.disciplines = disciplines);
    
  }

}
