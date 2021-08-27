import { Component, OnInit } from '@angular/core';
import {OrganizationChartModule} from 'primeng/organizationchart';

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

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.data1 = [{
            label: 'CEO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: {name:'Walter White', 'avatar': 'walter.jpg'},
            children: [
                {
                    label: 'CFO',
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                    children:[{
                        label: 'Tax',
                        styleClass: 'department-cfo'
                    },
                    {
                        label: 'Legal',
                        styleClass: 'department-cfo'
                    }],
                },
                {
                    label: 'COO',
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: {name:'Mike E.', 'avatar': 'mike.jpg'},
                    children:[{
                        label: 'Operations',
                        styleClass: 'department-coo'
                    }]
                },
                {
                    label: 'CTO',
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: {name:'Jesse Pinkman', 'avatar': 'jesse.jpg'},
                    children:[{
                        label: 'Development',
                        styleClass: 'department-cto',
                        expanded: true,
                        children:[{
                            label: 'Analysis',
                            styleClass: 'department-cto'
                        },
                        {
                            label: 'Front End',
                            styleClass: 'department-cto'
                        },
                        {
                            label: 'Back End',
                            styleClass: 'department-cto'
                        }]
                    },
                    {
                        label: 'QA',
                        styleClass: 'department-cto'
                    },
                    {
                        label: 'R&D',
                        styleClass: 'department-cto'
                    }]
                }
            ]
        }];

    }

    onNodeSelect(event: any) {
        console.log(event);
        event.node.children.push({label:"other", styleClass:"AnotherOne"})
        
        this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }

    add(event:any){
        console.log(event);
        
        // event.node.children.push({label:"other", styleClass:"AnotherOne"})
    }

}
