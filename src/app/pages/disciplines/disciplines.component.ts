import { Component, OnInit } from '@angular/core';
import { DisciplineService } from 'src/app/services/discipline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  providers: [ConfirmationService],  
  styleUrls: ['./disciplines.component.scss'],
})
export class DisciplinesComponent implements OnInit {

  selected: string = 'item1';
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
    private primengConfig: PrimeNGConfig    
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
              "external_id": codTurma,
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
          
        }
        );        
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
                this.textError = err.error.error;
                console.log('err',err);
            });

          },
          reject: () => {

          }
      });      
    // this.disciplineService.deleteDisciplines(id)
    // .subscribe( disciplines => console.log(disciplines));    
    
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
