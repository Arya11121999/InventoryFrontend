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
    'https://apim-get-assessment.azure-api.net/Apis/manage/viewAll/factory?subscription-key=617113e6a6f94201a414d22547d1ffe8';
  private addFactoryUrl =
    'https://apim-get-assessment.azure-api.net/Apis/manage/add/factory?subscription-key=617113e6a6f94201a414d22547d1ffe8';
  private deleteUrl =
    'https://apim-get-assessment.azure-api.net/Apis/manage/delete/factory?subscription-key=617113e6a6f94201a414d22547d1ffe8';
  private updateUrl =
    'https://apim-get-assessment.azure-api.net/Apis/manage/update/factory?subscription-key=617113e6a6f94201a414d22547d1ffe8';

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
