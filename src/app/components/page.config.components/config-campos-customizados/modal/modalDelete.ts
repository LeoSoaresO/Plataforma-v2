import { Component } from "@angular/core";
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';


@Component({
    template: `
<!-- Modal add custom schema -->
  <div class="transition ease-out duration-700 animate-fade-in-down overflow-x-hidden overflow-y-auto fixed h-full inset-0 z-50 outline-none focus:outline-none justify-center items-center flex transition duration-1000 ease-in-out">
    <div class="my-6 ml-36 mx-auto absolute bg-customWhite-default rounded-lg" style="width: 35%;">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex p-5 border-b border-solid border-customBlue-light rounded-t">
          <h3 class="text-xl font-bold text-customBlue-default">
            Deseja excluir item
          </h3>
          <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" (click)="close()">
            <span class="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
              <!-- <fa-icon [icon]="faTimes"></fa-icon> -->
            </span>
          </button>
        </div>
         <!--footer-->
        <div class="flex items-center justify-end p-6 rounded-b">
          <button class="bg-customBlue-default text-customWhite-default active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Salvar
          </button>
          <button class="text-customGray-textGray background-transparent font-semibold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" (click)="close()">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="opacity-25 fixed inset-0 z-40" style="background-color: #000;"></div> 
  `
})

export class ModalDelete {

    faEllipisisV = faEllipsisV
    faPlus = faPlus
    faTimes = faTimes

            
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {

    }

    close() {
      console.log(this.ref);
    }
}