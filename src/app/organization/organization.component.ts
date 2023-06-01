import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[] = [];
  newOrganization: Organization = new Organization(0,'');

  constructor(private organizationService: OrganizationService){}

  loadOrganizations():void {
    this.organizationService.getOrganizations().subscribe((list: Organization[]) => {
      this.organizations = list;
    });
  }

  createOrganization():void {
    this.organizationService.addOrganization(this.newOrganization).subscribe(() => {
      this.loadOrganizations(); // Reload the list of villains after creating a new one
      this.resetForm(); // Reset the form fields
    });
  }

  deleteOrganization(id: number) {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      this.loadOrganizations();
    });
  }

  resetForm():void {
    this.newOrganization = new Organization(0,''); // Reset the newVillain object
  }
  
  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((list: Organization[]) =>{
      this.organizations = list;
    })
  }

}
