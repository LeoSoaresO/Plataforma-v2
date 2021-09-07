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

    openModal(node: any){
        this.selectedNode = node;
        this.orgUnitForm.controls['nomeOrgUnit'].setValue('');
        this.orgUnitForm.controls['tipoCampo'].setValue('');
        this.showModal = !this.showModal;
        console.log(this.selectedNode );
        
    }

    formatOrgunit(ou: any){

        if (Array.isArray(ou)) {
            
            return ou.map(
                (obj: any) => {
                    return {
                        "id":obj.id,
                        "label": obj.name,
                        "type": "person",
                        "styleClass": "p-person",
                        "expanded": true,
                        "data": {
                            "name": obj?.types[0].name,
                            "avatar": "walter.jpg"
                        },
                        "children":obj?.children                    
                    }
                }
            )        
        }else{
            ou['id'] = ou.id;
            ou['children'] = ou.children != null ? ou.children : [];
            ou['data'] = {"name": ou.types[0].name};
            ou['expanded'] = true;
            ou['label'] = ou?.name;
            ou['styleClass'] = "p-person";
            ou['type'] = "person";  
            
            delete ou['children_cache'];
            delete ou['external_id'];
            delete ou['parents'];
            delete ou['parents_cache'];
            delete ou['related_organizational_units'];
            delete ou['name'];

            return ou            
        }


    }

    jsonReorder(orgUnits: any){
        let test = [
    {
        "id": 1,
        "name": "Douglas Group",
        "external_id": "613688efab0ee",
        "types": [
            {
                "id": 1,
                "name": "Boyer, Dare and Hayes",
                "label": "Maggio and Sons",
                "model_type": "App\\Models\\OrganizationalUnit",
                "external_id": "613688ef64957"
            }
        ],
        "parents_cache": null,
        "children_cache": [
            "3"
        ],
        "parents": null,
        "children": [
		{
                "id": 2,
                "name": "Schroeder Ltd",
                "external_id": "613688efafc5b",
                "types": [
                    {
                        "id": 2,
                        "name": "Morissette, Kuhlman and Luettgen",
                        "label": "Ernser Ltd",
                        "model_type": "App\\Models\\OrganizationalUnit",
                        "external_id": "613688ef68d83"
                    }
                ],
                "parents_cache": null,
                "children_cache": [],
                "parents": null,
                "related_users": [],
                "related_organizational_units": [],
                "children": []
            },
            {
                "id": 3,
                "name": "Kemmer PLC",
                "external_id": "613688efb2d87",
                "types": [
                    {
                        "id": 1,
                        "name": "Boyer, Dare and Hayes",
                        "label": "Maggio and Sons",
                        "model_type": "App\\Models\\OrganizationalUnit",
                        "external_id": "613688ef64957"
                    }
                ],
                "parents_cache": null,
                "children_cache": [
                    "2"
                ],
                "parents": null,
                "children": [
                    {
                        "id": 2,
                        "name": "Schroeder Ltd",
                        "external_id": "613688efafc5b",
                        "types": [
                            {
                                "id": 2,
                                "name": "Morissette, Kuhlman and Luettgen",
                                "label": "Ernser Ltd",
                                "model_type": "App\\Models\\OrganizationalUnit",
                                "external_id": "613688ef68d83"
                            }
                        ],
                        "parents_cache": null,
                        "children_cache": [
                            "4"
                        ],
                        "parents": null,
                        "children": [
                            {
                                "id": 4,
                                "name": "Farrell, Mraz and Buckridge",
                                "external_id": "613688efb64ba",
                                "types": [
                                    {
                                        "id": 1,
                                        "name": "Boyer, Dare and Hayes",
                                        "label": "Maggio and Sons",
                                        "model_type": "App\\Models\\OrganizationalUnit",
                                        "external_id": "613688ef64957"
                                    }
                                ],
                                "parents_cache": null,
                                "children_cache": [
                                    "5"
                                ],
                                "parents": null,
                                "children": [
                                    {
                                        "id": 5,
                                        "name": "Purdy LLC",
                                        "external_id": "613688efb97fc",
                                        "types": [
                                            {
                                                "id": 1,
                                                "name": "Boyer, Dare and Hayes",
                                                "label": "Maggio and Sons",
                                                "model_type": "App\\Models\\OrganizationalUnit",
                                                "external_id": "613688ef64957"
                                            }
                                        ],
                                        "parents_cache": null,
                                        "children_cache": null,
                                        "parents": null,
                                        "children": null,
                                        "related_users": [],
                                        "related_organizational_units": []
                                    }
                                ],
                                "related_users": [],
                                "related_organizational_units": []
                            }
                        ],
                        "related_users": [],
                        "related_organizational_units": []
                    }
                ],
                "related_users": [],
                "related_organizational_units": []
            }
        ],
        "related_users": [],
        "related_organizational_units": []
    },
    {
        "id": 2,
        "name": "Schroeder Ltd",
        "external_id": "613688efafc5b",
        "types": [
            {
                "id": 2,
                "name": "Morissette, Kuhlman and Luettgen",
                "label": "Ernser Ltd",
                "model_type": "App\\Models\\OrganizationalUnit",
                "external_id": "613688ef68d83"
            }
        ],
        "parents_cache": null,
        "children_cache": [
            "4"
        ],
        "parents": null,
        "children": [
            {
                "id": 4,
                "name": "Farrell, Mraz and Buckridge",
                "external_id": "613688efb64ba",
                "types": [
                    {
                        "id": 1,
                        "name": "Boyer, Dare and Hayes",
                        "label": "Maggio and Sons",
                        "model_type": "App\\Models\\OrganizationalUnit",
                        "external_id": "613688ef64957"
                    }
                ],
                "parents_cache": null,
                "children_cache": [
                    "5"
                ],
                "parents": null,
                "children": [
                    {
                        "id": 5,
                        "name": "Purdy LLC",
                        "external_id": "613688efb97fc",
                        "types": [
                            {
                                "id": 1,
                                "name": "Boyer, Dare and Hayes",
                                "label": "Maggio and Sons",
                                "model_type": "App\\Models\\OrganizationalUnit",
                                "external_id": "613688ef64957"
                            }
                        ],
                        "parents_cache": null,
                        "children_cache": null,
                        "parents": null,
                        "children": null,
                        "related_users": [],
                        "related_organizational_units": []
                    }
                ],
                "related_users": [],
                "related_organizational_units": []
            }
        ],
        "related_users": [],
        "related_organizational_units": []
    },
    {
        "id": 3,
        "name": "Kemmer PLC",
        "external_id": "613688efb2d87",
        "types": [
            {
                "id": 1,
                "name": "Boyer, Dare and Hayes",
                "label": "Maggio and Sons",
                "model_type": "App\\Models\\OrganizationalUnit",
                "external_id": "613688ef64957"
            }
        ],
        "parents_cache": null,
        "children_cache": [
            "2"
        ],
        "parents": null,
        "children": [
            {
                "id": 2,
                "name": "Schroeder Ltd",
                "external_id": "613688efafc5b",
                "types": [
                    {
                        "id": 2,
                        "name": "Morissette, Kuhlman and Luettgen",
                        "label": "Ernser Ltd",
                        "model_type": "App\\Models\\OrganizationalUnit",
                        "external_id": "613688ef68d83"
                    }
                ],
                "parents_cache": null,
                "children_cache": [
                    "4"
                ],
                "parents": null,
                "children": [
                    {
                        "id": 4,
                        "name": "Farrell, Mraz and Buckridge",
                        "external_id": "613688efb64ba",
                        "types": [
                            {
                                "id": 1,
                                "name": "Boyer, Dare and Hayes",
                                "label": "Maggio and Sons",
                                "model_type": "App\\Models\\OrganizationalUnit",
                                "external_id": "613688ef64957"
                            }
                        ],
                        "parents_cache": null,
                        "children_cache": [
                            "5"
                        ],
                        "parents": null,
                        "children": [
                            {
                                "id": 5,
                                "name": "Purdy LLC",
                                "external_id": "613688efb97fc",
                                "types": [
                                    {
                                        "id": 1,
                                        "name": "Boyer, Dare and Hayes",
                                        "label": "Maggio and Sons",
                                        "model_type": "App\\Models\\OrganizationalUnit",
                                        "external_id": "613688ef64957"
                                    }
                                ],
                                "parents_cache": null,
                                "children_cache": null,
                                "parents": null,
                                "children": null,
                                "related_users": [],
                                "related_organizational_units": []
                            }
                        ],
                        "related_users": [],
                        "related_organizational_units": []
                    }
                ],
                "related_users": [],
                "related_organizational_units": []
            }
        ],
        "related_users": [],
        "related_organizational_units": []
    },
    {
        "id": 4,
        "name": "Farrell, Mraz and Buckridge",
        "external_id": "613688efb64ba",
        "types": [
            {
                "id": 1,
                "name": "Boyer, Dare and Hayes",
                "label": "Maggio and Sons",
                "model_type": "App\\Models\\OrganizationalUnit",
                "external_id": "613688ef64957"
            }
        ],
        "parents_cache": null,
        "children_cache": [
            "5"
        ],
        "parents": null,
        "children": [
            {
                "id": 5,
                "name": "Purdy LLC",
                "external_id": "613688efb97fc",
                "types": [
                    {
                        "id": 1,
                        "name": "Boyer, Dare and Hayes",
                        "label": "Maggio and Sons",
                        "model_type": "App\\Models\\OrganizationalUnit",
                        "external_id": "613688ef64957"
                    }
                ],
                "parents_cache": null,
                "children_cache": null,
                "parents": null,
                "children": null,
                "related_users": [],
                "related_organizational_units": []
            }
        ],
        "related_users": [],
        "related_organizational_units": []
    },
    {
        "id": 5,
        "name": "Purdy LLC",
        "external_id": "613688efb97fc",
        "types": [
            {
                "id": 1,
                "name": "Boyer, Dare and Hayes",
                "label": "Maggio and Sons",
                "model_type": "App\\Models\\OrganizationalUnit",
                "external_id": "613688ef64957"
            }
        ],
        "parents_cache": null,
        "children_cache": null,
        "parents": null,
        "children": null,
        "related_users": [],
        "related_organizational_units": []
    }
]

        this.data1 = this.formatOrgunit(orgUnits);


        for (let index = 0; index < this.data1.length; index++) {
            const element = this.data1[index];

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

    postOrgUnits(){
        let children: any = {};
        let nomeOrgUnit = this.orgUnitForm.controls.nomeOrgUnit.value
        let tipoCampo = this.orgUnitForm.controls.tipoCampo.value
 
        console.log(this.selectedNode);
        this.selectedNode = {
            "external_id": "612f912e7b816",
            "name": nomeOrgUnit,
            "parent_id": this.selectedNode.id,
            "types": [1]
        }

        console.log('data1', this.selectedNode);
        

        this.orgUnitsService.postOrgUnits(this.selectedNode)
        .subscribe(() => console.log(this.selectedNode));
        setTimeout(()=>{
            this.getOrgUnits();
        },500);   
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
        // this.node = this.onNodeSelect(event);
        console.log("item", item);
        event.stopPropagation();
        console.log('check key', item.hasOwnProperty('children'));
        let children: any = {};

        item.data.name = "Novo nome";
        item.label = "Novo Label"     
        
    }        

}
