import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryDTO } from './interfaces/factory-dto';
import { FactoryModel } from './models/factory-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  baseUrlr = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private getFactoriesUrl =
    'https://inventoryarya.azurewebsites.net/manage/viewAll/factory';
  private addFactoryUrl =
    'https://inventoryarya.azurewebsites.net/manage/add/factory';
  private deleteUrl =
    'https://inventoryarya.azurewebsites.net/manage/delete/factory/';
  private updateUrl =
    'https://inventoryarya.azurewebsites.net/manage/update/factory';

  getAllFactories(): Observable<FactoryDTO[]> {
    return this.http.get<FactoryDTO[]>(this.getFactoriesUrl);
  }
  addFactory(factory: FactoryModel) {
    return this.http.post(this.addFactoryUrl, factory);
  }

  deleteFactory(factoryId: number) {
    return this.http.delete(this.deleteUrl + factoryId);
  }

  updateFactory(factory: FactoryDTO) {
    return this.http.put(this.updateUrl, factory);
  }
}
