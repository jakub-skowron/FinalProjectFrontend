import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organization';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private getOrganizationsUrl = "http://localhost:8080/organizations";
  private getOrganizationUrl = "http://localhost:8080/organizations/";
  private createOrganizationUrl = "http://localhost:8080/organizations";
  private deleteOrganizationUrl = "http://localhost:8080/organizations/";
  private updateOrganizationUrl = "http://localhost:8080/organizations/";

  constructor(private http:HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.getOrganizationsUrl, httpOptions);
  }

  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.getOrganizationUrl + id, httpOptions);
  }

  createOrganization(organization: Organization): Observable<void> {
    return this.http.post<void>(this.createOrganizationUrl, organization, httpOptions);
  }

  addOrganization(organization: Organization): Observable<any> {
    return this.http.post(
      this.createOrganizationUrl,
      organization,
      httpOptions
    );
    }
  
    deleteOrganization(id: number): Observable<any> {
      return this.http.delete(this.deleteOrganizationUrl + id, httpOptions);
    }

    updateOrganization(id: number, organization: Organization): Observable<any> {
      return this.http.put(this.updateOrganizationUrl + id, organization, httpOptions);
    }
}
