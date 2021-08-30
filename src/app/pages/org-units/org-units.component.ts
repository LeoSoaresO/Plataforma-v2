import { Component, OnInit } from '@angular/core';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { OrgUnitsService } from 'src/app/services/org-units.service';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-org-units',
  templateUrl: './org-units.component.html',
  providers: [MessageService],
  styleUrls: ['./org-units.component.scss']
})
export class OrgUnitsComponent implements OnInit {

    data1: TreeNode[];
    selectedNode: TreeNode;
    node: any;
    showModal: boolean;   
    orgUnitForm: FormGroup;
    tipoCampo: any = ['date', 'string', 'number','regex','list','boolean'];

    // Icons
    faEllipisisV = faEllipsisV
    faPlus = faPlus
    faTimes = faTimes    

    constructor(
        private messageService: MessageService, 
        private orgUnitsService: OrgUnitsService,
        private FormBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.createOrgUnitForm();
        this.getOrgUnits();

    }

    //Forms
    createOrgUnitForm(){
        this.orgUnitForm = this.FormBuilder.group({
        nomeOrgUnit: ['', [Validators.required]],
        tipoCampo: ['']
        })
    }    

    closeModal(){
        this.showModal = false;
    }

    openModal(){
        this.orgUnitForm.controls['nomeOrgUnit'].setValue('');
        this.orgUnitForm.controls['tipoCampo'].setValue('');
        this.showModal = !this.showModal;
    }    
    getOrgUnits() {
        this.orgUnitsService.getOrgUnits()
        .subscribe( orgUnits => this.data1 = orgUnits );
    }

    postOrgUnits(){
        let nomeOrgUnit = this.orgUnitForm.controls.nomeOrgUnit.value
        let tipoCampo = this.orgUnitForm.controls.tipoCampo.value
        const params = {
            "cs_code": nomeOrgUnit,
            "type": tipoCampo, // string, number, date, regex, list, boolean
        }

        this.orgUnitsService.postOrgUnits(params)
        .subscribe(() => console.log(this.data1));
        setTimeout(()=>{
            this.getOrgUnits();
        },500);   
    }    

    onNodeSelect(event: any) {
        console.log("onNode", event);
        return event;
        // this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }

    add(event:any,item: any){
        // this.node = this.onNodeSelect(event);
        console.log("item", item);
        event.stopPropagation();
        console.log('check key', item.hasOwnProperty('children'));
        let children: any = {};

        
        if (item.hasOwnProperty('children')) {
            
            item.children.push({
                data: {
                    avatar: "",
                    name: "teste"
                },
                label: "other",
                styleClass: "p-person",
                type: "person",
                expanded: true
            })
        }else{
            item['children'] = children = [{data: {
                    avatar: "",
                    name: "teste"
                },
                label: "other",
                styleClass: "p-person",
                type: "person",
                expanded: true
            }];

        }        
        
    }

    trash(event:any,item: any){
        // this.node = this.onNodeSelect(event);
        console.log("item", item);
        event.stopPropagation();
        console.log('check key', item.hasOwnProperty('children'));
        let children: any = {};

        
        if (item.hasOwnProperty('children')) {
            
            item.children.push({
                data: {
                    avatar: "",
                    name: "teste"
                },
                label: "other",
                styleClass: "p-person",
                type: "person",
                expanded: true
            })
        }else{
            item['children'] = children = [{data: {
                    avatar: "",
                    name: "teste"
                },
                label: "other",
                styleClass: "p-person",
                type: "person",
                expanded: true
            }];

        }        
        
    }   


    edit(event:any,item: any){
        // this.node = this.onNodeSelect(event);
        console.log("item", item);
        event.stopPropagation();
        console.log('check key', item.hasOwnProperty('children'));
        let children: any = {};

        item.data.name = "Novo nome";
        item.label = "Novo Label"     
        
    }        

}
