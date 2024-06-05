import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { CategoryElement } from "./app/classes/categoryElement";

@Injectable({
    providedIn: 'root'
  })
export class Service{

    baseURL = 'http://localhost:8080';
    currentUser : string = "delete_later"; 

    constructor(private http : HttpClient){
        
    }

    CreateElement(category : string) : Observable<any>{
        var url = `${this.baseURL}/elements`;
        var element;
        switch(category){
            case "character":
                element = CategoryElement.CreateCharacter(this.currentUser);
                break;
            case "location":
                element = CategoryElement.CreateLocation(this.currentUser);
                break;
            case "creature":
                element = CategoryElement.CreateCreature(this.currentUser);
                break;
            default:
                element = new CategoryElement("other", "Unnamed", this.currentUser);
                break;
        }
        return this.http.post(url, element);
    }

    UpdateElement(id: string, field: string, newData: any){
        var url = `${this.baseURL}/elements/${id}/${field}`;
        return this.http.post(url, newData);
    }

    GetStories(category : string) : Observable<any>{
        
        var url = `${this.baseURL}/stories/${this.currentUser}/${category}`;
        return this.http.get(url);
    }

    GetElements(category : string, storyFilter : string) : Observable<any>{
        var url = `${this.baseURL}/elements/${this.currentUser}/${category}/${storyFilter}`;
        return this.http.get(url);
    } 

    GetElement(id : string) : Observable<any>{
        var url = `${this.baseURL}/elements/${id}`;
        return this.http.get(url);
    }

    DeleteElement(id : string) : Observable<any>{
        var url = `${this.baseURL}/elements/${id}`;
        return this.http.delete(url);
    }

    


}