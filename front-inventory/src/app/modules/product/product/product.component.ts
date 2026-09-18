import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


   private productService = inject(ProductService);
   private snackBar = inject(MatSnackBar);
   public dialog = inject(MatDialog)
   private util = inject(UtilService);
   isAdmin: any;

  ngOnInit(): void {
    this.getProducts();
    this.isAdmin = this.util.isAdmin();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((data:any) =>{   
       console.log("Respuesta Productos:", data);
       this.processProductResponse(data);
      }), (error:any) =>{
        console.log("Respuesta Error: ",error );
      };
  }

  processProductResponse(resp: any){
      const dataProduct: ProductElement[] = [];
      if(resp.metadata[0].code == "00"){
        let listProduct = resp.productResponse.product;
        listProduct.forEach((element: ProductElement) => {
          //element.category = element.category.name;
          element.picture = 'data:image/jpeg;base64,'+ element.picture;
          dataProduct.push(element);
        });
        this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
        this.dataSource.paginator = this.paginator;
      }
  }

  openProductDialog(){
      const dialogRef = this.dialog.open( NewProductComponent, {
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto Agregado", "Exito")
          this.getProducts();
        }else{
          this.openSnackBar("Producto No Agregado", "Error")
        }
      });
    }
  
    openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
      return this.snackBar.open(message, action,{duration: 2000});
    }

    edit(id: number, name: string , price: number, account: number, category: any){

      const dialogRef = this.dialog.open( NewProductComponent, {
        width: '300px',
        data: {id: id, name: name , price: price, account: account, category: category}
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto Editado", "Exito")
          this.getProducts();
        }else{
          this.openSnackBar("Producto No Editado", "Error")
        }
      });
    }

    //Creamos un nuevo componente para eliminar
    delete(id: number){
      const dialogRef = this.dialog.open( ConfirmComponent , {
        width: '250px',
        data:{id: id , module: 'product'}
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto Eliminada", "Exito")
          this.getProducts();
        }else{
          this.openSnackBar("Producto No Eliminada", "Error")
        }
      });
    }
    
    buscar(termino: string){
      if(termino.length === 0){
        return this.getProducts();
      }
     // const name = Number(termino);
      this.productService.getProductsByName(termino)
        .subscribe({
          next: (response: any) => {
            this.processProductResponse(response);
            //*this.dialogRef.close(1);
          },
          error: (error: any) => {
          // this.dialogRef.close(2);
          }
        });
    }
}

export interface ProductElement{
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}