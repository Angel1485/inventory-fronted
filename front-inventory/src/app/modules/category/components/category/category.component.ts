import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog)

  ngOnInit(): void {
   this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data:any) =>{   
       console.log("Respuesta Categorias:", data);
       this.processCategoriesResponse(data);
      }), (error:any) =>{
        console.log("Respuesta Error: ",error );
      };
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }
  }

  edit(id: number, name: string, description: string){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width: '300px',
      data:{id: id, name: name, description: description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Actualizada", "Exito")
        this.getCategories();
      }else{
        this.openSnackBar("Categoria No Actualizada", "Error")
      }
    });4
  }

  //Creamos un nuevo componente para eliminar
  delete(id: number){
    const dialogRef = this.dialog.open( ConfirmComponent , {
      width: '250px',
      data:{id: id , module: "category"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Eliminada", "Exito")
        this.getCategories();
      }else{
        this.openSnackBar("Categoria No Eliminada", "Error")
      }
    });
  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.getCategories();
    }

    const id = Number(termino);

    this.categoryService.getCategorieById(id)
      .subscribe({
        next: (response: any) => {
          this.processCategoriesResponse(response);
          //*this.dialogRef.close(1);
        },
        error: (error: any) => {
         // this.dialogRef.close(2);
        }
      });
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Agregada", "Exito")
        this.getCategories();
      }else{
        this.openSnackBar("Categoria No Agregada", "Error")
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{duration: 2000});
  }

}

export interface CategoryElement{

  id: number;
  name: string;
  description: String;

}
