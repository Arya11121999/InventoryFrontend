import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { ProductDTO } from 'src/app/interfaces/product-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { FactoryService } from 'src/app/factory.service';
import { FactoryModel } from 'src/app/models/factory-model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  formValue!: FormGroup;
  Productdata!: any;
  ProductModelObj: ProductModel = new ProductModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  delete = false;
  factoryId!: number;
  deleteproduct = false;
  factory!: FactoryModel;

  http: any;
  factoryName!: string;
  selectedFactoryId!: number;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.factoryId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      factoryId: [''],
      productId: [''],
      productName: [''],
      quantity: [''],
      description: [''],
    });
    this.getProduct(this.factoryId);
    this.route.queryParams.subscribe((params) => {
      this.factoryId = params['factoryId'];
      this.factoryName = params['factoryName'];
      console.log();
    });
  }
  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDetails() {
    this.ProductModelObj.factoryId = this.factoryId;
    this.ProductModelObj.productName = this.formValue.value.productName;
    this.ProductModelObj.quantity = this.formValue.value.quantity;
    this.ProductModelObj.description = this.formValue.value.description;
    this.ProductService.addProduct(this.ProductModelObj).subscribe((res) => {
      console.log(res);
      alert('Product added');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.getProduct(this.factoryId);
      this.formValue.reset();
    });
  }

  // prepareFormData(product: ProductModel): FormData {
  //   const formData = new FormData();
  //   formData.append(
  //     'product',
  //     new Blob([JSON.stringify(product)], { type: 'application/json' })
  //   );

  //   for (var i = 0; i < product.productImages.length; i++) {
  //     formData.append(
  //       'imageFile',
  //       product.productImages[i].file,
  //       product.productImages[i].file.name
  //     );
  //   }
  //   return formData;
  // }
  getProduct(factoryId: number) {
    // this.ProductService.getAllProducts(factoryId).subscribe((res) => {
    //   this.Productdata = res;
    // });
  }
  deleteProduct(row: any) {
    this.ProductService.deleteProduct(this.factoryId).subscribe((res) => {
      alert('delete factory');
      this.deleteproduct = true;
      this.getProduct(this.factoryId);
    });
  }
  updateProduct(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.ProductModelObj.factoryId = row.factoryId;
    this.formValue.controls['productName'].setValue(row.productName);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['description'].setValue(row.description);
  }
  UpdateProductDetails() {
    this.ProductModelObj.productName = this.formValue.value.productName;
    this.ProductModelObj.quantity = this.formValue.value.quantity;
    this.ProductModelObj.description = this.formValue.value.description;

    this.ProductService.updateProduct(this.ProductModelObj).subscribe((res) => {
      alert('updated');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getProduct(this.factoryId);
    });
  }
}
