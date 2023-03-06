import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/factory.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FactoryModel } from 'src/app/models/factory-model';

@Component({
  selector: '.app-factory-page',
  templateUrl: './factory-page.component.html',
  styleUrls: ['./factory-page.component.css'],
})
export class FactoryPageComponent implements OnInit {
  formValue!: FormGroup;
  FactoryModelObj: FactoryModel = new FactoryModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  factorydata!: any;
  deletefactory = false;
  factoryId!: number;
  showHover!: boolean;
  localStorage: any;
  constructor(
    private router: Router,
    private factoryService: FactoryService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      factoryId: [],
      factoryName: [''],
      factoryLocation: [''],
    });
    this.getAllFactory();
  }
  clickAddFactory() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postFactoryDetails() {
    this.FactoryModelObj.factoryName = this.formValue.value.factoryName;
    this.FactoryModelObj.factoryLocation = this.formValue.value.factoryLocation;
    this.factoryService.addFactory(this.FactoryModelObj).subscribe((res) => {
      console.log(res);
      alert('Factory added');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.getAllFactory();
      this.formValue.reset();
    });
  }
  getAllFactory() {
    this.factoryService.getAllFactories().subscribe((res) => {
      this.factorydata = res;
    });
  }
  deleteFactory(row: any) {
    this.factoryService.deleteFactory(row).subscribe((res) => {
      alert('delete factory');
      this.deletefactory = true;
      this.getAllFactory();
    });
  }

  updateFactory(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.FactoryModelObj.factoryId = row.factoryId;
    this.formValue.controls['factoryName'].setValue(row.factoryName);
    this.formValue.controls['factoryLocation'].setValue(row.factoryLocation);
  }
  UpdateFactoryDetails() {
    this.FactoryModelObj.factoryName = this.formValue.value.factoryName;
    this.FactoryModelObj.factoryLocation = this.formValue.value.factoryLocation;

    this.factoryService.updateFactory(this.FactoryModelObj).subscribe((res) => {
      alert('updated');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllFactory();
    });
  }

  Click(factoryId: number, factoryName: string) {
    this.router.navigate(['/factory', factoryId], {
      queryParams: { factoryId: factoryId, factoryName: factoryName },
    });
  }
  hover() {
    this.showHover = true;
  }
  setLanguage(language: string) {
    this.localStorage.setItem('language', language).subscribe(() => {
      console.log('Language has been set to ' + language);
    });
  }
}
console.log('hi');
