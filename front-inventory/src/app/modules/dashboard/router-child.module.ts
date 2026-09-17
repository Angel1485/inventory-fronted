import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { ProductComponent } from '../product/product/product.component';

//Modules - Parte 2

const childroutes: Routes = [

    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'product', component: ProductComponent}

]
// import { NameComponent } from './name.component';

@NgModule({
    imports: [RouterModule.forChild(childroutes)],
    exports: [RouterModule],
    // declarations: [NameComponent],
    // providers: [],
})
export class RouterChildModule { } // Se cambia el nombre de la clase


