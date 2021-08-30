import { Component, OnInit } from '@angular/core';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { OrgUnitsService } from 'src/app/services/org-units.service';

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

    constructor(private messageService: MessageService, private orgUnitsService: OrgUnitsService) {}

    ngOnInit() {
        this.getOrgUnits();

    }
    getOrgUnits() {
        this.orgUnitsService.getOrgUnits()
        .subscribe( orgUnits => this.data1 = orgUnits );
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
