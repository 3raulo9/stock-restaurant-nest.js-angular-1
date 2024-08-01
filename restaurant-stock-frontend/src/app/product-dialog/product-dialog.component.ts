import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      id: [data?.id || null],  // Include id in the form
      name: [data?.name || '', Validators.required],
      quantity: [data?.quantity || '', [Validators.required, Validators.min(1)]],
      serialNumber: [data?.serialNumber || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
