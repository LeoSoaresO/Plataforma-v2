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
    selectedNode: any;
    node: any;
    showModal: boolean;   
    orgUnitForm: FormGroup;
    tipoCampo: any[];
    editMode: boolean;

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
        externalId: ['', [Validators.required]],
        nomeOrgUnit: ['', [Validators.required]],
        tipoCampo: ['']
        })
    }    

    closeModal(){
        this.showModal = false;
        this.editMode = false;
    }

    openModal(node: any){
        this.getTypes();
        this.selectedNode = node;
        this.orgUnitForm.controls['externalId'].setValue('');
        this.orgUnitForm.controls['nomeOrgUnit'].setValue('');
        this.orgUnitForm.controls['tipoCampo'].setValue('');
        this.showModal = !this.showModal;
        
    }

    formatOrgunit(ou: any){

        

        if (Array.isArray(ou)) {
            console.log('ou', ou);
            
            
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
                            "name": obj?.types[0].name,
                            "avatar": "walter.jpg"
                        },
                        "children":obj?.children                    
                    }
                }
            )        
        }else{
            ou['external_id'] = ou.external_id;
            ou['children'] = ou.children != null ? ou.children : [];
            ou['data'] = {"name": ou.types[0].name};
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

            return ou            
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
        .subscribe( orgUnits => this.jsonReorder(orgUnits) );
       
    }

    getTypes(){
        this.orgUnitsService.getTypes()
        .subscribe( types => this.tipoCampo = types);        
    }

    postOrgUnits(){
        let external_id = this.orgUnitForm.controls.externalId.value
        let nomeOrgUnit = this.orgUnitForm.controls.nomeOrgUnit.value
        let tipoCampo = this.orgUnitForm.controls.tipoCampo.value
 
        this.selectedNode = {
            "external_id": external_id,
            "name": nomeOrgUnit,
            "parent_external_id": this.selectedNode.external_id,
            "types": [tipoCampo]
        }

    if (this.editMode) {
      this.editMode = false;
      this.orgUnitsService.updateOrgUnits(this.selectedNode.external_id, this.selectedNode)
      .subscribe(() => console.log(this.selectedNode));
      setTimeout(()=>{
          this.getOrgUnits();
      },500);        
    }else{

        this.orgUnitsService.postOrgUnits(this.selectedNode)
        .subscribe(() => console.log(this.selectedNode));
        setTimeout(()=>{
            this.getOrgUnits();
        },500);   
    }        


    }    

    onNodeSelect(event: any) {
        // console.log("onNode", event);
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
        this.editMode = true;
        console.log("item", item);
        event.stopPropagation();
        this.openModal(item);
    
        this.orgUnitForm.controls['externalId'].setValue(item.external_id);
        this.orgUnitForm.controls['nomeOrgUnit'].setValue(item.label);
        this.orgUnitForm.controls['tipoCampo'].setValue(item.types[0].id);
        
    }        

}
