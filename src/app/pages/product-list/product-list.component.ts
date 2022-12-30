import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { ProductDTO } from 'src/app/interfaces/product-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { FactoryService } from 'src/app/factory.service';

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

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private formBuilder: FormBuilder
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
  }
  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  deleteProduct() {
    this.ProductService.deleteProduct(this.factoryId).subscribe((res) => {
      alert('delete factory');
      this.deleteproduct = true;
      this.getProduct(this.factoryId);
    });
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
  getProduct(factoryId: number) {
    this.ProductService.getAllProducts(factoryId).subscribe((res) => {
      this.Productdata = res;
    });
  }
  UpdateProductDetails() {
    this.ProductModelObj.productName = this.formValue.value.productName;
    this.ProductModelObj.quantity = this.formValue.value.quantity;
    this.ProductModelObj.description = this.formValue.value.fdescription;

    this.ProductService.updateProduct(this.ProductModelObj).subscribe((res) => {
      alert('updated');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getProduct(this.factoryId);
    });
  }
  onEdit() {}
}
