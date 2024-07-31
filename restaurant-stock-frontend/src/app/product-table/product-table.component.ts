import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'serialNumber'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.dataSource.data = products;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (products.length > 0 && !this.displayedColumns.includes('actions')) {
        this.displayedColumns.push('actions');
      } else if (products.length === 0 && this.displayedColumns.includes('actions')) {
        this.displayedColumns = this.displayedColumns.filter(column => column !== 'actions');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '300px',
      data: product ? { ...product } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.productService.updateProduct(result.id, result).subscribe(() => {
            this.fetchProducts();
            this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
          });
        } else {
          this.productService.createProduct(result).subscribe(() => {
            this.fetchProducts();
            this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.fetchProducts();
        this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete product', 'Close', { duration: 3000 });
      }
    });
  }

}
