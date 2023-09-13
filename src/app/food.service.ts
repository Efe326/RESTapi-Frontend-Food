import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Food } from './models/api-models/food.model';
import { updateFoodRequest } from './models/api-models/updateFoodRequest.model';
import { addFoodRequest } from './models/api-models/addFoodRequest.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseApiUrl = 'http://localhost:3000';

  constructor(private httpClient : HttpClient) { }

  getProducts(): Observable<Food>{
    return this.httpClient.get<Food>(this.baseApiUrl+'/products');
  }

  getProduct(_id:string | null): Observable<any>{
    return this.httpClient.get<Food>(this.baseApiUrl+ '/products/' + _id )
  }

  updateProduct(_id:string | string, foodRequest: any): Observable<any>{
    const updateFoodRequest :updateFoodRequest = {
      _id: foodRequest._id,
      name: foodRequest.name,
      price: foodRequest.price,
      productImage: foodRequest.productImage,
      calories: foodRequest.calories,
      preptime: foodRequest.preptime

    }
    const deneme=[];
    deneme.push( { "propName": "_id", "value": foodRequest._id });
    deneme.push( { "propName":"name", "value": foodRequest.name });
    deneme.push( { "propName": "price", "value": foodRequest.price });
    deneme.push( { "propName": "productImage", "value": foodRequest.productImage });
    deneme.push( { "propName": "calories", "value": foodRequest.calories });
    deneme.push( { "propName": "preptime", "value": foodRequest.preptime });
  //   [
  //     { "propName": "calories", "value": "350kcal" },
  //     {"propName": "name", "value": "Adana" }
  
  // ]
    var dizi=[];
    dizi.push(updateFoodRequest);
    console.log(JSON.stringify(dizi));
    return this.httpClient.patch<Food>(this.baseApiUrl+ '/products/' + _id, deneme )
  }

  deleteProduct(_id:string): Observable<any>{
    return this.httpClient.delete<Food>(this.baseApiUrl+ '/products/' + _id)
  }

  addproduct(foodRequest: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', foodRequest.name);
    formData.append('price', foodRequest.price);
    formData.append('productImage', foodRequest.productImage);
    formData.append('calories', foodRequest.calories);
    formData.append('preptime', foodRequest.preptime);
  
    return this.httpClient.post<Food>(this.baseApiUrl + '/products', formData);
  }
}
